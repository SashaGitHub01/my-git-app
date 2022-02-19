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

const client = new QueryClient({});

ReactDOM.render(
   <BrowserRouter>
      <QueryClientProvider client={client}>
         <AuthProvider>
            <App />
         </AuthProvider>
      </QueryClientProvider>
   </BrowserRouter>,
   document.getElementById('root')
);


reportWebVitals();
