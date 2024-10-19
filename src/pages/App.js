import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "../app/services/store";

import { setConfigAxios } from "../app/fetch";
import CONST from "../app/services/const";
import InitComponent from "../components/InitComponent";
import BiosPage from "./bios/BioPage";
import ChangePasswordPage from "./change-password/ChangePasswordPage";
import HomePage from "./home/HomePage";
import JobCreatePage from "./jobs/JobCreatePage";
import JobPage from "./jobs/JobPage";
import LoginPage from "./login/LoginPage";
import PageNotFound from "./page-not-found/PageNotFoundPage";
import UserPage from "./user/UserPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "services",
        errorElement: <PageNotFound />,
        children: [
          {
            path: "settings/job",
            element: <JobPage />,
            errorElement: <PageNotFound />,
          },
          {
            path: "settings/job/create",
            element: <JobCreatePage />,
            errorElement: <PageNotFound />,
          },
          {
            path: "settings/job/edit/:id",
            element: <JobCreatePage />,
            errorElement: <PageNotFound />,
          },
          {
            path: "settings/bio",
            element: <BiosPage />,
            errorElement: <PageNotFound />,
          },
          {
            path: "settings/user",
            element: <UserPage />,
            errorElement: <PageNotFound />,
          },
        ],
      },
      {
        path: "system",
        errorElement: <PageNotFound />,
        children: [
          {
            path: "change-password",
            element: <ChangePasswordPage />,
            errorElement: <PageNotFound />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <PageNotFound />,
  },
]);

const accessToken = localStorage.getItem(CONST.STORAGE.ACCESS_TOKEN);
setConfigAxios(accessToken);

function App() {
  return (
    <Provider store={store}>
      <InitComponent />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
