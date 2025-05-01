import { useEffect } from "react";
import styles from "./assets/css/SignIn.module.css";
import redai2 from "../../../assets/images/redai2.png";

const SignInDashPage = () => {
  useEffect(() => {
    document.body.style.fontFamily =
      "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    document.body.style.backgroundColor = "#f8f9fa";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
    document.body.style.minHeight = "100vh";
    document.body.style.backgroundImage =
      "linear-gradient(135deg, var(--secondary-color) 0%, #34495e 100%)";

    return () => {
      document.body.style.fontFamily = "";
      document.body.style.backgroundColor = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.display = "";
      document.body.style.justifyContent = "";
      document.body.style.alignItems = "";
      document.body.style.minHeight = "";
      document.body.style.backgroundImage = "";
    };
  }, []);

  return (
    <>
      <div className={`${styles["login-container"]}`}>
        <div className={`${styles["login-card"]}`}>
          <div className={`${styles["login-header"]}`}>
            <img className={`${styles.imgs}`} src={redai2} alt="RED Ai" />
          </div>

          <div className={`${styles["login-body"]}`}>
            <h2 className={`${styles["login-title"]}`}>
              Acesso Administrativo
            </h2>

            <form id="adminLoginForm">
              <div className={`${styles["form-group"]}`}>
                <label className={`${styles.labels}`} htmlFor="usuario">
                  <i className="fas fa-user-shield"></i> USUÁRIO ADMIN
                </label>
                <input
                  type="text"
                  id="usuario"
                  className={`${styles["form-control"]}`}
                  placeholder="Digite seu usuário"
                  required
                />
              </div>

              <div className={`${styles["form-group"]}`}>
                <label className={`${styles.labels}`} htmlFor="senha-admin">
                  <i className="fas fa-lock"></i> SENHA
                </label>
                <input
                  type="password"
                  id="senha-admin"
                  className={`${styles["form-control"]}`}
                  placeholder="Digite sua senha"
                  required
                />
              </div>

              <button type="submit" className={`${styles["btn-login"]}`}>
                <i className="fas fa-sign-in-alt"></i> ACESSAR PAINEL
              </button>

              <div id="errorMessage" className={`${styles["alert-message"]}`}>
                <i className="fas fa-exclamation-circle"></i> Credenciais
                inválidas!
              </div>
            </form>

            <div className={`${styles["login-footer"]}`}>
              <p>Acesso restrito à equipe administrativa</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInDashPage;
