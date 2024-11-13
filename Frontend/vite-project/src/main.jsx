import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from './components/SignUp';
import UserAccount from './components/UserAccount';
import LogIn from './components/LogIn';
import UserLoginAccount from './components/UserLoginAccount';
import Videos from './body/Videos';

const appRouter = createBrowserRouter([
  {
    path : "/",
    element : <App />,
    children : [
      {
        path : "/signup",
        element : <SignUp />
      },
      {
        path : "/useraccount",
        element : <UserAccount />
      },
      {
        path : "/login",
        element : <LogIn />
      },
      {
        path : "/loginuseraccount",
        element : <UserLoginAccount />
      },
      {
        path : "/getstartedwithvideos",
        element : <Videos />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  
   <RouterProvider router={appRouter}></RouterProvider> 
  
)
