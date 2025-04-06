import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from './layouts/RootLayout'
import { AuthProvider } from './context/AuthProvider'
import AuthLayout from './layouts/AuthLayout'
import ProtectedRoute from './components/Authorization/ProtectedRoute'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TodayTasksPage from './pages/Tasks/TodayTasksPage'
import UpcomingTasksPage from './pages/Tasks/UpcomingTasksPage'
import ArchivedTasksPage from './pages/Tasks/ArchivedTasksPage'
import TasksByQueryKeyPage from './pages/Tasks/TasksByQueryPage'
import ProjectsPage from './pages/Projects/ProjectsPage'
import ProjectPage from './pages/Projects/ProjectPage'
import SignUpPage from './pages/Authentication/SignUpPage'
import SignInPage from './pages/Authentication/SignInPage'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthProvider><AuthLayout/></AuthProvider>,
    children: [
      {
        path: 'signin', 
        element: <SignInPage/>,
      },
      {
        path: 'signup',
        element: <SignUpPage/>
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
            element: <TodayTasksPage/>
          },
          {
            path: '/tasks',
            children: [
              {
                index: true,
                element: <TodayTasksPage/>
              },
              {
                path: 'today',
                element: <TodayTasksPage/>
              },
              {
                path: 'upcoming',
                element: <UpcomingTasksPage/>
              },
              {
                path: 'archive',
                element: <ArchivedTasksPage/>
              },
              {
                path: 'search/:query',
                element: <TasksByQueryKeyPage/>
              }
            ]
          },
          {
            path: '/projects',
            children: [
              {
                index: true,
                element: <ProjectsPage/>
              },
              {
                path: ':id',
                element: <ProjectPage/>
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
      <ToastContainer/>
    </QueryClientProvider>
  )
}

export default App
