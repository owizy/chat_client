import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import App from './App';
import ThemeProvider from './context/Themecontext';
import { AuthProvider } from './context/AuthContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <BrowserRouter>
   <AuthProvider>
   <ThemeProvider>
    <App />
   </ThemeProvider>
   </AuthProvider>
   </BrowserRouter>
);
