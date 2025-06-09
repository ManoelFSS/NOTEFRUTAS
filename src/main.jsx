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
import OneSignal from 'onesignal-cordova-plugin';

// OneSignal.setAppId("SEU_ONESIGNAL_APP_ID");

// OneSignal.promptForPushNotificationsWithUserResponse();

// OneSignal.getDeviceState().then((state) => {
//   const playerId = state.userId;
//   // Salvar o playerId no Supabase
// });


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LogsProvider>
          <ClientesProvider>
            <VendasProvider>
              <FornecedoresProvider>
                <ProductProvider>
                  <App />
                </ProductProvider>
              </FornecedoresProvider>
            </VendasProvider>
          </ClientesProvider>
        </LogsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
