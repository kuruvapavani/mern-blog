
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Layout from './pages/components/Layout.jsx'; // Assuming Layout.js is in the same directory
import Home from './pages/Home.jsx'; // Example component for home page
import Authors from "./pages/Authors.jsx"
import ErrorPage from "./pages/ErrorPage.jsx"
import PostDetail from "./pages/PostDetail.jsx"
import Register from "./pages/Register.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import AuthorPosts from "./pages/AuthorPosts.jsx"
import CategoryPosts from "./pages/CategoryPosts.jsx"
import DeletePost from "./pages/DeletePost.jsx"
import Login from "./pages/Login.jsx"
import Logout from "./pages/Logout.jsx"
import UserProfile from "./pages/UserProfile.jsx"
import CreatePost from './pages/CreatePost.jsx';
import "./index.css"
import UserProvider from './pages/context/userContext.js';
import EditPost from './pages/EditPost.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
console.log(process.env.REACT_APP_HI);
const router = createBrowserRouter([
    {
      path: "/",
      element: <UserProvider><Layout /></UserProvider>,
      errorElement:<ErrorPage />,
      children: [
        {
          index : true,
          element: <Home />,
        },
        {
          path : "/post/:id",
          element:<PostDetail />
        },
        {
          path:"/register",
          element:<Register />
        },
        {
          path:"/edit/:id",
          element:<EditPost />
        },
        {
          path:"/delete/:id",
          element:<DeletePost />
        },
        {
          path:"/posts/categories/:category",
          element:<CategoryPosts />
        },
        {
          path:"/login",
          element:<Login />
        },
        {
          path:"/logout",
          element:<Logout />
        },
        {
          path:"/authors",
          element:<Authors />
        },
        {
          path:"/posts/author/:authorId",
          element:<AuthorPosts />
        },
        {
          path:"/dashboard",
          element:<Dashboard />
        },
        {
          path:"/profile",
          element:<UserProfile />
        },
        {
          path:"/create",
          element:<CreatePost />
        },
        {
          path:"/contact",
          element:<Contact />
        },
        {
          path:"/about",
          element:<About />
        }
      ],
    },
  ]);
  
  ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
  );