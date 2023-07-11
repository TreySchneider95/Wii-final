import React from 'react';
import Home from './components/home';
import Login from './components/login';
import Layout from './components/layout';
import Register from './components/register';
import Cart from './components/cart';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './App.css';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/cart",
          element: <Cart />
        }
      ]

    },
  ])
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
