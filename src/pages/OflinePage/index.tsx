import { RefreshCw, WifiOff } from 'lucide-react';

const OfflinePage = () => {
  const handleRetryConnection = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-background rounded-lg shadow-md">
        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-blue-100 rounded-full">
          <WifiOff className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="mt-6 text-2xl font-semibold text-center text-gray-900">
          You're offline
        </h1>
        <p className="mt-2 text-center text-gray-600">
          Please check your internet connection and try again.
        </p>
        <div className="mt-8 space-y-4">
          <button
            onClick={handleRetryConnection}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry Connection
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfflinePage;
