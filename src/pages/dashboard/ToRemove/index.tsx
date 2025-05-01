import { useEffect } from "react";
import styles from "./assets/css/ToRemove.module.css";
import { useNavigate } from "react-router-dom";
import redai2 from "../../../assets/images/redai2.png";

const ToRemoveDashPage = () => {
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
      <header className={`${styles["admin-header"]}`}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <button className={`${styles["menu-toggle"]}`} id="menuToggle">
            <i className="fas fa-bars"></i>
          </button>
          <img src={redai2} alt="RED Aí Admin" className={`${styles.logo}`} />
        </div>
        <nav className={`${styles["admin-nav"]}`}>
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

      <div className={`${styles["admin-container"]}`}>
        <div
          className={`${styles["mobile-menu-backdrop"]}`}
          id="mobileMenuBackdrop"
        ></div>
        <aside className={`${styles.sidebar}`} id="sidebar">
          <ul className={`${styles["sidebar-menu"]}`}>
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
                className={`${styles.active}`}
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

        <main className={`${styles["main-content"]}`}>
          <h1>Gerenciamento de Retiradas</h1>

          <div className={`${styles["filter-container"]}`}>
            <div className={`${styles["filter-row"]}`}>
              <div className={`${styles["filter-group"]}`}>
                <label className={`${styles["filter-label"]}`}>Status</label>
                <select
                  className={`${styles["filter-select"]}`}
                  id="statusFilter"
                >
                  <option value="">Todos</option>
                  <option value="pending">Pendentes</option>
                  <option value="approved">Aprovadas</option>
                  <option value="rejected">Rejeitadas</option>
                </select>
              </div>

              <div className={`${styles["filter-group"]}`}>
                <label className={`${styles["filter-label"]}`}>Método</label>
                <select
                  className={`${styles["filter-select"]}`}
                  id="methodFilter"
                >
                  <option value="">Todos</option>
                  <option value="transfer">Transferência</option>
                </select>
              </div>

              <div className={`${styles["filter-group"]}`}>
                <label className={`${styles["filter-label"]}`}>
                  Data Inicial
                </label>
                <input
                  type="date"
                  className={`${styles["filter-date"]}`}
                  id="startDate"
                />
              </div>

              <div className={`${styles["filter-group"]}`}>
                <label className={`${styles["filter-label"]}`}>
                  Data Final
                </label>
                <input
                  type="date"
                  className={`${styles["filter-date"]}`}
                  id="endDate"
                />
              </div>
            </div>

            <div
              className={`${styles["filter-row"]}`}
              style={{ marginTop: "15px" }}
            >
              <div className={`${styles["filter-group"]}`}>
                <label className={`${styles["filter-label"]}`}>
                  Buscar por ID ou Usuário
                </label>
                <input
                  type="text"
                  className={`${styles["filter-input"]}`}
                  id="searchInput"
                  placeholder="Digite para pesquisar..."
                />
              </div>

              <div className={`${styles["filter-actions"]}`}>
                <button
                  className={`${styles["filter-btn"]} ${styles["reset-btn"]}`}
                  id="resetFilters"
                >
                  <i className="fas fa-undo"></i> Limpar
                </button>
                <button className={`${styles["filter-btn"]}`} id="applyFilters">
                  <i className="fas fa-filter"></i> Filtrar
                </button>
              </div>
            </div>
          </div>

          <div style={{ overflowX: "auto", marginTop: "20px" }}>
            <table className={`${styles["data-table"]}`}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Usuário</th>
                  <th>Valor</th>
                  <th>Taxa</th>
                  <th>Líquido</th>
                  <th>Data</th>
                  <th>Método</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody id="withdrawalsTable">
                {/* Dados serão carregados via JavaScript */}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button
              id="loadMore"
              className={`${styles["action-btn"]}`}
              style={{ background: "var(--secondary-color)", color: "white" }}
            >
              <i className="fas fa-plus"></i> Carregar Mais
            </button>
          </div>
        </main>
      </div>

      {/* Modal de Detalhes */}
      <div
        id="withdrawalModal"
        className={`${styles["withdrawal-details-modal"]}`}
      >
        <div className={`${styles["withdrawal-details-content"]}`}>
          <div className={`${styles["detail-header"]}`}>
            <h3 className={`${styles["detail-title"]}`}>
              Detalhes da Retirada
            </h3>
            <button className={`${styles["close-modal"]}`} id="closeModal">
              &times;
            </button>
          </div>

          <div className={`${styles["detail-grid"]}`}>
            <div className={`${styles["detail-item"]}`}>
              <span className={`${styles["detail-label"]}`}>
                ID da Transação
              </span>
              <div className={`${styles["detail-value"]}`} id="detailId">
                -
              </div>
            </div>

            <div className={`${styles["detail-item"]}`}>
              <span className={`${styles["detail-label"]}`}>Usuário</span>
              <div className={`${styles["detail-value"]}`} id="detailUser">
                -
              </div>
            </div>

            <div className={`${styles["detail-item"]}`}>
              <span className={`${styles["detail-label"]}`}>Valor</span>
              <div className={`${styles["detail-value"]}`} id="detailAmount">
                -
              </div>
            </div>

            <div className={`${styles["detail-item"]}`}>
              <span className={`${styles["detail-label"]}`}>Taxa</span>
              <div className={`${styles["detail-value"]}`} id="detailFee">
                -
              </div>
            </div>

            <div className={`${styles["detail-item"]}`}>
              <span className={`${styles["detail-label"]}`}>Valor Líquido</span>
              <div className={`${styles["detail-value"]}`} id="detailNet">
                -
              </div>
            </div>

            <div className={`${styles["detail-item"]}`}>
              <span className={`${styles["detail-label"]}`}>Data</span>
              <div className={`${styles["detail-value"]}`} id="detailDate">
                -
              </div>
            </div>

            <div className={`${styles["detail-item"]}`}>
              <span className={`${styles["detail-label"]}`}>Método</span>
              <div className={`${styles["detail-value"]}`} id="detailMethod">
                -
              </div>
            </div>

            <div className={`${styles["detail-item"]}`}>
              <span className={`${styles["detail-label"]}`}>Status</span>
              <div className={`${styles["detail-value"]}`}>
                <span id="detailStatus" className={`${styles["status-badge"]}`}>
                  -
                </span>
              </div>
            </div>
          </div>

          <div className={`${styles["detail-item"]}`}>
            <span className={`${styles["detail-label"]}`}>Dados Bancários</span>
            <div className={`${styles["account-details"]}`}>
              <div className={`${styles["account-detail"]}`}>
                <strong>Banco:</strong> <span id="detailBank">-</span>
              </div>
              <div className={`${styles["account-detail"]}`}>
                <strong>Agência:</strong> <span id="detailAgency">-</span>
              </div>
              <div className={`${styles["account-detail"]}`}>
                <strong>Conta:</strong> <span id="detailAccount">-</span>
              </div>
              <div className={`${styles["account-detail"]}`}>
                <strong>Titular:</strong> <span id="detailHolder">-</span>
              </div>
            </div>
          </div>

          <div className={`${styles["detail-actions"]}`} id="modalActions">
            {/* Ações serão preenchidas dinamicamente */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ToRemoveDashPage;
