import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
 
// Import the layouts
import RootLayout from './page/RootLayout'
import DashboardLayout from './page/DashboardLayout'
 
// Import the components
import ContactPage from './page/Contact'
import SignInPage from './page/SignIn.jsx'
import SignUpPage from './page/SignUp'
import DashboardPage from './page/Dashboard'
import WebSockets from './page/WebSockets'
 
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <DashboardPage /> },
      { path: "'/web-sockets'", element: <WebSockets /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/sign-in", element: <SignInPage /> },
      { path: "/sign-up", element: <SignUpPage /> },
      {
        element: <DashboardLayout />,
        path: "dashboard",
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
        ]
      }
    ]
  }
])
 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)