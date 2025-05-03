import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import styles from "./assets/css/AccountManagement.module.css";

const AccountManagementPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    document.body.style.fontFamily =
      "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    document.body.style.margin = "0";
    document.body.style.padding = "0 0 80px 0";
    document.body.style.backgroundColor = "#f5f7fa";
    document.body.style.color = "#333";
    document.body.style.lineHeight = "1.6";

    const el = document.body;
    if (el) {
      el.style.setProperty("--primary-color", "#3498db");
      el.style.setProperty("--secondary-color", "#2c3e50");
      el.style.setProperty("--accent-color", "#e74c3c");
      el.style.setProperty("--light-color", "#ecf0f1");
      el.style.setProperty("--dark-color", "#34495e");
      el.style.setProperty("--success-color", "#2ecc71");
      el.style.setProperty("--warning-color", "#f39c12");
    }

    return () => {
      document.body.style.fontFamily = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
      document.body.style.lineHeight = "";

      if (el) {
        el.style.removeProperty("--primary-color");
        el.style.removeProperty("--secondary-color");
        el.style.removeProperty("--accent-color");
        el.style.removeProperty("--light-color");
        el.style.removeProperty("--dark-color");
        el.style.removeProperty("--success-color");
        el.style.removeProperty("--warning-color");
      }
    };
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.h1s}>Gestão da Minha Conta</h1>
          <p>
            Gerencie suas informações pessoais e segurança <br />O fornecimento
            de dados falsos compromete o estado da sua conta.
          </p>
        </div>

        {/* <!-- Seção de Informações Pessoais --> */}
        <div className={styles["account-section"]}>
          <div className={styles["section-title"]}>
            <i className="fas fa-user-circle"></i> Informações Pessoais
          </div>

          <form id="personal-info-form">
            <div className={styles["form-row"]}>
              <div className={styles["form-group"]}>
                <label className={styles.labels} htmlFor="full-name">
                  Nome Completo
                </label>
                <input
                  className={styles.inputs}
                  type="text"
                  id="full-name"
                  value="Nelo Designer"
                  required
                />
              </div>

              <div className={styles["form-group"]}>
                <label className={styles.labels} htmlFor="phone">
                  Telefone
                </label>
                <input
                  className={styles.inputs}
                  type="tel"
                  id="phone"
                  value="+244 923 456 789"
                  required
                />
              </div>
            </div>

            <div className={styles["form-group"]}>
              <label className={styles.labels} htmlFor="email">
                Email
              </label>
              <input
                className={styles.inputs}
                type="email"
                id="email"
                value="nelo@email.com"
                required
              />
            </div>

            <button type="submit" className={styles.btn}>
              Salvar Alterações
            </button>
          </form>
        </div>

        {/* <!-- Seção de Conta Bancária --> */}
        <div className={styles["account-section"]}>
          <div className={styles["section-title"]}>
            <i className="fas fa-university"></i> Conta Bancária para Retiradas
          </div>

          <form id="bank-account-form">
            <div className={styles["form-group"]}>
              <label className={styles.labels} htmlFor="iban">
                IBAN (21 dígitos)
              </label>
              <input
                className={`${styles["iban-input"]} ${styles.inputs}`}
                type="text"
                id="iban"
                placeholder="AO060055000092345672101"
                maxLength={21}
                pattern="[0-9]{21}"
                required
              />
              <small>
                Somente números, sem espaços ou caracteres especiais
              </small>
            </div>

            <div className={styles["form-group"]}>
              <label className={styles.labels} htmlFor="bank-name">
                Banco
              </label>
              <select id="bank-name" required>
                <option value="">Selecione seu banco</option>
                <option value="BAI" selected>
                  BAI - Banco Angolano de Investimentos
                </option>
                <option value="BPC">BPC - Banco de Poupança e Crédito</option>
                <option value="BFA">BFA - Banco de Fomento Angola</option>
                <option value="BCI">
                  BCI - Banco Comercial e de Investimentos
                </option>
                <option value="other">Outro</option>
              </select>
            </div>

            <button type="submit" className={styles.btn}>
              Atualizar Dados Bancários
            </button>
          </form>
        </div>

        {/* <!-- Seção de Segurança --> */}
        <div className={styles["account-section"]}>
          <div className={styles["section-title"]}>
            <i className="fas fa-shield-alt"></i> Segurança
          </div>

          <form id="password-form">
            <div className={styles["form-group"]}>
              <label className={styles.labels} htmlFor="current-password">
                Senha Atual
              </label>
              <input
                className={styles.inputs}
                type="password"
                id="current-password"
                required
              />
            </div>

            <div className={styles["form-group"]}>
              <label className={styles.labels} htmlFor="new-password">
                Nova Senha
              </label>
              <input
                className={styles.inputs}
                type="password"
                id="new-password"
                required
              />
              <div className={styles["password-strength"]}>
                <div className={styles["strength-bar"]} id="strength-bar"></div>
              </div>
              <small>
                A senha deve ter pelo menos 8 caracteres, incluindo números e
                letras
              </small>
            </div>

            <div className={styles["form-group"]}>
              <label className={styles.labels} htmlFor="confirm-password">
                Confirmar Nova Senha
              </label>
              <input
                className={styles.inputs}
                type="password"
                id="confirm-password"
                required
              />
            </div>

            <button type="submit" className={styles.btn}>
              Alterar Senha
            </button>
          </form>
        </div>

        {/* <!-- Seção de Logout --> */}
        <div className={styles["account-section"]}>
          <div className={styles["section-title"]}>
            <i className="fas fa-sign-out-alt"></i> Sessão
          </div>

          <button
            onClick={() => logout()}
            id="logout-btn"
            className={`${styles.btn} ${styles["btn-danger"]}`}
          >
            <i className="fas fa-sign-out-alt"></i> Terminar Sessão
          </button>

          <div
            style={{ marginTop: "15px", fontSize: "14px", color: "#7f8c8d" }}
          >
            <i className="fas fa-info-circle"></i> Último login: 15/04/2025 às
            14:30
          </div>
        </div>
      </div>

      {/* <!-- Menu de navegação inferior --> */}
      <div className={styles["footer-nav"]}>
        <a
          onClick={() => navigate("/profile")}
          style={{ cursor: "pointer" }}
          className={styles["nav-item"]}
        >
          <i className={`fas fa-user ${styles.is}`}></i>
          <span>Perfil</span>
        </a>
      </div>
    </>
  );
};
export default AccountManagementPage;
