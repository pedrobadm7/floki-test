import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import useOnlineStatus from './hooks/useOnlineStatus';
import OfflinePage from './pages/OflinePage';
import UserTable from './pages/UserTable';

function App() {
  const queryClient = new QueryClient();
  const isOnline = useOnlineStatus();

  return (
    <QueryClientProvider client={queryClient}>
      {isOnline ? <UserTable /> : <OfflinePage />}
    </QueryClientProvider>
  );
}

export default App;
