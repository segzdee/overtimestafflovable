
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type DevModeContextType = {
  devMode: boolean;
  toggleDevMode: () => void;
  selectedRole: "admin" | "shift-worker" | "company" | "agency" | "aiagent" | null;
  setSelectedRole: (role: "admin" | "shift-worker" | "company" | "agency" | "aiagent" | null) => void;
};

const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

export const DevModeProvider = ({ children }: { children: ReactNode }) => {
  // Always enable dev mode in development for testing purposes
  const isDev = true;
  
  // Initialize from localStorage if available
  const [devMode, setDevMode] = useState(() => {
    const savedMode = localStorage.getItem("devMode");
    return isDev && (savedMode === "true" || true); // Default to true for easier testing
  });
  
  const [selectedRole, setSelectedRole] = useState<"admin" | "shift-worker" | "company" | "agency" | "aiagent" | null>(() => {
    const savedRole = localStorage.getItem("devModeRole");
    return savedRole ? (savedRole as "admin" | "shift-worker" | "company" | "agency" | "aiagent") : null;
  });

  // Save to localStorage when changed
  useEffect(() => {
    if (devMode) {
      localStorage.setItem("devMode", "true");
    } else {
      localStorage.removeItem("devMode");
    }
  }, [devMode]);

  useEffect(() => {
    if (selectedRole) {
      localStorage.setItem("devModeRole", selectedRole);
    } else {
      localStorage.removeItem("devModeRole");
    }
  }, [selectedRole]);

  const toggleDevMode = () => {
    if (!isDev) return; // Only allow toggling in development
    setDevMode(prev => !prev);
  };

  return (
    <DevModeContext.Provider value={{ devMode, toggleDevMode, selectedRole, setSelectedRole }}>
      {children}
    </DevModeContext.Provider>
  );
};

export const useDevMode = () => {
  const context = useContext(DevModeContext);
  if (context === undefined) {
    throw new Error("useDevMode must be used within a DevModeProvider");
  }
  return context;
};
