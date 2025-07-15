import React from "react";

interface LoadingStateProps {
  loading: boolean;
  error: string | null;
  hasData: boolean;
  children: React.ReactNode;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  loading,
  error,
  hasData,
  children,
}) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className="error-container">
        <div className="error">No data available</div>
      </div>
    );
  }

  return <>{children}</>;
};
