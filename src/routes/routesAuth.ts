import IRoutes from "./IRoutes";
import SignIn from "../pages/auth/SignIn";
import Signup from "../pages/auth/SignUp";
import ForgotPasswordPage from "../pages/auth/ForgotPassword";
import ResetPasswordPage from "../pages/auth/ResetPassword";
import EmailVerification from "../pages/auth/EmailVerification";
import AccountActivationReminder from "../pages/auth/AccountActivationReminder";

const routesAuth: IRoutes[] = [
  {
    path: "/auth/signin",
    component: SignIn,
    visibleInDisplay: false,
    displayName: "Login",
    protected: false,
    adminOnly: false,
  },
  {
    path: "/auth/signup",
    component: Signup,
    visibleInDisplay: false,
    displayName: "Registrar",
    protected: false,
    adminOnly: false,
  },
  {
    path: "/auth/activate-account",
    component: AccountActivationReminder,
    visibleInDisplay: false,
    displayName: "Ativar Conta",
    protected: false,
    adminOnly: false,
  },
  {
    path: "/auth/email/verify",
    component: EmailVerification,
    visibleInDisplay: false,
    displayName: "Verificar Registro",
    protected: false,
    adminOnly: false,
  },
  {
    path: "/auth/forgot-password",
    component: ForgotPasswordPage,
    visibleInDisplay: false,
    displayName: "Recuperar Senha",
    protected: false,
    adminOnly: false,
  },
  {
    path: "/auth/reset-password",
    component: ResetPasswordPage,
    visibleInDisplay: false,
    displayName: "Redefinir Senha",
    protected: false,
    adminOnly: false,
  },
];

export default routesAuth;

