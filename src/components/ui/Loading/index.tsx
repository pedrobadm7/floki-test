import { Loader2 } from 'lucide-react';

const Loading: React.FC = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-64"
      data-testid="loading-component"
    >
      <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      <p className="mt-4 text-lg text-gray-600">Loading customers...</p>
    </div>
  );
};

export default Loading;
