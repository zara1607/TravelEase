import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './app/routes'
import { AppProviders } from './app/providers'

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </BrowserRouter>
  )
}

export default App