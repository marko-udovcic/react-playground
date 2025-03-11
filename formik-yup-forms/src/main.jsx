import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { RouterProvider, createBrowserRouter } from "react-router";
import EducationForm from "./pages/EducationForm.jsx";
import MainForm from "./pages/MainForm.jsx";
import UserInfo from "./pages/UserInfo.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/digital-resume",
        element: <MainForm />,
      },
      {
        path: "/profile",
        element: <UserInfo />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
