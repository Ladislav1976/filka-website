import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Router, Route, Routes, Link, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import axios from "axios";

// import { RestfulProvider } from "restful-react";

import { QueryClientProvider, QueryClient, useQuery } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthProvider } from "./context/AuthProvider.jsx";

const queryClient = new QueryClient({
  defaultOptions: { queries: {staleTime: 1000 * 60 * 5} }
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={
            <QueryClientProvider client={queryClient} >
              <App />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
// const rootElement = document.getElementB

// const root = createRoot(rootElement);

// root.render(
//   <React.StrictMode>
//     <RestfulProvider base="http://127.0.0.1:8000">
//       <App />
//     </RestfulProvider>
//   </React.StrictMode>
// document.getElementById("root")
// );
