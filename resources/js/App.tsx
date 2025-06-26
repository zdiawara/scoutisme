import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { router } from "routes";

import { AuthProvider } from "context/AuthContext";

import { ToastContainer } from "react-toastify";

import { useEffect } from "react";
import { authApi } from "./api";

import "./assets/sass/app.scss";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      networkMode: "offlineFirst",
      // cacheTime: 0,
      retry: false,
    },
  },
});

function App() {
  useEffect(() => {
    const getCsrfCookie = async () => {
      await authApi.getCsrfCookie();
    };

    getCsrfCookie();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <ToastContainer theme="colored" />
    </QueryClientProvider>
  );
}

export default App;
