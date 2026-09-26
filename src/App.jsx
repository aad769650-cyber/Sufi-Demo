import React from 'react'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layout/MainLayout'

import Products from './Products'

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