import { useEffect, useRef } from "react";
import styles from "./assets/css/Deposit.module.css";
import redai2 from "../../../assets/images/redai2.png";
import receiptPlaceHolder from "../../../assets/images/receipt_placeholder.png";
import { useNavigate } from "react-router-dom";

const DepositDashPage = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.fontFamily =
      "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.backgroundColor = "#f8f9fa";
    document.body.style.color = "#333";
    document.body.style.overflowX = "hidden";

    const el = containerRef.current;
    if (el) {
      el.style.setProperty("--primary-color", "#3498db");
      el.style.setProperty("--secondary-color", "#2c3e50");
      el.style.setProperty("--accent-color", "#e74c3c");
      el.style.setProperty("--light-color", "#ecf0f1");
      el.style.setProperty("--success-color", "#2ecc71");
      el.style.setProperty("--warning-color", "#f39c123");
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
            <i className={`fas fa-bell ${styles.is}`}></i>{" "}
            <span>Notificações</span>
          </a>
          <a
            className={`${styles.as}`}
            onClick={() => navigate("/dashboard/settings")}
            style={{ cursor: "pointer" }}
          >
            <i className={`fas fa-cog ${styles.is}`}></i>{" "}
            <span>Configurações</span>
          </a>
          <a
            className={`${styles.as}`}
            onClick={() => {
              /* logout() */
            }}
            style={{ cursor: "pointer" }}
          >
            <i className={`fas fa-sign-out-alt ${styles.is}`}></i>{" "}
            <span>Sair</span>
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
            <li className={styles.lis}>
              <a
                className={`${styles.as}`}
                onClick={() => navigate("/dashboard/")}
                style={{ cursor: "pointer" }}
              >
                <i className={`fas fa-tachometer-alt ${styles.is}`}></i>{" "}
                Dashboard
              </a>
            </li>
            <li className={styles.lis}>
              <a
                className={`${styles.as}`}
                onClick={() => navigate("/dashboard/users")}
                style={{ cursor: "pointer" }}
              >
                <i className={`fas fa-users ${styles.is}`}></i> Usuários
              </a>
            </li>
            <li className={styles.lis}>
              <a
                onClick={() => navigate("/dashboard/deposit")}
                style={{ cursor: "pointer" }}
                className={`${styles.as} ${styles.active}`}
              >
                <i className={`fas fa-money-bill-wave ${styles.is}`}></i>{" "}
                Depósitos
              </a>
            </li>
            <li className={styles.lis}>
              <a
                className={`${styles.as}`}
                onClick={() => navigate("/dashboard/to-remove")}
                style={{ cursor: "pointer" }}
              >
                <i className={`fas fa-wallet ${styles.is}`}></i> Retiradas
              </a>
            </li>
            <li className={styles.lis}>
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
          <h1>Gerenciamento de Depósitos</h1>

          <div className={`${styles["filter-bar"]}`}>
            <div className={`${styles["filter-group"]}`}>
              <label className={`${styles["filter-label"]}`}>Status</label>
              <select className={`${styles["filter-select"]}`}>
                <option value="">Todos os status</option>
                <option value="pending">Pendentes</option>
                <option value="approved">Aprovados</option>
                <option value="rejected">Rejeitados</option>
              </select>
            </div>

            <div className={`${styles["filter-group"]}`}>
              <label className={`${styles["filter-label"]}`}>
                Data inicial
              </label>
              <input type="date" className={`${styles["filter-input"]}`} />
            </div>

            <div className={`${styles["filter-group"]}`}>
              <label className={`${styles["filter-label"]}`}>Data final</label>
              <input type="date" className={`${styles["filter-input"]}`} />
            </div>

            <div className={`${styles["filter-actions"]}`}>
              <button
                className={`${styles["filter-btn"]} ${styles["reset-btn"]}`}
              >
                Limpar
              </button>
              <button className={`${styles["filter-btn"]}`}>
                <i className="fas fa-filter"></i> Filtrar
              </button>
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table className={`${styles["data-table"]}`}>
              <thead>
                <tr className={styles.trs}>
                  <th className={`${styles.ths}`}>ID</th>
                  <th className={`${styles.ths}`}>Usuário</th>
                  <th className={`${styles.ths}`}>Valor</th>
                  <th className={`${styles.ths}`}>Data</th>
                  <th className={`${styles.ths}`}>Método</th>
                  <th className={`${styles.ths}`}>Status</th>
                  <th className={`${styles.ths}`}>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr className={styles.trs}>
                  <td className={`${styles.tds}`}>#4587</td>
                  <td className={`${styles.tds}`}>joao@email.com</td>
                  <td className={`${styles.tds}`}>500,000 kz</td>
                  <td className={`${styles.tds}`}>15/03/2023 14:30</td>
                  <td className={`${styles.tds}`}>Transferência Bancária</td>
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
                      className={`${styles["action-btn"]} ${styles["btn-view"]} ${styles["view-deposit"]}`}
                    >
                      Ver
                    </button>
                  </td>
                </tr>
                <tr className={styles.trs}>
                  <td className={`${styles.tds}`}>#4586</td>
                  <td className={`${styles.tds}`}>maria@email.com</td>
                  <td className={`${styles.tds}`}>1,000,000 kz</td>
                  <td className={`${styles.tds}`}>15/03/2023 12:15</td>
                  <td className={`${styles.tds}`}>Cartão de Crédito</td>
                  <td className={`${styles.tds}`}>
                    <span
                      className={`${styles["status-badge"]} ${styles["status-approved"]}`}
                    >
                      Aprovado
                    </span>
                  </td>
                  <td className={`${styles.tds}`}>
                    <button
                      className={`${styles["action-btn"]} ${styles["btn-view"]} ${styles["view-deposit"]}`}
                    >
                      Ver
                    </button>
                  </td>
                </tr>
                <tr className={styles.trs}>
                  <td className={`${styles.tds}`}>#4585</td>
                  <td className={`${styles.tds}`}>carlos@email.com</td>
                  <td className={`${styles.tds}`}>750,000 kz</td>
                  <td className={`${styles.tds}`}>14/03/2023 18:20</td>
                  <td className={`${styles.tds}`}>Transferência Bancária</td>
                  <td className={`${styles.tds}`}>
                    <span
                      className={`${styles["status-badge"]} ${styles["status-rejected"]}`}
                    >
                      Rejeitado
                    </span>
                  </td>
                  <td className={`${styles.tds}`}>
                    <button
                      className={`${styles["action-btn"]} ${styles["btn-view"]} ${styles["view-deposit"]}`}
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={`${styles["deposit-details"]}`} id="depositDetails">
            <h2 className={`${styles["section-title"]}`}>
              Detalhes do Depósito
            </h2>

            <div className={`${styles["detail-row"]}`}>
              <div className={`${styles["detail-label"]}`}>
                ID da Transação:
              </div>
              <div className={`${styles["detail-value"]}`} id="detail-id">
                #4587
              </div>
            </div>

            <div className={`${styles["detail-row"]}`}>
              <div className={`${styles["detail-label"]}`}>Usuário:</div>
              <div className={`${styles["detail-value"]}`} id="detail-user">
                joao@email.com
              </div>
            </div>

            <div className={`${styles["detail-row"]}`}>
              <div className={`${styles["detail-label"]}`}>Valor:</div>
              <div className={`${styles["detail-value"]}`} id="detail-amount">
                500,000 kz
              </div>
            </div>

            <div className={`${styles["detail-row"]}`}>
              <div className={`${styles["detail-label"]}`}>Data:</div>
              <div className={`${styles["detail-value"]}`} id="detail-date">
                15/03/2023 14:30
              </div>
            </div>

            <div className={`${styles["detail-row"]}`}>
              <div className={`${styles["detail-label"]}`}>Método:</div>
              <div className={`${styles["detail-value"]}`} id="detail-method">
                Transferência Bancária
              </div>
            </div>

            <div className={`${styles["detail-row"]}`}>
              <div className={`${styles["detail-label"]}`}>Comprovante:</div>
              <div className={`${styles["detail-value"]}`}>
                <img
                  src={receiptPlaceHolder}
                  alt="Comprovante"
                  className={`${styles["receipt-image"]}`}
                  id="detail-receipt"
                />
              </div>
            </div>

            <div className={`${styles["detail-row"]}`}>
              <div className={`${styles["detail-label"]}`}>Status:</div>
              <div className={`${styles["detail-value"]}`}>
                <span
                  className={`${styles["status-badge"]} ${styles["status-pending"]}`}
                  id="detail-status"
                >
                  Pendente
                </span>
              </div>
            </div>

            <div className={`${styles["detail-row"]}`} id="detail-actions">
              <button
                className={`${styles["action-btn"]} ${styles["btn-approve"]}`}
              >
                Aprovar Depósito
              </button>
              <button
                className={`${styles["action-btn"]} ${styles["btn-reject"]}`}
              >
                Rejeitar Depósito
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default DepositDashPage;
