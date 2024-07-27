function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <div>
        <div>
          <h1>Something went wrong</h1>
          <p>{error}</p>
          <button onClick={resetErrorBoundary}>Try again</button>
        </div>
      </div>
    </>
  );
}

export default ErrorFallback;
