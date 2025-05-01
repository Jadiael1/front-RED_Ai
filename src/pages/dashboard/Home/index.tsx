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
              /* logout() */
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
                className={styles.active}
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
              >
                <i className="fas fa-cog"></i> Configurações
              </a>
            </li>
          </ul>
        </aside>

        <main className={styles["main-content"]}>
          <h1>Painel de Controle</h1>

          <div className={styles["metrics-grid"]}>
            <div className={styles["metric-card"]}>
              <h3>Usuários Registrados</h3>
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
              <h3>Usuários Ativos</h3>
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
              <h3>Total Depositado</h3>
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
              <h3>Total Retirado</h3>
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
              <h3>Indicações Totais</h3>
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
              <h3>Produtos Vendidos</h3>
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
                <tr>
                  <th>ID</th>
                  <th>Tipo</th>
                  <th>Usuário</th>
                  <th>Valor</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#4587</td>
                  <td>Depósito</td>
                  <td>user@email.com</td>
                  <td>500,000 kz</td>
                  <td>15/03/2023 14:30</td>
                  <td>
                    <span
                      className={`${styles["status-badge"]} ${styles["status-pending"]}`}
                    >
                      Pendente
                    </span>
                  </td>
                  <td>
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
                <tr>
                  <td>#4586</td>
                  <td>Retirada</td>
                  <td>user2@email.com</td>
                  <td>250,000 kz</td>
                  <td>15/03/2023 12:15</td>
                  <td>
                    <span
                      className={`${styles["status-badge"]} ${styles["status-pending"]}`}
                    >
                      Pendente
                    </span>
                  </td>
                  <td>
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
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Data</th>
                  <th>Indicado por</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#1056</td>
                  <td>João Silva</td>
                  <td>joao@email.com</td>
                  <td>923456789</td>
                  <td>15/03/2023</td>
                  <td>EQP123</td>
                </tr>
                <tr>
                  <td>#1055</td>
                  <td>Maria Santos</td>
                  <td>maria@email.com</td>
                  <td>912345678</td>
                  <td>15/03/2023</td>
                  <td>EQP456</td>
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
