import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

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
// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.jsx";
import { RestfulProvider } from "restful-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import React from 'react';
// import ReactDOM from 'react-dom/client'; <- This import is only for React version 18
import { render } from 'react-dom'; // <- This is the correct import statement for React version 17
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const queryClient = new QueryClient()

ReactDOM.createRoot (document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={QueryClient} base="http://127.0.0.1:8000">
      <App />
    </QueryClientProvider>
  </React.StrictMode>


// root.render(
//   <React.StrictMode>
//     <RestfulProvider base="http://127.0.0.1:8000">
//       <App />
//     </RestfulProvider>
//   </React.StrictMode>
  // document.getElementById("root")
);
