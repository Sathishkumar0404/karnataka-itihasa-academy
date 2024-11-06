import { createBrowserRouter } from "react-router-dom";
import SidebarLayout from "./components/SidebarLayout.jsx";
import Home from "./pages/home/index.jsx";


  const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <SidebarLayout />,
            children:[
              {
                path: "/home",
                element: <Home />
              }
            ]
        }
    ]
  );

  export default router;