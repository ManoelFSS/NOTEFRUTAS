import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext';
import { ClientesProvider } from './context/ClientesContext.jsx';
import { ProductProvider} from './context/ProductContext.jsx';
import {FornecedoresProvider } from './context/FornecedoresContext.jsx';
import {LogsProvider} from './context/LogContext.jsx';
import {VendasProvider} from './context/VendasContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import { DashboardProvider } from './context/DashboardContext.jsx';
import {BuysProvider} from './context/BuysContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DashboardProvider>
          <LogsProvider>
            <ClientesProvider>
              <VendasProvider>
                <FornecedoresProvider>
                  <BuysProvider>
                    <ProductProvider>
                      <App />
                    </ProductProvider>
                  </BuysProvider>
                </FornecedoresProvider>
              </VendasProvider>
            </ClientesProvider>
          </LogsProvider>
        </DashboardProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
