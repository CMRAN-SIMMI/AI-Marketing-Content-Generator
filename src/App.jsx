import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Generate from "./pages/Generate";
import Assistant from "./pages/Assistant";
import History from "./pages/History";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ComponentsDemo from "./pages/ComponentsDemo";
import OAuthSuccess from "./pages/OAuthSuccess";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        }
      />

      <Route
        path="/generate"
        element={
          <ProtectedRoute>
            <Generate
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/assistant"
        element={
          <ProtectedRoute>
            <Assistant
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/login"
        element={
          <Login
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        }
      />

      <Route
        path="/register"
        element={
          <Register
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        }
      />

      {/* Google OAuth Success Route */}
      <Route
        path="/oauth-success"
        element={<OAuthSuccess />}
      />

      <Route
        path="/components-demo"
        element={
          <ComponentsDemo
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        }
      />
    </Routes>
  );
}

export default App;