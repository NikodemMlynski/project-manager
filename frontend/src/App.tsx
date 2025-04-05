import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from './layouts/RootLayout'
import { AuthProvider } from './context/AuthProvider'
import AuthLayout from './layouts/AuthLayout'
import ProtectedRoute from './components/Authorization/ProtectedRoute'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthProvider><AuthLayout/></AuthProvider>,
    children: [
      {
        path: 'signin', element: <h1>Strona z formularzem logowania</h1>
      }
    ]
  },
  {
    path: '/',
    element: <AuthProvider><ProtectedRoute/></AuthProvider>,
    children: [
      {
        path: '/',
        element: <RootLayout/>,
        children: [
          {
            index: true,
            element: <h1>Tu będzie dashboard czyli dzisejsze zadania</h1>
          },
          {
            path: '/tasks',
            children: [
              {
                index: true,
                element: <h1>Liste wszystkich zadań które nie są skonczone</h1>
              },
              {
                path: 'today',
                element: <h1>Dzisiejsze zadania</h1>
              },
              {
                path: 'upcoming',
                element: <h1>Nadchodzące zadania</h1>
              },
              {
                path: 'archive',
                element: <h1>Zarchiwizowane zadania</h1>
              },
              {
                path: 'search/:query',
                element: <h1>task po query key</h1>
              }
            ]
          },
          {
            path: '/projects',
            children: [
              {
                index: true,
                element: <h1>Lista wszystkich projektow</h1>
              },
              {
                path: ':id',
                element: <h1>Projekt po id</h1>
              }
            ]
          }
        ]
      }
    ]
  }
])
function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  )
}

export default App
