import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter, createRoute, createRootRoute, redirect } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.tsx'

const queryClient = new QueryClient()

const rootRoute = createRootRoute()

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
  beforeLoad: () => {
    if (!localStorage.getItem('token')) {
      throw redirect({ to: '/login' })
    }
  }
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
})

const RegisterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: Register,
})

const routeTree = rootRoute.addChildren([homeRoute, loginRoute, RegisterRoute])

const router = createRouter({ routeTree })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)