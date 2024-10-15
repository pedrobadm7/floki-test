import { AlertCircle } from 'lucide-react';

interface ErrorProps {
  onRetry: () => void;
}

const Error: React.FC<ErrorProps> = ({ onRetry }) => {
  return (
    <div
      className="flex flex-col items-center justify-center p-10 bg-background rounded-lg shadow"
      data-testid="error-component"
    >
      <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
        <AlertCircle className="w-8 h-8 text-red-600" />
      </div>
      <h2 className="mt-4 text-lg font-semibold text-gray-900">Error</h2>
      <p className="mt-2 text-center text-gray-600">
        An error occurred. Please try again
      </p>
      <button
        className="px-4 py-2 mt-6 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={onRetry}
      >
        Try Again
      </button>
    </div>
  );
};

export default Error;
