import React from "react";

function ErrorShield({ error, resetErrorBoundary }) {
  return (
    <>
      <div>
        <div>
          {/* Error message */}
          <h1>Something went wrong</h1>
          <p>{error}</p>
          {/* Button to try again */}
          <button onClick={resetErrorBoundary}>Try again</button>
        </div>
      </div>
    </>
  );
}

export default ErrorShield;
