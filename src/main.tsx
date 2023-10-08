import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  // createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import {Index, Root, ErrorPage, Contact, Create} from './roots/rootMain'
import { action, loader } from "./roots/Root"
import { editAction } from './roots/Create';
import { eventLoader, contactAction } from './roots/Contact';
import { deleteAction } from './roots/delete';

import './index.css'

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage position="root"/>,
    loader: loader,
    action: action,
    children: [
      {
        errorElement: <ErrorPage position="children"/>,
        children:[
          {
            index:true,
            element: <Index/>
          },
          {
            path:"events/:contactId",
            element: <Contact />,
            loader: eventLoader,
            action: contactAction,
          },
          {
            path:"events/:contactId/edit",
            element:<Create />,
            loader: eventLoader,
            action: editAction,
          },
          {
            path:"events/:contactId/delete",
            action: deleteAction,
          }
        ]
      },
    ]
}]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
