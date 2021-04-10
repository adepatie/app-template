import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";

const queryClient = new QueryClient();
function App({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">{children}</div>
    </QueryClientProvider>
  );
}

export default App;
