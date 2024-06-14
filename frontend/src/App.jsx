// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";

import {
  createBrowserRouter,
  // createRoutesFromElements,
  RouterProvider,
  // Route,
} from "react-router-dom";
import MainPage, {
  action as deleteUser,
  loader as fetchUsers,
} from "./pages/MainPage";
import AddUser, { action as addUser } from "./pages/AddUser";
import EditUser, {
  action as editUser,
  loader as getUser,
} from "./pages/EditUser";
const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <MainPage></MainPage>,
        loader: fetchUsers,
        action: deleteUser,
      },
      {
        path: "add-user",
        element: <AddUser></AddUser>,
        action: addUser,
      },
      {
        path: ":userId",
        element: <EditUser></EditUser>,
        loader: getUser,
        action: editUser,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
