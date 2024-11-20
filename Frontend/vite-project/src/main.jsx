import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import SignUp from './components/SignUp';
// import UserAccount from './components/UserAccount';
// import LogIn from './components/LogIn';
// import UserLoginAccount from './components/UserLoginAccount';
// import Videos from './body/Videos';
                                                                            // Importing All the Components which are to be Rendered
import userStore from './store/userStore';
import { Provider } from "react-redux"
// import CorrectUser from './components/CorrectUser';
// import DisplayVideos from './channel/DisplayVideos';

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import MainVideos from './body/MainVideos';
import ErrorPage from './ErrorPage';

import { lazy, Suspense } from 'react';                                      // Lazy Loading let's load only files which are only used
const SignUp = lazy(() => import('./components/SignUp'));
const UserAccount = lazy(() => import('./components/UserAccount'));
const LogIn = lazy(() => import('./components/LogIn'));
const UserLoginAccount = lazy(() => import('./components/UserLoginAccount'));
const Videos = lazy(() => import('./body/Videos'));
const CorrectUser = lazy(() => import('./components/CorrectUser'));
const DisplayVideos = lazy(() => import('./channel/DisplayVideos'));
const MainVideos = lazy(() => import('./body/MainVideos'));


const appRouter = createBrowserRouter([                                     // React-Router for Efficient Navigation
  {
    path : "/",
    element : <App />,                                                      // Parent path
    children : [                                                            // Children path
      {
        path : "/signup",
        element : <Suspense fallback={<div>Loading Sign Up Page...</div>}><SignUp /></Suspense>
      },
      {
        path : "/useraccount",
        element : <Suspense fallback={<div>Loading Your Account...</div>}><UserAccount /></Suspense>
      },
      {
        path : "/login",
        element : <Suspense fallback={<div>Loading Log In Page...</div>}><LogIn /></Suspense>
      },
      {
        path : "/loginuseraccount",
        element : <Suspense fallback={<div>Loading Logged In Account...</div>}><UserLoginAccount /></Suspense>
      },
      {
        path : "/getstartedwithvideos",
        element : <Suspense fallback={<div>Loading Videos...</div>}><Videos /></Suspense>
      },
      {
        path : "/correctuser",
        element : <Suspense fallback={<div>Loading Your Account Details...</div>}><CorrectUser /></Suspense>
      },
      {
        path : "/displayvideos",
        element : <Suspense fallback={<div>Loading Video...</div>}><DisplayVideos /></Suspense>
      },
      {
        path : "/mainvideos/:id",
        element : <Suspense fallback={<div>Loading Video...</div>}><MainVideos /></Suspense>
      },
    ],
    errorElement : <ErrorPage />
  }
])

createRoot(document.getElementById('root')).render(

  <Provider store={userStore} >
     <RouterProvider router={appRouter}></RouterProvider> 
     <ToastContainer ></ToastContainer>
  </Provider>
)
