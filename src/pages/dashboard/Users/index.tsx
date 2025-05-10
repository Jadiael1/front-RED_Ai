import { useCallback, useEffect, useState } from "react";
import styles from "./assets/css/Users.module.css";
import redai2 from "../../../assets/images/redai2.png";
import avatarPlaceHolder from "../../../assets/images/avatar_placeholder.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { getUsers, updateUserActiveStatus } from "../../../api/endpoints/users";
import { IUser } from "../../../types";

type UserStatus = "Todos os status" | "Ativo" | "Banido";

const UsersDashPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [users, setUsers] = useState<
    (IUser & { createdAtDate?: string | null })[] | null
  >(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] =
    useState<UserStatus>("Todos os status");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);

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

  const fetchUsers = useCallback(
    async (page: number = 1): Promise<void> => {
      setLoading(true);
      try {
        const params: Record<string, string> = {
          per_page: "8",
          page: page.toString(),
        };

        if (searchTerm) {
          if (/^\d+$/.test(searchTerm)) {
            params.id = searchTerm;
          } else if (searchTerm.includes("@")) {
            params.email = searchTerm;
          } else {
            params.name = searchTerm;
          }
        }

        if (statusFilter !== "Todos os status") {
          params.active = statusFilter === "Ativo" ? "1" : "0";
        }

        const usersResp = await getUsers(params);
        const paginationData = usersResp.data;

        const treatedUsers = paginationData.data
          .map((user) => {
            const cleanedTimestamp = parseInt(
              user.created_at.replace(/\D/g, ""),
              10
            );
            const date = new Date(cleanedTimestamp * 1000);
            const localDate = date.toLocaleDateString();
            const localTime = date.toLocaleTimeString();
            return { ...user, createdAtDate: `${localDate} ${localTime}` };
          })
          .sort((a, b) => b.id - a.id);

        setUsers(treatedUsers);
        setCurrentPage(paginationData.current_page);
        setLastPage(paginationData.last_page);
      } catch {
        alert("Erro ao buscar usuários.");
      } finally {
        setLoading(false);
      }
    },
    [searchTerm, statusFilter]
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleToggleUserStatus = async (
    userId: number,
    currentStatus: boolean
  ) => {
    const confirmAction = window.confirm(
      `Deseja realmente ${currentStatus ? "banir" : "reativar"} este usuário?`
    );
    if (!confirmAction) return;

    try {
      await updateUserActiveStatus(userId, !currentStatus);
      alert(`Usuário ${!currentStatus ? "reativado" : "banido"} com sucesso.`);
      fetchUsers();
    } catch {
      alert("Erro ao atualizar status do usuário.");
    }
  };

  const exportToCSV = () => {
    if (!users) return;
    const header = ["ID", "Nome", "Email", "Telefone", "Registro", "Status"];
    const rows = users.map((u) => [
      u.id,
      u.name,
      u.email,
      u.phone,
      u.createdAtDate,
      u.active ? "Ativo" : "Banido",
    ]);
    const csvContent = [header, ...rows].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "usuarios.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToExcel = async () => {
    if (!users) return;
    const { utils, writeFile } = await import("xlsx");
    const ws = utils.json_to_sheet(
      users.map((u) => ({
        ID: u.id,
        Nome: u.name,
        Email: u.email,
        Telefone: u.phone,
        Registro: u.createdAtDate,
        Status: u.active ? "Ativo" : "Banido",
      }))
    );
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Usuários");
    writeFile(wb, "usuarios.xlsx");
  };

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
            onClick={() => logout()}
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
                <i className={`fas fa-tachometer-alt ${styles.is}`}></i>{" "}
                Dashboard
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className={`${styles["search-input"]}`}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as UserStatus)}
            >
              <option>Todos os status</option>
              <option>Ativo</option>
              <option>Banido</option>
            </select>
            <button
              className={`${styles["search-btn"]}`}
              onClick={() => fetchUsers(1)}
            >
              <i className="fas fa-search"></i> Pesquisar
            </button>
          </div>

          <div className={`${styles["user-actions"]}`}>
            <button className={`${styles["export-btn"]}`} onClick={exportToCSV}>
              <i className="fas fa-file-export"></i> Exportar CSV
            </button>
            <button
              className={`${styles["export-btn"]}`}
              onClick={exportToExcel}
            >
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
                {users ? (
                  users.map((user, index) => (
                    <tr className={`${styles.trs}`} key={index}>
                      <td className={`${styles.tds}`}>#{user.id}</td>
                      <td className={`${styles.tds}`}>
                        <div className={styles["user-info"]}>
                          <img
                            src={avatarPlaceHolder}
                            alt={user.name}
                            className={`${styles["user-avatar"]}`}
                          />
                          <span>{user.name}</span>
                        </div>
                      </td>
                      <td className={`${styles.tds}`}>{user.email}</td>
                      <td className={`${styles.tds}`}>{user.phone}</td>
                      <td className={`${styles.tds}`}>{user.createdAtDate}</td>
                      <td className={`${styles.tds}`}>
                        <span
                          className={`${styles["status-badge"]} ${
                            user.active
                              ? styles["status-approved"]
                              : styles["status-rejected"]
                          }`}
                        >
                          {user.active ? "Ativo" : "Banido"}
                        </span>
                      </td>
                      <td className={`${styles.tds}`}>
                        <button
                          className={`${styles["action-btn"]} ${styles["btn-ban"]}`}
                          onClick={() =>
                            handleToggleUserStatus(user.id, user.active)
                          }
                          disabled={loading}
                        >
                          <i className="fas fa-ban"></i>{" "}
                          {user.active ? "Banir" : "Reativar"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className={`${styles.trs}`}>
                    <td className={`${styles.tds}`}>#Loading...</td>
                    <td className={`${styles.tds}`}>
                      <img
                        src={avatarPlaceHolder}
                        alt="Loading..."
                        className={`${styles["user-avatar"]}`}
                      />
                      Loading...
                    </td>
                    <td className={`${styles.tds}`}>Loading...</td>
                    <td className={`${styles.tds}`}>Loading...</td>
                    <td className={`${styles.tds}`}>Loading...</td>
                    <td className={`${styles.tds}`}>
                      <span
                        className={`${styles["status-badge"]} ${styles["status-approved"]}`}
                      >
                        Loading...
                      </span>
                    </td>
                    <td className={`${styles.tds}`}>
                      <button
                        className={`${styles["action-btn"]} ${styles["btn-ban"]}`}
                      >
                        <i className="fas fa-ban"></i> Loading...
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className={`${styles["pagination-controls"]}`}>
              <button
                className={`${styles["pagination-btn"]}`}
                disabled={currentPage === 1 || loading}
                onClick={() => fetchUsers(currentPage - 1)}
              >
                Anterior
              </button>

              <span className={`${styles["pagination-info"]}`}>
                Página {currentPage} de {lastPage}
              </span>

              <button
                className={`${styles["pagination-btn"]}`}
                disabled={currentPage === lastPage || loading}
                onClick={() => fetchUsers(currentPage + 1)}
              >
                Próximo
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default UsersDashPage;
