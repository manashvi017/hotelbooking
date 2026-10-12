import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const getStoredUsers = () => {
  try {
    const savedUsers = localStorage.getItem("staySphereUsers");
    return savedUsers ? JSON.parse(savedUsers) : [];
  } catch (error) {
    return [];
  }
};

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("staySphereUser");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const saveCurrentUser = (currentUser) => {
    setUser(currentUser);
    localStorage.setItem("staySphereUser", JSON.stringify(currentUser));
  };

  const signup = async (userData) => {
    const users = getStoredUsers();
    const email = userData.email.trim().toLowerCase();

    const existingUser = users.find((item) => item.email.toLowerCase() === email);

    if (existingUser) {
      return {
        success: false,
        message: "Email is already registered.",
      };
    }

    const newUser = {
      id: Date.now().toString(),
      name: userData.name.trim(),
      email,
      password: userData.password,
    };

    users.push(newUser);
    localStorage.setItem("staySphereUsers", JSON.stringify(users));

    const currentUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    saveCurrentUser(currentUser);

    return {
      success: true,
      message: "Account created successfully.",
    };
  };

  const signin = async (email, password) => {
    const users = getStoredUsers();
    const normalizedEmail = email.trim().toLowerCase();
    const userMatch = users.find(
      (item) => item.email.toLowerCase() === normalizedEmail && item.password === password
    );

    if (!userMatch) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const currentUser = {
      id: userMatch.id,
      name: userMatch.name,
      email: userMatch.email,
    };

    saveCurrentUser(currentUser);

    return {
      success: true,
      message: "Login successful.",
    };
  };

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