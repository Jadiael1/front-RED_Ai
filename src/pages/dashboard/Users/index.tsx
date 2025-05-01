import { useEffect } from "react";
import styles from "./assets/css/Users.module.css";
import redai2 from "../../../assets/images/redai2.png";
import avatarPlaceHolder from "../../../assets/images/avatar_placeholder.png";
import { useNavigate } from "react-router-dom";

const UsersDashPage = () => {
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
          <img src={redai2} alt="RED Ai logo" className={`${styles.logo}`} />
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
                className={`${styles.active}`}
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

        <main className={`${styles["main-content"]}`}>
          <h1>Gerenciamento de Usuários</h1>

          <div className={`${styles["user-search"]}`}>
            <input
              type="text"
              className={`${styles["search-input"]}`}
              placeholder="Pesquisar por ID, nome ou email"
            />
            <select className={`${styles["search-input"]}`}>
              <option>Todos os status</option>
              <option>Ativo</option>
              <option>Banido</option>
              <option>Inativo</option>
            </select>
            <button className={`${styles["search-btn"]}`}>
              <i className="fas fa-search"></i> Pesquisar
            </button>
          </div>

          <div className={`${styles["user-actions"]}`}>
            <button className={`${styles["export-btn"]}`}>
              <i className="fas fa-file-export"></i> Exportar CSV
            </button>
            <button className={`${styles["export-btn"]}`}>
              <i className="fas fa-file-export"></i> Exportar Excel
            </button>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table className={`${styles["data-table"]}`}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Usuário</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Registro</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#1056</td>
                  <td>
                    <img
                      src={avatarPlaceHolder}
                      alt="João Silva"
                      className={`${styles["user-avatar"]}`}
                    />
                    João Silva
                  </td>
                  <td>joao@email.com</td>
                  <td>923456789</td>
                  <td>15/03/2023</td>
                  <td>
                    <span
                      className={`${styles["status-badge"]} ${styles["status-approved"]}`}
                    >
                      Ativo
                    </span>
                  </td>
                  <td>
                    <button
                      className={`${styles["action-btn"]} ${styles["btn-ban"]}`}
                    >
                      <i className="fas fa-ban"></i> Banir
                    </button>
                    <button
                      className={`${styles["action-btn"]} ${styles["btn-view"]}`}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>#1055</td>
                  <td>
                    <img
                      src={avatarPlaceHolder}
                      alt="Maria Santos"
                      className={`${styles["user-avatar"]}`}
                    />
                    Maria Santos
                  </td>
                  <td>maria@email.com</td>
                  <td>912345678</td>
                  <td>15/03/2023</td>
                  <td>
                    <span
                      className={`${styles["status-badge"]} ${styles["status-approved"]}`}
                    >
                      Ativo
                    </span>
                  </td>
                  <td>
                    <button
                      className={`${styles["action-btn"]} ${styles["btn-ban"]}`}
                    >
                      <i className="fas fa-ban"></i> Banir
                    </button>
                    <button
                      className={`${styles["action-btn"]} ${styles["btn-view"]}`}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>#1054</td>
                  <td>
                    <img
                      src={avatarPlaceHolder}
                      alt="Carlos Oliveira"
                      className={`${styles["user-avatar"]}`}
                    />
                    Carlos Oliveira
                  </td>
                  <td>carlos@email.com</td>
                  <td>934567890</td>
                  <td>14/03/2023</td>
                  <td>
                    <span
                      className={`${styles["status-badge"]} ${styles["status-rejected"]}`}
                    >
                      Banido
                    </span>
                  </td>
                  <td>
                    <button
                      className={`${styles["action-btn"]} ${styles["btn-approve"]}`}
                    >
                      <i className="fas fa-check"></i> Desbanir
                    </button>
                    <button
                      className={`${styles["action-btn"]} ${styles["btn-view"]}`}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
};

export default UsersDashPage;
