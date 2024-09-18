/*import { StrictMode } from 'react'*/
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import EventosList from "./components/EventosList.tsx";
import Profile from "./components/Profile.tsx";
import Home from "./screens/Home.tsx";
import Login from "./screens/Login.tsx";
import Register from "./screens/Register.tsx";

const router = createBrowserRouter([
    {
        path: "/", element: <Home />,

    },
    //Se añaden aca afuera si se quiere que queden fuera del root
    {path: "/login", element: <Login />,},
    {path: "/register", element: <Register />,},
    {path: "/eventos", element: <EventosList />,},
    {path: "/perfil", element: <Profile />,}
]);

createRoot(document.getElementById('root')!).render(
    /*
  <StrictMode>
    <App />
  </StrictMode>,
  */
    <RouterProvider router={router}/>
)
