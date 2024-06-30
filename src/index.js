import React from "react"; // Importing React library
import ReactDOM from "react-dom/client"; // Importing ReactDOM library for creating a root
import { ErrorBoundary } from "react-error-boundary"; // Importing ErrorBoundary component for error handling

import App from "./components/App"; // Importing main App component
import ErrorShield from "./components/UIManager/ErrorShield"; // Importing custom error fallback component

import "./index.css"; // Importing CSS styles

// Creating a root for ReactDOM and rendering the main App component within an ErrorBoundary
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorShield} // Component to show in case of an error
      onReset={() => window.location.replace("/")} // Action to perform on error reset
    >
      <App /> {/* Rendering the main App component */}
    </ErrorBoundary>
  </React.StrictMode>,
);
