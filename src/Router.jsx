import { createBrowserRouter } from "react-router-dom";
import SidebarLayout from "./components/SidebarLayout.jsx";
import Home from "./pages/home/index.jsx";


  const router = createBrowserRouter(
    [
        {
            path: "/karnataka-itihasa-academy/",
            element: <SidebarLayout />,
            children:[
              {
                path: "",
                element: <Home />
              }
            ]
        }
    ]
  );

  export default router;