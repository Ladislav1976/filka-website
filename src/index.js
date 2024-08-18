// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import createRoot from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import axios from "axios";

// import { RestfulProvider } from "restful-react";

import { QueryClientProvider, QueryClient,useQuery } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { AuthProvider } from "./context/AuthProvider.jsx";

const queryClient = new QueryClient({
  defaultOptions:{queries:1000*60*5}
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <QueryClientProvider client={queryClient} >
      {/* <AuthProvider> */}
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      {/* </AuthProvider> */}
    </QueryClientProvider>

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
