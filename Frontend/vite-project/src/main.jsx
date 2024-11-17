import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from './components/SignUp';
import UserAccount from './components/UserAccount';
import LogIn from './components/LogIn';
import UserLoginAccount from './components/UserLoginAccount';
import Videos from './body/Videos';

import userStore from './store/userStore';
import { Provider } from "react-redux"
import CorrectUser from './components/CorrectUser';
import DisplayVideos from './channel/DisplayVideos';

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MainVideos from './body/MainVideos';

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
      },
      {
        path : "/correctuser",
        element : <CorrectUser />
      },
      {
        path : "/displayvideos",
        element : <DisplayVideos />
      },
      {
        path : "/mainvideos/:id",
        element : <MainVideos />
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(

  <Provider store={userStore} >
     <RouterProvider router={appRouter}></RouterProvider> 
     <ToastContainer ></ToastContainer>
  </Provider>
)
