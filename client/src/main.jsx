import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { store } from './store/store';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <HelmetProvider>
          <App />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#111',
                color: '#fff',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                borderRadius: '4px',
                padding: '12px 20px',
              },
            }}
          />
        </HelmetProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
