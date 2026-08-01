import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary";
import { LanguageProvider } from "./context/LanguageContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
      <LanguageProvider>
        <BrowserRouter>
          <App />

          <Toaster
            position="top-right"
          />

        </BrowserRouter>
      </LanguageProvider>
    </ErrorBoundary>
  );