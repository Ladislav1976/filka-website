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
import  createRoot from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import axios from "axios";

// import { RestfulProvider } from "restful-react";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// const defaultQueryFn =  ({ queryKey }) => {
//   const { data } = fetch(
//     `"http://127.0.0.1:8000"${queryKey[0]}`,
//   ).then((res)=>res.json())
//   return data

// }

//  async function defaultQueryFn ({ queryKey }) {
//   const { data } = await axios.get(
//     `http://127.0.0.1:8000${queryKey[0]}`,
//   )
//   // .then((users) => users.map((user) => user.id))
//   return data
// }
const queryClient = new QueryClient()
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime:5 * 1000,
//       queryFn: defaultQueryFn,
  
//       // timeout: 10000,
//       // initialData: defaultQueryFn,
//       staleTime: 1000,
//     },
//   },
// })
// const BASE_URL = "http://127.0.0.1:8000"
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//         queryFn: async ({ queryKey: [url] }) => {
//             if (typeof url === 'string') {
//                 const { data } = await axios.get(`${BASE_URL}/${url.toLowerCase()}`)
//                 return data
//             }
//             throw new Error('Invalid QueryKey')
//         },
//     },
// },
// });
//   defaultOptions: {
//     queries: {
//       queryFn: defaultQueryFn,
//     },
//   }, onError: (error) => {
//     console.log(error)
//   },
//   onSuccess: (data) => {
//     console.log(data)
//   },
//   onSettled: (data, error) => {
//     console.log(data, error)
//   },

// })

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} >
      <App />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
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
