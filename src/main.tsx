import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { AuthProvider } from './app/context/AuthContext';
import './styles/index.css';
import {Navbar} from './app/components/Navbar';
import { DesktopOnly } from './app/components/DesktopOnly';
import { ThemeProvider } from './app/theme/ThemeProvider';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
  <BrowserRouter>
  <ThemeProvider>
  <DesktopOnly>
    <App />
  </DesktopOnly>
  </ThemeProvider>
  </BrowserRouter>
</AuthProvider>

  </React.StrictMode>
);
