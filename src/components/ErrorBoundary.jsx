import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-6 text-center">

          <h1 className="text-5xl mb-4">
            ⚠️
          </h1>

          <h2 className="text-3xl font-bold mb-3">
            Something went wrong
          </h2>

          <p className="text-gray-600 mb-6">
            An unexpected error occurred while loading this page.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Reload Page
          </button>

        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;