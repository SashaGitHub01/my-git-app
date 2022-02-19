import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/Context';
import {
   QueryClient,
   QueryClientProvider,
} from 'react-query';

const client = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false,
      },
   },
});

ReactDOM.render(
   <QueryClientProvider client={client}>
      <AuthProvider>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </AuthProvider>
   </QueryClientProvider>,
   document.getElementById('root')
);


reportWebVitals();
