import { useEffect } from "react";
import styles from "./assets/css/Notification.module.css";
import redai2 from "../../../assets/images/redai2.png";
import { useNavigate } from "react-router-dom";

const NotificationDashPage = () => {
  const navigate = useNavigate();

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
      <header className={`${styles["admin-header"]}`}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <button className={`${styles["menu-toggle"]}`} id="menuToggle">
            <i className="fas fa-bars"></i>
          </button>
          <img src={redai2} alt="RED Ai logo" className={`${styles.logo}`} />
        </div>
        <nav className={`${styles["admin-nav"]}`}>
          <a
            className={`${styles.as}`}
            onClick={() => navigate("/dashboard/notification")}
            style={{ cursor: "pointer" }}
          >
            <i className="fas fa-bell"></i>{" "}
            <span className={`${styles.spans}`}>Notificações</span>
          </a>
          <a
            className={`${styles.as}`}
            onClick={() => navigate("/dashboard/settings")}
            style={{ cursor: "pointer" }}
          >
            <i className="fas fa-cog"></i>{" "}
            <span className={`${styles.spans}`}>Configurações</span>
          </a>
          <a
            className={`${styles.as}`}
            onClick={() => {
              /* logout()*/
            }}
            style={{ cursor: "pointer" }}
          >
            <i className="fas fa-sign-out-alt"></i>{" "}
            <span className={`${styles.spans}`}>Sair</span>
          </a>
        </nav>
      </header>

      <div className={`${styles["admin-container"]}`}>
        <div
          className={`${styles["mobile-menu-backdrop"]}`}
          id="mobileMenuBackdrop"
        ></div>
        <aside className={`${styles.sidebar}`} id="sidebar">
          <ul className={`${styles["sidebar-menu"]}`}>
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
                className={`${styles.as}`}
                onClick={() => navigate("/dashboard/settings")}
                style={{ cursor: "pointer" }}
              >
                <i className={`fas fa-cog ${styles.is}`}></i> Configurações
              </a>
            </li>
          </ul>
        </aside>

        <main className={`${styles["main-content"]}`}>
          <h1>Notificações</h1>

          <div className={`${styles["notification-list"]}`}>
            <h2 className={`${styles["section-title"]}`}>
              Pedidos de Depósito
            </h2>

            <div className={`${styles["notification-item"]}`}>
              <div className={`${styles["notification-header"]}`}>
                <strong>Novo depósito de 500,000 kz</strong>
                <span
                  className={`${styles["status-badge"]} ${styles["status-pending"]}`}
                >
                  Pendente
                </span>
              </div>
              <p>Usuário: joao@email.com</p>
              <span className={`${styles["notification-time"]}`}>
                15/03/2023 14:30
              </span>
              <div className={`${styles["notification-actions"]}`}>
                <button
                  className={`${styles["action-btn"]} ${styles["btn-approve"]}`}
                >
                  Aprovar
                </button>
                <button
                  className={`${styles["action-btn"]} ${styles["btn-reject"]}`}
                >
                  Rejeitar
                </button>
                <button
                  className={`${styles["action-btn"]} ${styles["btn-view"]}`}
                >
                  Ver Comprovante
                </button>
              </div>
            </div>

            <div className={`${styles["notification-item"]}`}>
              <div className={`${styles["notification-header"]}`}>
                <strong>Novo depósito de 1,000,000 kz</strong>
                <span
                  className={`${styles["status-badge"]} ${styles["status-pending"]}`}
                >
                  Pendente
                </span>
              </div>
              <p>Usuário: maria@email.com</p>
              <span className={`${styles["notification-time"]}`}>
                15/03/2023 12:15
              </span>
              <div className={`${styles["notification-actions"]}`}>
                <button
                  className={`${styles["action-btn"]} ${styles["btn-approve"]}`}
                >
                  Aprovar
                </button>
                <button
                  className={`${styles["action-btn"]} ${styles["btn-reject"]}`}
                >
                  Rejeitar
                </button>
                <button
                  className={`${styles["action-btn"]} ${styles["btn-view"]}`}
                >
                  Ver Comprovante
                </button>
              </div>
            </div>
          </div>

          <div className={`${styles["notification-list"]}`}>
            <h2 className={`${styles["section-title"]}`}>
              Pedidos de Retirada
            </h2>

            <div className={`${styles["notification-item"]}`}>
              <div className={`${styles["notification-header"]}`}>
                <strong>Nova retirada de 250,000 kz</strong>
                <span
                  className={`${styles["status-badge"]} ${styles["status-pending"]}`}
                >
                  Pendente
                </span>
              </div>
              <p>Usuário: carlos@email.com</p>
              <span className={`${styles["notification-time"]}`}>
                15/03/2023 10:45
              </span>
              <div className={`${styles["notification-actions"]}`}>
                <button
                  className={`${styles["action-btn"]} ${styles["btn-approve"]}`}
                >
                  Aprovar
                </button>
                <button
                  className={`${styles["action-btn"]} ${styles["btn-reject"]}`}
                >
                  Rejeitar
                </button>
                <button
                  className={`${styles["action-btn"]} ${styles["btn-view"]}`}
                >
                  Ver Detalhes
                </button>
              </div>
            </div>
          </div>

          <div className={`${styles["notification-list"]}`}>
            <h2 className={`${styles["section-title"]}`}>
              Outras Notificações
            </h2>

            <div className={`${styles["notification-item"]}`}>
              <div className={`${styles["notification-header"]}`}>
                <strong>Novo usuário registrado</strong>
                <span
                  className={`${styles["status-badge"]} ${styles["status-approved"]}`}
                >
                  Visualizado
                </span>
              </div>
              <p>João Silva (joao@email.com)</p>
              <span className={`${styles["notification-time"]}`}>
                14/03/2023 18:20
              </span>
              <div className={`${styles["notification-actions"]}`}>
                <button
                  className={`${styles["action-btn"]} ${styles["btn-view"]}`}
                >
                  Ver Perfil
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default NotificationDashPage;
