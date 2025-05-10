import { useCallback, useEffect, useState } from "react";
import styles from "./assets/css/ToRemove.module.css";
import { useNavigate } from "react-router-dom";
import redai2 from "../../../assets/images/redai2.png";
import { useAuth } from "../../../hooks/useAuth";
import {
  getTransactionsAdm,
  TTransactionData,
} from "../../../api/endpoints/transactions";
import ConfirmationDialog from "../../../components/ConfirmationDialog";
import AlertDiv from "../../../components/Alert";
import { ApproveOrRejectWithdrawal } from "../../../api/endpoints/ApproveOrRejectWithdrawal";

const ToRemoveDashPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [transactions, setTransactions] = useState<TTransactionData[] | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [filterByUserId, setFilterByUserId] = useState<string>("");
  const [selectedTransaction, setSelectedTransaction] =
    useState<TTransactionData | null>(null);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [alertType, setAlertType] = useState<
    "success" | "error" | "warning" | null
  >(null);
  const [alertMessage, setAlertMessage] = useState("");

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

  const formatDate = (date: string) => {
    if (!date) return "";
    const [y, m, d] = date.split("-");
    return `${y}-${m}-${d}`;
  };

  const fetchTransactions = useCallback(
    async (page = 1) => {
      try {
        const params: Record<string, string | number> = {
          type: "withdrawal",
          page,
          perPage: 10,
          sortBy: "created_at",
          sortOrder: "desc",
        };
        if (filterStatus) params.status = filterStatus;
        if (filterStartDate) params.start_date = formatDate(filterStartDate);
        if (filterEndDate) params.end_date = formatDate(filterEndDate);
        if (filterByUserId) params.id = filterByUserId;

        const resp = await getTransactionsAdm(params);
        setTransactions(resp.data.data);
        setTotalPages(resp.data.last_page);
      } catch (err) {
        console.error("Erro ao buscar saques:", err);
      }
    },
    [filterStatus, filterStartDate, filterEndDate, filterByUserId]
  );

  useEffect(() => {
    fetchTransactions(currentPage);
  }, [fetchTransactions, currentPage]);

  const applyFilters = () => {
    setCurrentPage(1);
    fetchTransactions(1);
  };

  const clearFilters = () => {
    setFilterStatus("");
    setFilterStartDate("");
    setFilterEndDate("");
    setCurrentPage(1);
    fetchTransactions(1);
  };

  const handleAction = (tx: TTransactionData, type: "approve" | "reject") => {
    setSelectedTransaction(tx);
    setActionType(type);
    setIsDialogOpen(true);
  };

  const showAlert = (
    type: "success" | "error" | "warning",
    message: string
  ) => {
    setAlertType(type);
    setAlertMessage(message);
    setTimeout(() => {
      setAlertType(null);
      setAlertMessage("");
    }, 5000);
  };

  const confirmAction = async () => {
    if (!selectedTransaction || !actionType) return;
    setIsDialogOpen(false);
    try {
      const status = actionType === "approve" ? "approved" : "rejected";
      const resp = await ApproveOrRejectWithdrawal({
        status,
        transaction_id: selectedTransaction.id,
      });

      if (resp.status === "success") {
        showAlert(
          "success",
          `Solicitação ${
            status === "approved" ? "aprovada" : "rejeitada"
          } com sucesso.`
        );
        fetchTransactions(currentPage);
      } else {
        showAlert(
          "error",
          `Erro ao ${
            status === "approved" ? "aprovar" : "rejeitar"
          } solicitação.`
        );
      }
    } catch {
      showAlert("error", "Erro ao processar a ação.");
    } finally {
      setSelectedTransaction(null);
      setActionType(null);
    }
  };

  function calcularValorOriginal(valorComDesconto: number) {
    const valorOriginal = valorComDesconto / 0.9;
    return valorOriginal;
  }

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
        {alertType && <AlertDiv type={alertType} message={alertMessage} />}
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
                onClick={() => navigate("/dashboard/to-remove")}
                style={{ cursor: "pointer" }}
                className={`${styles.active} ${styles.as}`}
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
          <h1>Gerenciamento de Retiradas</h1>

          <div className={`${styles["filter-container"]}`}>
            <div className={`${styles["filter-row"]}`}>
              <div className={`${styles["filter-group"]}`}>
                <label className={`${styles["filter-label"]}`}>Status</label>
                <select
                  className={`${styles["filter-select"]}`}
                  id="statusFilter"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="">Todos</option>
                  <option value="pending">Pendentes</option>
                  <option value="approved">Aprovadas</option>
                  <option value="rejected">Rejeitadas</option>
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
                  value={filterStartDate}
                  onChange={(e) => setFilterStartDate(e.target.value)}
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
                  value={filterEndDate}
                  onChange={(e) => setFilterEndDate(e.target.value)}
                />
              </div>
            </div>

            <div
              className={`${styles["filter-row"]}`}
              style={{ marginTop: "15px" }}
            >
              <div className={`${styles["filter-group"]}`}>
                <label className={`${styles["filter-label"]}`}>
                  Buscar por ID
                </label>
                <input
                  type="text"
                  className={`${styles["filter-input"]}`}
                  id="searchInput"
                  placeholder="Digite um id (Apenas numero) valido para pesquisar..."
                  value={filterByUserId}
                  onChange={(e) => {
                    if (!isNaN(Number(e.target.value))) {
                      setFilterByUserId(e.target.value);
                    } else {
                      showAlert(
                        "warning",
                        "Deves buscar pelo id do usuario. (Apenas numero)"
                      );
                    }
                  }}
                />
              </div>

              <div className={`${styles["filter-actions"]}`}>
                <button
                  className={`${styles["filter-btn"]} ${styles["reset-btn"]}`}
                  id="resetFilters"
                  onClick={clearFilters}
                >
                  <i className="fas fa-undo"></i> Limpar
                </button>
                <button
                  className={`${styles["filter-btn"]}`}
                  id="applyFilters"
                  onClick={applyFilters}
                >
                  <i className="fas fa-filter"></i> Filtrar
                </button>
              </div>
            </div>
          </div>

          <div style={{ overflowX: "auto", marginTop: "20px" }}>
            <table className={`${styles["data-table"]}`}>
              <thead>
                <tr className={`${styles.trs}`}>
                  <th className={`${styles.ths}`}>ID</th>
                  <th className={`${styles.ths}`}>Usuário</th>
                  <th className={`${styles.ths}`}>Valor</th>
                  <th className={`${styles.ths}`}>Taxa</th>
                  <th className={`${styles.ths}`}>Líquido</th>
                  <th className={`${styles.ths}`}>Data</th>
                  <th className={`${styles.ths}`}>Método</th>
                  <th className={`${styles.ths}`}>Status</th>
                  <th className={`${styles.ths}`}>Ações</th>
                </tr>
              </thead>
              <tbody id="withdrawalsTable">
                {transactions?.map((tx) => (
                  <tr className={`${styles.trs}`} key={tx.id}>
                    <td className={`${styles.tds}`}>#{tx.id}</td>
                    <td className={`${styles.tds}`}>{tx.user_name}</td>
                    <td className={`${styles.tds}`}>
                      {calcularValorOriginal(Number(tx.amount))} kz
                    </td>
                    <td className={`${styles.tds}`}>10%</td>
                    <td className={`${styles.tds}`}>{tx.amount}</td>
                    <td className={`${styles.tds}`}>{tx.created_at}</td>
                    <td className={`${styles.tds}`}>{tx.method}</td>
                    <td className={`${styles.tds}`}>
                      <span
                        className={`${styles["status-badge"]} ${
                          styles[`status-${tx.status}`]
                        }`}
                      >
                        {tx.status === "pending"
                          ? "Pendente"
                          : tx.status === "approved"
                          ? "Aprovado"
                          : "Rejeitado"}
                      </span>
                    </td>
                    <td>
                      {tx.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleAction(tx, "approve")}
                            className={`${styles["action-btn"]} ${styles["btn-approve"]}`}
                          >
                            Aprovar
                          </button>
                          <button
                            onClick={() => handleAction(tx, "reject")}
                            className={`${styles["action-btn"]} ${styles["btn-reject"]}`}
                          >
                            Rejeitar
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.pagination}>
            <button
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`${styles["pagination-btn"]}`}
            >
              Anterior
            </button>
            <span className={`${styles["pagination-info"]}`}>
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() =>
                currentPage < totalPages && setCurrentPage(currentPage + 1)
              }
              disabled={currentPage === totalPages}
              className={`${styles["pagination-btn"]}`}
            >
              Próxima
            </button>
          </div>
        </main>
      </div>

      <ConfirmationDialog
        title="Confirmação"
        message={`Deseja realmente ${
          actionType === "approve" ? "aprovar" : "rejeitar"
        } este saque?`}
        onConfirm={confirmAction}
        onCancel={() => setIsDialogOpen(false)}
        isOpen={isDialogOpen}
      />
    </>
  );
};

export default ToRemoveDashPage;
