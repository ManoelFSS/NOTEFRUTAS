import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext';
import { ClientesProvider } from './context/ClientesContext.jsx';
import { ProductProvider} from './context/ProductContext.jsx';
import {FornecedoresProvider } from './context/FornecedoresContext.jsx';
import {LogsProvider} from './context/LogContext.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LogsProvider>
          <ClientesProvider>
            <FornecedoresProvider>
              <ProductProvider>
                <App />
              </ProductProvider>
            </FornecedoresProvider>
          </ClientesProvider>
        </LogsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
