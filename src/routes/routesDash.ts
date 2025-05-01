import DepositDashPage from "../pages/dashboard/Deposit";
import HomeDashPage from "../pages/dashboard/Home";
import NotificationDashPage from "../pages/dashboard/Notification";
import ProductsDashPage from "../pages/dashboard/Products";
import SettingsDashPage from "../pages/dashboard/Settings";
import SignInDashPage from "../pages/dashboard/SignIn";
import ToRemoveDashPage from "../pages/dashboard/ToRemove";
import UsersDashPage from "../pages/dashboard/Users";
import IRoutes from "./IRoutes";

const routesDash: IRoutes[] = [
  {
    path: "/dashboard",
    component: HomeDashPage,
    visibleInDisplay: false,
    displayName: "Home",
    protected: true,
    adminOnly: true,
  },
  {
    path: "/dashboard/settings",
    component: SettingsDashPage,
    visibleInDisplay: false,
    displayName: "Configurações",
    protected: true,
    adminOnly: true,
  },
  {
    path: "/dashboard/deposit",
    component: DepositDashPage,
    visibleInDisplay: false,
    displayName: "Depósitos",
    protected: true,
    adminOnly: true,
  },
  {
    path: "/dashboard/signin",
    component: SignInDashPage,
    visibleInDisplay: false,
    displayName: "Login",
    protected: true,
    adminOnly: true,
  },
  {
    path: "/dashboard/notification",
    component: NotificationDashPage,
    visibleInDisplay: false,
    displayName: "Notificações",
    protected: true,
    adminOnly: true,
  },
  {
    path: "/dashboard/products",
    component: ProductsDashPage,
    visibleInDisplay: false,
    displayName: "Produtos",
    protected: true,
    adminOnly: true,
  },
  {
    path: "/dashboard/to-remove",
    component: ToRemoveDashPage,
    visibleInDisplay: false,
    displayName: "Gerenciar Retiradas",
    protected: true,
    adminOnly: true,
  },
  {
    path: "/dashboard/users",
    component: UsersDashPage,
    visibleInDisplay: false,
    displayName: "Usuarios",
    protected: true,
    adminOnly: true,
  },
];

export default routesDash;
