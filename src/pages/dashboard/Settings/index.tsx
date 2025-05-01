import { useEffect } from "react";
import styles from "./assets/css/Settings.module.css";
import redai2 from "../../../assets/images/redai2.png";
import { useNavigate } from "react-router-dom";

const SettingsDashPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.fontFamily =
      "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.backgroundColor = "#f8f9fa";
    document.body.style.color = "#333";
    document.body.style.overflowX = "hidden";

    return () => {
      document.body.style.fontFamily = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
      document.body.style.overflowX = "";
    };
  }, []);

  return (
    <>
      <header className={styles["admin-header"]}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <button className={styles["menu-toggle"]} id="menuToggle">
            <i className="fas fa-bars"></i>
          </button>
          <img src={redai2} alt="RED Ai logo" className={styles.logo} />
        </div>
        <nav className={styles["admin-nav"]}>
          <a
            onClick={() => navigate("/dashboard/notification")}
            style={{ cursor: "pointer" }}
          >
            <i className="fas fa-bell"></i> <span>Notificações</span>
          </a>
          <a
            onClick={() => navigate("/dashboard/settings")}
            style={{ cursor: "pointer" }}
          >
            <i className="fas fa-cog"></i> <span>Configurações</span>
          </a>
          <a
            onClick={() => {
              /*logout() */
            }}
            style={{ cursor: "pointer" }}
          >
            <i className="fas fa-sign-out-alt"></i> <span>Sair</span>
          </a>
        </nav>
      </header>

      <div className={styles["admin-container"]}>
        <div
          className={styles["mobile-menu-backdrop"]}
          id="mobileMenuBackdrop"
        ></div>
        <aside className={styles.sidebar} id="sidebar">
          <ul className={styles["sidebar-menu"]}>
            <li>
              <a
                onClick={() => navigate("/dashboard/")}
                style={{ cursor: "pointer" }}
              >
                <i className="fas fa-tachometer-alt"></i> Dashboard
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/dashboard/users")}
                style={{ cursor: "pointer" }}
              >
                <i className="fas fa-users"></i> Usuários
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/dashboard/deposit")}
                style={{ cursor: "pointer" }}
              >
                <i className="fas fa-money-bill-wave"></i> Depósitos
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/dashboard/to-remove")}
                style={{ cursor: "pointer" }}
              >
                <i className="fas fa-wallet"></i> Retiradas
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/dashboard/settings")}
                style={{ cursor: "pointer" }}
                className={styles.active}
              >
                <i className="fas fa-cog"></i> Configurações
              </a>
            </li>
          </ul>
        </aside>

        <main className={styles["main-content"]}>
          <h1>Configurações do Sistema</h1>

          <div className={styles["settings-form"]}>
            <h2 className={styles["section-title"]}>
              Redefinir Credenciais de Acesso
            </h2>

            <div className={styles["form-group"]}>
              <label htmlFor="current-email">Email atual</label>
              <input
                type="email"
                id="current-email"
                className={styles["form-control"]}
                value="admin@redai.com"
                readOnly
              />
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="current-password">Senha Atual</label>
              <input
                type="password"
                id="current-password"
                className={styles["form-control"]}
                required
              />
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="new-password">Nova Senha</label>
              <input
                type="password"
                id="new-password"
                className={styles["form-control"]}
                required
              />
              <div className={styles["password-strength"]}>
                <div
                  className={styles["password-strength-bar"]}
                  id="passwordStrengthBar"
                ></div>
              </div>
              <small className={styles["text-muted"]}>
                Mínimo 8 caracteres, incluindo números e símbolos
              </small>
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="confirm-password">Confirmar Nova Senha</label>
              <input
                type="password"
                id="confirm-password"
                className={styles["form-control"]}
                required
              />
            </div>

            <div className={styles["form-actions"]}>
              <button className={styles["save-btn"]}>Salvar Alterações</button>
            </div>
          </div>

          <div className={styles["settings-form"]}>
            <h2 className={styles["section-title"]}>Configurações Gerais</h2>

            <div className={styles["form-group"]}>
              <label htmlFor="site-name">Nome do Site</label>
              <input
                type="text"
                id="site-name"
                className={styles["form-control"]}
                value="RED Aí"
              />
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="site-url">URL do Site</label>
              <input
                type="url"
                id="site-url"
                className={styles["form-control"]}
                value="https://www.redai.com"
              />
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="maintenance-mode">Modo Manutenção</label>
              <select id="maintenance-mode" className={styles["form-control"]}>
                <option value="0">Desativado</option>
                <option value="1">Ativado</option>
              </select>
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="currency">Moeda Padrão</label>
              <select id="currency" className={styles["form-control"]}>
                <option value="kz" selected>
                  Kwanza Angolano (kz)
                </option>
                <option value="usd">Dólar Americano ($)</option>
                <option value="eur">Euro (€)</option>
              </select>
            </div>

            <div className={styles["form-actions"]}>
              <button className={styles["save-btn"]}>
                Salvar Configurações
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SettingsDashPage;
