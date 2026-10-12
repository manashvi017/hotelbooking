import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/staysphere";

const fallbackUsers = [];
const fallbackLoginLogs = [];
let mongoReady = false;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ],
    credentials: true,
  })
);
app.use(express.json());

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const loginLogSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    loggedInAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
const LoginLog = mongoose.models.LoginLog || mongoose.model("LoginLog", loginLogSchema);

const normalizeEmail = (email = "") => email.trim().toLowerCase();

async function connectMongo() {
  try {
    await mongoose.connect(mongoUri);
    mongoReady = true;
    console.log("MongoDB connected successfully.");
  } catch (error) {
    mongoReady = false;
    console.warn("MongoDB not available, using in-memory fallback:", error.message);
  }
}

async function findUserByEmail(email) {
  const normalizedEmail = normalizeEmail(email);

  if (mongoReady) {
    return User.findOne({ email: normalizedEmail });
  }

  return fallbackUsers.find((user) => user.email === normalizedEmail) || null;
}

async function storeUser({ name, email, password }) {
  const normalizedEmail = normalizeEmail(email);

  if (mongoReady) {
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
    });

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
  }

  const newUser = {
    id: String(Date.now() + Math.random()),
    name: name.trim(),
    email: normalizedEmail,
    password,
  };

  fallbackUsers.push(newUser);
  return newUser;
}

async function saveLoginLog(user) {
  const payload = {
    userId: String(user.id || user._id),
    name: user.name,
    email: user.email,
    loggedInAt: new Date(),
  };

  if (mongoReady) {
    await LoginLog.create(payload);
    return;
  }

  fallbackLoginLogs.push(payload);
}

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    message: "StaySphere backend is running",
    database: mongoReady ? "mongodb" : "memory-fallback",
  });
});

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
    }

    const normalizedEmail = normalizeEmail(email);
    const existingUser = await findUserByEmail(normalizedEmail);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered.",
      });
    }

    const user = await storeUser({
      name,
      email: normalizedEmail,
      password,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Signup failed on server.",
      error: error.message,
    });
  }
});

app.post("/api/auth/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const normalizedEmail = normalizeEmail(email);
    const user = await findUserByEmail(normalizedEmail);

    if (!user || user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    await saveLoginLog(user);

    const safeUser = {
      id: user.id || user._id.toString(),
      name: user.name,
      email: user.email,
    };

    return res.json({
      success: true,
      message: "Login successful.",
      user: safeUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Signin failed on server.",
      error: error.message,
    });
  }
});

app.get("/api/auth/logins", async (req, res) => {
  try {
    if (mongoReady) {
      const logs = await LoginLog.find({}).sort({ loggedInAt: -1 }).lean();
      return res.json({
        success: true,
        logs,
      });
    }

    return res.json({
      success: true,
      logs: fallbackLoginLogs.slice().reverse(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch login logs.",
      error: error.message,
    });
  }
});

connectMongo();

app.listen(port, () => {
  console.log(`StaySphere backend running on http://localhost:${port}`);
});
