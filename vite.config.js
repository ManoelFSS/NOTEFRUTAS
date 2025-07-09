import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Seu Nome do App',
        short_name: 'NomeApp',
        description: 'Descrição do seu app',
        theme_color: ' #FE7E01',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/carrinho.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/carrinho.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
