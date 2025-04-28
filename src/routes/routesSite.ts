import IRoutes from "./IRoutes";
import Home from "../pages/site/Home";
import ProfilePage from "../pages/site/Profile";
import ProductPage from "../pages/site/Products";
import TeamsPage from "../pages/site/Teams";

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
  {
    path: "/products",
    component: ProductPage,
    visibleInDisplay: true,
    displayName: "Produtos",
    protected: true,
    adminOnly: false,
  },
  {
    path: "/teams",
    component: TeamsPage,
    visibleInDisplay: true,
    displayName: "Equipe",
    protected: true,
    adminOnly: false,
  },
  {
    path: "/profile",
    component: ProfilePage,
    visibleInDisplay: true,
    displayName: "Equipe",
    protected: true,
    adminOnly: false,
  },
];

export default routesSite;
