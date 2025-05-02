import { useEffect, useRef } from "react";
import styles from "./assets/css/Users.module.css";
import redai2 from "../../../assets/images/redai2.png";
import avatarPlaceHolder from "../../../assets/images/avatar_placeholder.png";
import { useNavigate } from "react-router-dom";

const UsersDashPage = () => {
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
            onClick={() => {
              /* logout() */
            }}
            style={{ cursor: "pointer" }}
          >
            <i className={`fas fa-sign-out-alt ${styles.is}`}></i>{" "}
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
                <i className="fas fa-tachometer-alt"></i> Dashboard
              </a>
            </li>
            <li className={`${styles.lis}`}>
              <a
                className={`${styles.as} ${styles.active}`}
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
                <tr className={`${styles.trs}`}>
                  <th className={`${styles.ths}`}>ID</th>
                  <th className={`${styles.ths}`}>Usuário</th>
                  <th className={`${styles.ths}`}>Email</th>
                  <th className={`${styles.ths}`}>Telefone</th>
                  <th className={`${styles.ths}`}>Registro</th>
                  <th className={`${styles.ths}`}>Status</th>
                  <th className={`${styles.ths}`}>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr className={`${styles.trs}`}>
                  <td className={`${styles.tds}`}>#1056</td>
                  <td className={`${styles.tds}`}>
                    <img
                      src={avatarPlaceHolder}
                      alt="João Silva"
                      className={`${styles["user-avatar"]}`}
                    />
                    João Silva
                  </td>
                  <td className={`${styles.tds}`}>joao@email.com</td>
                  <td className={`${styles.tds}`}>923456789</td>
                  <td className={`${styles.tds}`}>15/03/2023</td>
                  <td className={`${styles.tds}`}>
                    <span
                      className={`${styles["status-badge"]} ${styles["status-approved"]}`}
                    >
                      Ativo
                    </span>
                  </td>
                  <td className={`${styles.tds}`}>
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
                <tr className={`${styles.trs}`}>
                  <td className={`${styles.tds}`}>#1055</td>
                  <td className={`${styles.tds}`}>
                    <img
                      src={avatarPlaceHolder}
                      alt="Maria Santos"
                      className={`${styles["user-avatar"]}`}
                    />
                    Maria Santos
                  </td>
                  <td className={`${styles.tds}`}>maria@email.com</td>
                  <td className={`${styles.tds}`}>912345678</td>
                  <td className={`${styles.tds}`}>15/03/2023</td>
                  <td className={`${styles.tds}`}>
                    <span
                      className={`${styles["status-badge"]} ${styles["status-approved"]}`}
                    >
                      Ativo
                    </span>
                  </td>
                  <td className={`${styles.tds}`}>
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
                <tr className={`${styles.trs}`}>
                  <td className={`${styles.tds}`}>#1054</td>
                  <td className={`${styles.tds}`}>
                    <img
                      src={avatarPlaceHolder}
                      alt="Carlos Oliveira"
                      className={`${styles["user-avatar"]}`}
                    />
                    Carlos Oliveira
                  </td>
                  <td className={`${styles.tds}`}>carlos@email.com</td>
                  <td className={`${styles.tds}`}>934567890</td>
                  <td className={`${styles.tds}`}>14/03/2023</td>
                  <td className={`${styles.tds}`}>
                    <span
                      className={`${styles["status-badge"]} ${styles["status-rejected"]}`}
                    >
                      Banido
                    </span>
                  </td>
                  <td className={`${styles.tds}`}>
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
