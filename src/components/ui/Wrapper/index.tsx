import Error from '../Error';
import Loading from '../Loading';

interface WrapperProps {
  loading: boolean;
  error: boolean;
  children: React.ReactNode;
  onRetry: () => void;
}

const Wrapper: React.FC<WrapperProps> = ({
  loading,
  error,
  children,
  onRetry,
}) => {
  if (loading) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <Error onRetry={onRetry} />
      </div>
    );
  }

  return <>{children}</>;
};

export default Wrapper;
