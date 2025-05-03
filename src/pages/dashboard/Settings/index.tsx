import { useEffect } from "react";
import styles from "./assets/css/Settings.module.css";
import redai2 from "../../../assets/images/redai2.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const SettingsDashPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    document.body.style.fontFamily =
      "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.backgroundColor = "#f8f9fa";
    document.body.style.color = "#333";
    document.body.style.overflowX = "hidden";

    const el = document.body;
    if (el) {
      el.style.setProperty("--primary-color", "#3498db");
      el.style.setProperty("--secondary-color", "#2c3e50");
      el.style.setProperty("--accent-color", "#e74c3c");
      el.style.setProperty("--light-color", "#ecf0f1");
      el.style.setProperty("--success-color", "#2ecc71");
      el.style.setProperty("--warning-color", "#f39c12");
    }

    return () => {
      document.body.style.fontFamily = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
      document.body.style.overflowX = "";

      if (el) {
        el.style.removeProperty("--primary-color");
        el.style.removeProperty("--secondary-color");
        el.style.removeProperty("--accent-color");
        el.style.removeProperty("--light-color");
        el.style.removeProperty("--success-color");
        el.style.removeProperty("--warning-color");
      }
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
            className={`${styles.as}`}
            onClick={() => navigate("/dashboard/notification")}
            style={{ cursor: "pointer" }}
          >
            <i className={`fas fa-bell ${styles.is}`}></i>{" "}
            <span className={`${styles.spans}`}>Notificações</span>
          </a>
          <a
            className={`${styles.as}`}
            onClick={() => navigate("/dashboard/settings")}
            style={{ cursor: "pointer" }}
          >
            <i className={`fas fa-cog ${styles.is}`}></i>{" "}
            <span className={`${styles.spans}`}>Configurações</span>
          </a>
          <a
            className={`${styles.as}`}
            onClick={() => logout()}
            style={{ cursor: "pointer" }}
          >
            <i className={`fas fa-sign-out-alt ${styles.is}`}></i>{" "}
            <span className={`${styles.spans}`}>Sair</span>
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
            <li className={`${styles.lis}`}>
              <a
                className={`${styles.as}`}
                onClick={() => navigate("/dashboard/")}
                style={{ cursor: "pointer" }}
              >
                <i className={`fas fa-tachometer-alt ${styles.is}`}></i>{" "}
                Dashboard
              </a>
            </li>
            <li className={`${styles.lis}`}>
              <a
                className={`${styles.as}`}
                onClick={() => navigate("/dashboard/users")}
                style={{ cursor: "pointer" }}
              >
                <i className={`fas fa-users ${styles.is}`}></i> Usuários
              </a>
            </li>
            <li className={`${styles.lis}`}>
              <a
                className={`${styles.as}`}
                onClick={() => navigate("/dashboard/deposit")}
                style={{ cursor: "pointer" }}
              >
                <i className={`fas fa-money-bill-wave ${styles.is}`}></i>{" "}
                Depósitos
              </a>
            </li>
            <li className={`${styles.lis}`}>
              <a
                className={`${styles.as}`}
                onClick={() => navigate("/dashboard/to-remove")}
                style={{ cursor: "pointer" }}
              >
                <i className={`fas fa-wallet ${styles.is}`}></i> Retiradas
              </a>
            </li>
            <li className={`${styles.lis}`}>
              <a
                className={`${styles.as} ${styles.active}`}
                onClick={() => navigate("/dashboard/settings")}
                style={{ cursor: "pointer" }}
              >
                <i className={`fas fa-cog ${styles.is}`}></i> Configurações
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
              <label className={`${styles.labels}`} htmlFor="current-email">
                Email atual
              </label>
              <input
                type="email"
                id="current-email"
                className={styles["form-control"]}
                value="admin@redai.com"
                readOnly
              />
            </div>

            <div className={styles["form-group"]}>
              <label className={`${styles.labels}`} htmlFor="current-password">
                Senha Atual
              </label>
              <input
                type="password"
                id="current-password"
                className={styles["form-control"]}
                required
              />
            </div>

            <div className={styles["form-group"]}>
              <label className={`${styles.labels}`} htmlFor="new-password">
                Nova Senha
              </label>
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
              <label className={`${styles.labels}`} htmlFor="confirm-password">
                Confirmar Nova Senha
              </label>
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
              <label className={`${styles.labels}`} htmlFor="site-name">
                Nome do Site
              </label>
              <input
                type="text"
                id="site-name"
                className={styles["form-control"]}
                value="RED Aí"
              />
            </div>

            <div className={styles["form-group"]}>
              <label className={`${styles.labels}`} htmlFor="site-url">
                URL do Site
              </label>
              <input
                type="url"
                id="site-url"
                className={styles["form-control"]}
                value="https://www.redai.com"
              />
            </div>

            <div className={styles["form-group"]}>
              <label className={`${styles.labels}`} htmlFor="maintenance-mode">
                Modo Manutenção
              </label>
              <select id="maintenance-mode" className={styles["form-control"]}>
                <option value="0">Desativado</option>
                <option value="1">Ativado</option>
              </select>
            </div>

            <div className={styles["form-group"]}>
              <label className={`${styles.labels}`} htmlFor="currency">
                Moeda Padrão
              </label>
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
