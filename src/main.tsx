import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from './pages/HomePage'
import { createBrowserRouter, RouterProvider } from 'react-router'


// creo una costante per poter navigare con le routes tra le pagine che vado a creare
const router = createBrowserRouter([
  {
    path: '/',
    //element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      }
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
