import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import UserTable from './components/UserTable';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserTable />
    </QueryClientProvider>
  );
}

export default App;
