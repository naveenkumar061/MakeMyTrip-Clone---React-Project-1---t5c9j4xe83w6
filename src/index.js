import React from "react"; // Importing React library
import ReactDOM from "react-dom/client"; // Importing ReactDOM library
import { ErrorBoundary } from "react-error-boundary"; // Importing ErrorBoundary component from react-error-boundary

import App from "./components/App"; // Importing App component
import ErrorFallback from "./components/ui/ErrorFallback"; // Importing ErrorFallback component

import "./index.css"; // Importing styles

const root = ReactDOM.createRoot(document.getElementById("root")); // Creating a root for ReactDOM

root.render(
  <React.StrictMode>
    {/* Ensures strict mode for components */}
    <ErrorBoundary
      FallbackComponent={ErrorFallback} // Error fallback component to show in case of an error
      onReset={() => window.location.replace("/")} // Redirects to homepage on error reset
    >
      <App /> {/* Rendering the main App component */}
    </ErrorBoundary>
  </React.StrictMode>,
);
