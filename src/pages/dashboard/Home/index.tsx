import { useEffect } from "react";
import redai2 from "../../../assets/images/redai2.png";
import styles from "./assets/css/Home.module.css";
import { useNavigate } from "react-router-dom";

const HomeDashPage = () => {
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
              /* logout() */
            }}
            style={{ cursor: "pointer" }}
          >
            <i className="fas fa-sign-out-alt"></i>{" "}
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
                onClick={() => navigate("/dashboard/")}
                style={{ cursor: "pointer" }}
                className={`${styles.active} ${styles.as}`}
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

        <main className={styles["main-content"]}>
          <h1>Painel de Controle</h1>

          <div className={styles["metrics-grid"]}>
            <div className={styles["metric-card"]}>
              <h3 className={`${styles.h3s}`}>Usuários Registrados</h3>
              <div className={styles["metric-value"]} id="total-users">
                0
              </div>
              <div
                className={`${styles["metric-difference"]} ${styles.positive}`}
              >
                0%
              </div>
            </div>
            <div className={styles["metric-card"]}>
              <h3 className={`${styles.h3s}`}>Usuários Ativos</h3>
              <div className={styles["metric-value"]} id="active-users">
                0
              </div>
              <div
                className={`${styles["metric-difference"]} ${styles.positive}`}
              >
                0%
              </div>
            </div>
            <div className={styles["metric-card"]}>
              <h3 className={`${styles.h3s}`}>Total Depositado</h3>
              <div className={styles["metric-value"]} id="total-deposits">
                0 kz
              </div>
              <div
                className={`${styles["metric-difference"]} ${styles.positive}`}
              >
                0%
              </div>
            </div>
            <div className={styles["metric-card"]}>
              <h3 className={`${styles.h3s}`}>Total Retirado</h3>
              <div className={styles["metric-value"]} id="total-withdrawals">
                0 kz
              </div>
              <div
                className={`${styles["metric-difference"]} ${styles.negative}`}
              >
                0%
              </div>
            </div>
            <div className={styles["metric-card"]}>
              <h3 className={`${styles.h3s}`}>Indicações Totais</h3>
              <div className={styles["metric-value"]} id="total-referrals">
                0
              </div>
              <div
                className={`${styles["metric-difference"]} ${styles.positive}`}
              >
                0%
              </div>
            </div>
            <div className={styles["metric-card"]}>
              <h3 className={`${styles.h3s}`}>Produtos Vendidos</h3>
              <div className={styles["metric-value"]} id="total-products">
                0
              </div>
              <div
                className={`${styles["metric-difference"]} ${styles.positive}`}
              >
                0%
              </div>
            </div>
          </div>

          <h2 className={styles["section-title"]}>Transações Pendentes</h2>
          <div style={{ overflowX: "auto" }}>
            <table className={styles["data-table"]}>
              <thead>
                <tr className={`${styles.trs}`}>
                  <th className={`${styles.ths}`}>ID</th>
                  <th className={`${styles.ths}`}>Tipo</th>
                  <th className={`${styles.ths}`}>Usuário</th>
                  <th className={`${styles.ths}`}>Valor</th>
                  <th className={`${styles.ths}`}>Data</th>
                  <th className={`${styles.ths}`}>Status</th>
                  <th className={`${styles.ths}`}>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr className={`${styles.trs}`}>
                  <td className={`${styles.tds}`}>#4587</td>
                  <td className={`${styles.tds}`}>Depósito</td>
                  <td className={`${styles.tds}`}>user@email.com</td>
                  <td className={`${styles.tds}`}>500,000 kz</td>
                  <td className={`${styles.tds}`}>15/03/2023 14:30</td>
                  <td className={`${styles.tds}`}>
                    <span
                      className={`${styles["status-badge"]} ${styles["status-pending"]}`}
                    >
                      Pendente
                    </span>
                  </td>
                  <td className={`${styles.tds}`}>
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
                      Ver
                    </button>
                  </td>
                </tr>
                <tr className={`${styles.trs}`}>
                  <td className={`${styles.tds}`}>#4586</td>
                  <td className={`${styles.tds}`}>Retirada</td>
                  <td className={`${styles.tds}`}>user2@email.com</td>
                  <td className={`${styles.tds}`}>250,000 kz</td>
                  <td className={`${styles.tds}`}>15/03/2023 12:15</td>
                  <td className={`${styles.tds}`}>
                    <span
                      className={`${styles["status-badge"]} ${styles["status-pending"]}`}
                    >
                      Pendente
                    </span>
                  </td>
                  <td className={`${styles.tds}`}>
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
                      Ver
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className={styles["section-title"]}>
            Últimos Usuários Registrados
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table className={styles["data-table"]}>
              <thead>
                <tr className={`${styles.trs}`}>
                  <th className={`${styles.ths}`}>ID</th>
                  <th className={`${styles.ths}`}>Nome</th>
                  <th className={`${styles.ths}`}>Email</th>
                  <th className={`${styles.ths}`}>Telefone</th>
                  <th className={`${styles.ths}`}>Data</th>
                  <th className={`${styles.ths}`}>Indicado por</th>
                </tr>
              </thead>
              <tbody>
                <tr className={`${styles.trs}`}>
                  <td className={`${styles.tds}`}>#1056</td>
                  <td className={`${styles.tds}`}>João Silva</td>
                  <td className={`${styles.tds}`}>joao@email.com</td>
                  <td className={`${styles.tds}`}>923456789</td>
                  <td className={`${styles.tds}`}>15/03/2023</td>
                  <td className={`${styles.tds}`}>EQP123</td>
                </tr>
                <tr className={`${styles.trs}`}>
                  <td className={`${styles.tds}`}>#1055</td>
                  <td className={`${styles.tds}`}>Maria Santos</td>
                  <td className={`${styles.tds}`}>maria@email.com</td>
                  <td className={`${styles.tds}`}>912345678</td>
                  <td className={`${styles.tds}`}>15/03/2023</td>
                  <td className={`${styles.tds}`}>EQP456</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
};

export default HomeDashPage;
