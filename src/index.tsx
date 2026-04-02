import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "i18n";
import App from "App";
import { MaterialUIControllerProvider } from "context";
import { AuthProvider } from "shared/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const container = document.getElementById("app");
if (!container) {
  throw new Error("Root element #app not found");
}
const root = createRoot(container);

export const mainQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 120,
      gcTime: 1000 * 60 * 10,
      retry: 1,
      refetchOnWindowFocus: false,
      throwOnError: true,
    },
  },
});

root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <QueryClientProvider client={mainQueryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </MaterialUIControllerProvider>
  </BrowserRouter>,
);
