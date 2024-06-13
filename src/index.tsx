 import SignupTable from './pages/signup/SignTable';
 import SignupForm from './pages/signup/SignForm';
 import App from './App';
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
     {
          path: "/",
          element:<SignupTable />,
        },
        {
          path: "SignupForm",
          element:<SignupForm />,
        }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement ).render(
    <RouterProvider router={router} />
);
