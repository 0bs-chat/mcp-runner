import '@/entrypoints/style.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from "@/components/theme-provider"

import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="bg-background text-foreground h-[300px] w-[500px] flex items-center justify-center">
        <App />
      </div>
    </ThemeProvider>
  </React.StrictMode>,
)
