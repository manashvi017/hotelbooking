import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("staySphereUser");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // =========================
  // SIGN UP
  // =========================
  const signup = (userData) => {
    const users = JSON.parse(
      localStorage.getItem("staySphereUsers") || "[]"
    );

    const email = userData.email.trim().toLowerCase();

    // Check if email already exists
    const existingUser = users.find(
      (item) =>
        item.email.trim().toLowerCase() === email
    );

    if (existingUser) {
      return {
        success: false,
        message: "Email is already registered.",
      };
    }

    // Create new user dynamically
    const newUser = {
      id: Date.now(),
      name: userData.name.trim(),
      email: email,
      password: userData.password,
    };

    // Add user to existing users
    users.push(newUser);

    // Save all users
    localStorage.setItem(
      "staySphereUsers",
      JSON.stringify(users)
    );

    // Set current logged-in user
    const currentUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    setUser(currentUser);

    localStorage.setItem(
      "staySphereUser",
      JSON.stringify(currentUser)
    );

    return {
      success: true,
      message: "Account created successfully.",
    };
  };

  // =========================
  // SIGN IN
  // =========================
  const signin = (email, password) => {
    const users = JSON.parse(
      localStorage.getItem("staySphereUsers") || "[]"
    );

    const enteredEmail = email.trim().toLowerCase();

    // Find matching email + password
    const foundUser = users.find(
      (item) =>
        item.email === enteredEmail &&
        item.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    // Don't store password in logged-in user
    const currentUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
    };

    setUser(currentUser);

    localStorage.setItem(
      "staySphereUser",
      JSON.stringify(currentUser)
    );

    return {
      success: true,
      message: "Login successful.",
    };
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    setUser(null);
    localStorage.removeItem("staySphereUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;