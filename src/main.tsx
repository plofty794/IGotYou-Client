import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
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
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Suspense>
  </React.StrictMode>
);
