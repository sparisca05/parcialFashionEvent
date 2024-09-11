/*import { StrictMode } from 'react'*/
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import App from './App.tsx'
import EventosList from "./components/EventosList.tsx";
import Profile from "./components/Profile.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children:[
            {path: "/eventos", element: <EventosList />},
            {path: "/perfil", element: <Profile />},
        ]
    },
    //Se añaden aca afuera si se quiere que queden fuera del root
]);

createRoot(document.getElementById('root')!).render(
    /*
  <StrictMode>
    <App />
  </StrictMode>,
  */
    <RouterProvider router={router}/>
)
