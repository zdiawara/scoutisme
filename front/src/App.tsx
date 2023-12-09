import { RouterProvider } from "react-router-dom";

import { router } from "routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "./assets/scss/Saas.scss";

import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "context/AuthContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <ToastContainer theme="colored" />
      </QueryClientProvider>
    </>
  );
}

export default App;
