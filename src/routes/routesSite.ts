import IRoutes from "./IRoutes";
import Home from "../pages/site/Home";
import ProfilePage from "../pages/site/Profile";

const routesSite: IRoutes[] = [
  {
    path: "/",
    component: Home,
    visibleInDisplay: false,
    displayName: "Home",
    protected: true,
    adminOnly: false,
  },
  {
    path: "/profile",
    component: ProfilePage,
    visibleInDisplay: true,
    displayName: "Perfil",
    protected: true,
    adminOnly: false,
  },
];

export default routesSite;
