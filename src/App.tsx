import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import UserTable from './pages/UserTable';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserTable />
    </QueryClientProvider>
  );
}

export default App;
