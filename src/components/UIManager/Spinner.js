// Import statement for Material-UI CircularProgress component
import { CircularProgress } from "@mui/material";

// Spinner component for displaying loading spinner
function Spinner({ addOuterClass }) {
  // Rendering spinner with optional outer class
  return (
    <div
      className={
        addOuterClass
          ? "flex h-full items-center justify-start"
          : "flex h-screen items-center justify-center"
      }
    >
      <CircularProgress style={{ color: "#FFA500" }} />
    </div>
  );
}

export default Spinner;
