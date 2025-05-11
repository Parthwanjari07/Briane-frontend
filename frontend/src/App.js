import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import BrandProfiling from "./pages/Onboarding/BrandProfiling";
import CompetitorSelection from "./pages/Onboarding/CompetitorSelection";
import SelectedCompetitors from "./pages/Onboarding/SelectedCompetitors";
import SuccessMessage from "./pages/Onboarding/SuccessMessage";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/onboarding/brand-profiling" element={
              <ProtectedRoute>
                <BrandProfiling />
              </ProtectedRoute>
            } />
            <Route path="/onboarding/competitor-selection" element={
              <ProtectedRoute>
                <CompetitorSelection />
              </ProtectedRoute>
            } />
            <Route path="/onboarding/selected-competitors" element={
              <ProtectedRoute>
                <SelectedCompetitors />
              </ProtectedRoute>
            } />
            <Route path="/onboarding/success" element={
              <ProtectedRoute>
                <SuccessMessage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

export default App;
