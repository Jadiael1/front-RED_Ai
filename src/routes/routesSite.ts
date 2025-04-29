import IRoutes from "./IRoutes";
import Home from "../pages/site/Home";
import ProfilePage from "../pages/site/Profile";
import ProductPage from "../pages/site/Products";
import TeamsPage from "../pages/site/Teams";
import AboutUsPage from "../pages/site/AboutUs";
import SupportCenterPage from "../pages/site/SupportCenter";
import TermsAndConditionsPage from "../pages/site/TermsAndConditions";
import PrivacyPolicyPage from "../pages/site/PrivacyPolicy";
import DownloadAppPage from "../pages/site/DownloadApp";
import MyInvestmentsPage from "../pages/site/MyInvestments";
import TransactionHistoryPage from "../pages/site/TransactionHistory";
import AccountManagementPage from "../pages/site/AccountManagement";
import DepositPage from "../pages/site/Deposit";
import PaymentPage from "../pages/site/Payment";

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
  {
    path: "/about-us",
    component: AboutUsPage,
    visibleInDisplay: true,
    displayName: "Sobre Nós",
    protected: true,
    adminOnly: false,
  },
  {
    path: "/support-center",
    component: SupportCenterPage,
    visibleInDisplay: true,
    displayName: "Central de Suporte",
    protected: true,
    adminOnly: false,
  },
  {
    path: "/terms-and-conditions",
    component: TermsAndConditionsPage,
    visibleInDisplay: true,
    displayName: "Termos e Condições",
    protected: true,
    adminOnly: false,
  },
  {
    path: "/privacy-policy",
    component: PrivacyPolicyPage,
    visibleInDisplay: true,
    displayName: "Política de Privacidade",
    protected: true,
    adminOnly: false,
  },
  {
    path: "/download-app",
    component: DownloadAppPage,
    visibleInDisplay: true,
    displayName: "Baixar App",
    protected: true,
    adminOnly: false,
  },
  {
    path: "/my-investments",
    component: MyInvestmentsPage,
    visibleInDisplay: true,
    displayName: "Meus Investimentos",
    protected: true,
    adminOnly: false,
  },
  {
    path: "/transaction-history",
    component: TransactionHistoryPage,
    visibleInDisplay: true,
    displayName: "Historico de transações",
    protected: true,
    adminOnly: false,
  },
  {
    path: "/account-management",
    component: AccountManagementPage,
    visibleInDisplay: true,
    displayName: "Gestão da Conta",
    protected: true,
    adminOnly: false,
  },
  {
    path: "/deposit",
    component: DepositPage,
    visibleInDisplay: true,
    displayName: "Depósito",
    protected: true,
    adminOnly: false,
  },
  {
    path: "/payment",
    component: PaymentPage,
    visibleInDisplay: true,
    displayName: "Pagamento",
    protected: true,
    adminOnly: false,
  },
];

export default routesSite;
