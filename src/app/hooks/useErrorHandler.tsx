import { useState } from "react";
import Error from "../error";

const useErrorHandler = () => {
  const [error, setError] = useState<Error | null>(null);

  const handleReset = () => {
    setError(null);
    window.location.reload();
  };

  const renderError = () => {
    if (error) {
      return <Error error={error} reset={handleReset} />;
    }
  };

  return { error, setError, handleReset, renderError };
};

export default useErrorHandler;
