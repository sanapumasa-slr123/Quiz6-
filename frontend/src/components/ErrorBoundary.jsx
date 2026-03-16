import React from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <div className="error-box">
            <h1>Oops! Something went wrong</h1>
            <p>We encountered an unexpected error. Please try refreshing the page.</p>
            <button
              className="error-button"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
            <details className="error-details">
              <summary>Error Details</summary>
              <pre>{this.state.error && this.state.error.toString()}</pre>
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
