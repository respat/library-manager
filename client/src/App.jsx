import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Register,
  Login,
  DashboardLayout,
  Landing,
  Error,
  AddBook,
  Stats,
  AllBooks,
} from "./pages";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as addBookAction } from "./pages/AddBook";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { loader as allBooksLoader } from "./pages/AllBooks";
import { loader as allUsersLoader } from "./pages/AllUsers";
import AllUsers from "./pages/AllUsers";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddBook />,
            action: addBookAction,
          },
          {
            path: "all-books",
            element: <AllBooks />,
            loader: allBooksLoader,
          },
          { path: "all-users", element: <AllUsers />, loader: allUsersLoader },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
