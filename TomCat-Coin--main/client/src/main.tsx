import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './components/layouts/MainLayout.tsx'
import { Provider } from 'react-redux'
import ReduxStore from './redux/store.tsx'
import Splash from './app/Splash.tsx'
import Error from './app/Error.tsx'
import Refer from './app/Refer.tsx'
import { Toaster } from 'react-hot-toast'
import Login from './admin/Login.tsx'
import AdminLayout from './components/layouts/AdminLayout.tsx'
import AdminProtector from './utils/AdminProtector.tsx'
import UserManagement from './admin/UserManagement.tsx'
import TaskManagement from './admin/TaskManagement.tsx'
import RouteProtector from './utils/RouteProtector.tsx'
import Mine from './app/Mine.tsx'
import Home from './app/Home.tsx'
import Leaderboard from './app/Leaderboard.tsx'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import WalletConnect from './app/WalletConnect.tsx'
import Boosting from './app/Boosting.tsx'


const route = createBrowserRouter([
  {
    path: '/splash',
    element: <Splash />,
    errorElement: <Error />
  }, {
    path: '/auth/0/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'login',
        element: <Login />
      }, {
        index: true,
        // element: <AdminProtector><Dashboard /></AdminProtector>
        element: <AdminProtector><UserManagement /></AdminProtector>
      },
      {
        path: 'task',
        element: <TaskManagement />
      }
    ]
  },
  {
    path: '/',
    errorElement: <Error />,
    element: <RouteProtector><MainLayout /></RouteProtector>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        index: true,
        element: <Home />
      },
      {
        path: 'mine',
        element: <Mine />,
      },
      {
        path: 'refer',
        element: <Refer />,
      },
      {
        path: 'leaderboard',
        element: <Leaderboard />
      },
      {
        path: '/wallet-connect',
        element: <WalletConnect />
      },
      {
        path: '/boosting',
        element: <Boosting />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="" data-theme="dark">
      <Provider store={ReduxStore}>
        <TonConnectUIProvider manifestUrl="https://tom-cats-server.vercel.app/manifest">
          <RouterProvider router={route} />
          <Toaster />
        </TonConnectUIProvider>
      </Provider>
    </div>
  </React.StrictMode>,
)
