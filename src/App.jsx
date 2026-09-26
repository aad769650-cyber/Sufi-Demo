import React from 'react'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'

import Products from './Products'
import MainLayout from './Layout/MainLayout'

const App = () => {


const router=createBrowserRouter([
  {
    path:"/",
    element:<MainLayout></MainLayout>,


    children:[{
      path:"/",
      element:<Products></Products>
    },
]
},

])



  return (
<RouterProvider router={router}></RouterProvider>



)
}

export default App