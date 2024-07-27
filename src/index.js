import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/utils/ErrorFallback';
import { LoginProvider } from './components/context/login/LoginContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginProvider>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.replace('/')}
      >
        <App />
      </ErrorBoundary>
    </LoginProvider>
  </React.StrictMode>
);
