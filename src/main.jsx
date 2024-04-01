import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { TokensProvider } from "./hooks/useTokens";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TokensProvider>
          <App />
        </TokensProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
