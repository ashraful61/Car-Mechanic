import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Checkout from "../Pages/Checkout/Checkout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Orders from "../Pages/Orders/Orders";
import Signup from "../Pages/Signup/Signup";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <Signup></Signup>,
      },
      {
        path: "checkout/:id",
        element: (
          <PrivateRoute>
            {" "}
            <Checkout></Checkout>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://genius-car-server-nu-bice.vercel.app/services/${params.id}`),
      },
      {
        path: "orders",
        element: (
          <PrivateRoute>
            <Orders></Orders>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
