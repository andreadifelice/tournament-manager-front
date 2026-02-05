import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from './pages/HomePage'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Teams from './pages/Teams'
import MainLayout from './layouts/MainLayout'
import Tournaments from './pages/Tournaments'


// creo una costante per poter navigare con le routes tra le pagine che vado a creare
const router = createBrowserRouter([
  {
    path: '/',
    element:<MainLayout/>,
    children: [
      {
        index: true,
        element: <HomePage />
      }
    ]
  },
  {
    path: '/teams',
    element:<MainLayout/>,
    children: [
      {
        index: true,
        element: <Teams />
      }
    ]
  },
  {
    path: '/tournaments',
    element:<MainLayout/>,
    children: [
      {
        index: true,
        element: <Tournaments />
      }
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
