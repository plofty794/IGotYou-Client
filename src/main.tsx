import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import UserStateContext from "./context/UserStateContext.tsx";
import SocketContext from "./context/SocketContext.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const App = lazy(() => import("./App.tsx"));

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense>
      <QueryClientProvider client={queryClient}>
        <SocketContext>
          <UserStateContext>
            <App />
          </UserStateContext>
        </SocketContext>
        <Toaster />
        <SonnerToaster
          closeButton
          theme="light"
          richColors
          position="top-center"
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Suspense>
  </React.StrictMode>,
);
