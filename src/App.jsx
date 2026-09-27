import React from 'react'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'

import Products from './Products'
import MainLayout from './Layout/MainLayout'
import Home from './components/Home'

const App = () => {


const router=createBrowserRouter([
  {
    path:"/",
    element:<MainLayout></MainLayout>,


    children:[{
      path:"/",
      element:<Home></Home>
    },
]
},

])



  return (
<RouterProvider router={router}></RouterProvider>



)
}

export default App