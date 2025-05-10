import { useCallback, useEffect, useState } from "react";
import styles from "./assets/css/Deposit.module.css";
import redai2 from "../../../assets/images/redai2.png";
import receiptPlaceHolder from "../../../assets/images/receipt_placeholder.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import {
  getTransactionsAdm,
  TTransactionData,
} from "../../../api/endpoints/transactions";
import { approveOrRejectDeposit } from "../../../api/endpoints/approveOrRejectDeposit";
import AlertDiv from "../../../components/Alert";
import ConfirmationDialog from "../../../components/ConfirmationDialog";

const DepositDashPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [transactions, setTransactions] = useState<TTransactionData[] | null>(
    null
  );
  const [selectedTransaction, setSelectedTransaction] =
    useState<TTransactionData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [filterStartDate, setFilterStartDate] = useState<string>("");
  const [filterEndDate, setFilterEndDate] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [approveOrReject, setApproveOrReject] = useState<
    "approve" | "reject" | null
  >(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);
  const [alertMessage, setAlertMessage] = useState<string>("");

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

  const formatDateForAPI = (date: string): string => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${year}-${month}-${day}`;
  };

  const fetchTransactions = useCallback(
    async (
      currentPage?: number,
      filterStatus?: string,
      filterStartDate?: string,
      filterEndDate?: string
    ): Promise<void> => {
      try {
        const params: Record<string, string | number> = {
          type: "deposit",
          perPage: 5, // Itens por página
          page: currentPage ?? 1,
          sortBy: "created_at",
          sortOrder: "desc",
        };

        if (filterStatus) params.status = filterStatus;
        if (filterStartDate)
          params.start_date = formatDateForAPI(filterStartDate);
        if (filterEndDate) params.end_date = formatDateForAPI(filterEndDate);

        const response = await getTransactionsAdm(params);
        setTransactions(response.data.data);
        setTotalPages(response.data.last_page); // Adapte conforme o nome da propriedade de paginação no backend
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      }
    },
    []
  );

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const applyFilters = () => {
    setCurrentPage(1);
    fetchTransactions(
      1,
      filterStatus,
      filterStartDate,
      filterEndDate
    );
  };

  const clearFilters = () => {
    setFilterStatus("");
    setFilterStartDate("");
    setFilterEndDate("");
    setCurrentPage(1);
  };

  const handleViewReceipt = (transaction: TTransactionData) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const renderTransactionsTable = () => {
    if (!transactions) {
      return <p>Carregando transações...</p>;
    }

    return (
      <div style={{ overflowX: "auto" }}>
        <table className={styles["data-table"]}>
          <thead>
            <tr className={styles.trs}>
              <th className={styles.ths}>ID</th>
              <th className={styles.ths}>Usuário</th>
              <th className={styles.ths}>Valor</th>
              <th className={styles.ths}>Data</th>
              <th className={styles.ths}>Método</th>
              <th className={styles.ths}>Status</th>
              <th className={styles.ths}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className={styles.trs}>
                <td className={styles.tds}>#{transaction.id}</td>
                <td className={styles.tds}>{transaction.user_email}</td>
                <td className={styles.tds}>{transaction.amount} kz</td>
                <td className={styles.tds}>{transaction.created_at}</td>
                <td className={styles.tds}>{transaction.method}</td>
                <td className={styles.tds}>
                  <span
                    className={`${styles["status-badge"]} ${
                      styles[`status-${transaction.status}`]
                    }`}
                  >
                    {transaction.status === "pending"
                      ? "Pendente"
                      : transaction.status === "approved"
                      ? "Aprovado"
                      : "Rejeitado"}
                  </span>
                </td>
                <td className={styles.tds}>
                  {transaction.status === "pending" && (
                    <>
                      <button
                        className={`${styles["action-btn"]} ${styles["btn-approve"]}`}
                        // onClick={() => handleApprove(transaction.id)}
                        onClick={() =>
                          handleApproveOrRejectTransactionButton(
                            transaction,
                            "approve"
                          )
                        }
                      >
                        Aprovar
                      </button>
                      <button
                        className={`${styles["action-btn"]} ${styles["btn-reject"]}`}
                        // onClick={() => handleReject(transaction.id)}
                        onClick={() =>
                          handleApproveOrRejectTransactionButton(
                            transaction,
                            "reject"
                          )
                        }
                      >
                        Rejeitar
                      </button>
                    </>
                  )}
                  {transaction.type === "deposit" && transaction.receipt && (
                    <button
                      className={`${styles["action-btn"]} ${styles["btn-view"]}`}
                      onClick={() => handleViewReceipt(transaction)}
                    >
                      Ver
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderModal = () => {
    return (
      <>
        {isModalOpen && selectedTransaction && (
          <div className={styles["modal-overlay"]}>
            <div className={styles["modal-content"]}>
              <h2>Detalhes da Transação</h2>
              <div className={styles["modal-detail"]}>
                <strong>ID da Transação:</strong> #{selectedTransaction.id}
              </div>
              <div className={styles["modal-detail"]}>
                <strong>Usuário:</strong> {selectedTransaction.user_name}
              </div>
              <div className={styles["modal-detail"]}>
                <strong>Valor:</strong> {selectedTransaction.amount} kz
              </div>
              <div className={styles["modal-detail"]}>
                <strong>Data:</strong> {selectedTransaction.created_at}
              </div>
              <div className={styles["modal-detail"]}>
                <strong>Método:</strong> {selectedTransaction.method}
              </div>
              <div className={styles["modal-detail"]}>
                <strong>Status:</strong>{" "}
                {selectedTransaction.status === "pending"
                  ? "Pendente"
                  : selectedTransaction.status === "approved"
                  ? "Aprovado"
                  : "Rejeitado"}
              </div>

              <h3>Comprovante</h3>
              <a
                href={selectedTransaction.receipt || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={selectedTransaction.receipt || receiptPlaceHolder}
                  alt="Comprovante"
                  className={styles["receipt-image"]}
                />
              </a>

              <button className={styles["close-modal"]} onClick={closeModal}>
                Fechar
              </button>
            </div>
          </div>
        )}
      </>
    );
  };

  const handleApproveOrRejectTransactionButton = (
    transaction: TTransactionData,
    action: "approve" | "reject"
  ) => {
    setSelectedTransaction(transaction);
    setApproveOrReject(action);
    setIsDialogOpen(true);
  };

  const updateDepositTransactions = (
    id: number,
    action: "approved" | "rejected"
  ) => {
    setTransactions((prevTransactions) =>
      prevTransactions
        ? prevTransactions.map((prevTransaction) =>
            prevTransaction.id === id
              ? {
                  ...prevTransaction,
                  status: action,
                }
              : prevTransaction
          )
        : prevTransactions
    );
  };

  const approveOrRejectTransaction = async () => {
    if (!selectedTransaction || !approveOrReject) return;
    setIsDialogOpen(false);

    const status = approveOrReject === "approve" ? "approved" : "rejected";
    try {
      const resp = await approveOrRejectDeposit({
        status,
        transaction_id: selectedTransaction.id,
      });

      if (resp.status === "success") {
        showAlert(
          "success",
          `Transação ${
            status === "approved" ? "aprovada" : "rejeitada"
          } com sucesso.`
        );
        updateDepositTransactions(selectedTransaction.id, status);
      } else {
        showAlert(
          "error",
          `Erro ao ${status === "approved" ? "aprovar" : "rejeitar"} transação.`
        );
      }
    } catch {
      showAlert("error", "Erro ao processar a transação.");
    } finally {
      setSelectedTransaction(null);
      setApproveOrReject(null);
    }
  };

  const showAlert = (type: "success" | "error", message: string) => {
    setAlertType(type);
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage("");
      setAlertType(null);
    }, 5000);
  };

  const previousPage = () => {
    fetchTransactions(
      currentPage - 1,
      filterStatus,
      filterStartDate,
      filterEndDate
    );
    setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    fetchTransactions(
      currentPage + 1,
      filterStatus,
      filterStartDate,
      filterEndDate
    );
    setCurrentPage(currentPage + 1);
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
            onClick={() => logout()}
            style={{ cursor: "pointer" }}
          >
            <i className={`fas fa-sign-out-alt ${styles.is}`}></i>{" "}
            <span>Sair</span>
          </a>
        </nav>
      </header>

      <div className={`${styles["admin-container"]}`}>
        {alertType && alertMessage && (
          <AlertDiv type={alertType} message={alertMessage} />
        )}
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
              <select
                className={`${styles["filter-select"]}`}
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
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
              <input
                type="date"
                className={`${styles["filter-input"]}`}
                value={filterStartDate}
                onChange={(e) => setFilterStartDate(e.target.value)}
              />
            </div>

            <div className={`${styles["filter-group"]}`}>
              <label className={`${styles["filter-label"]}`}>Data final</label>
              <input
                type="date"
                className={`${styles["filter-input"]}`}
                value={filterEndDate}
                onChange={(e) => setFilterEndDate(e.target.value)}
              />
            </div>

            <div className={`${styles["filter-actions"]}`}>
              <button
                className={`${styles["filter-btn"]} ${styles["reset-btn"]}`}
                onClick={clearFilters}
              >
                Limpar
              </button>
              <button
                className={`${styles["filter-btn"]}`}
                onClick={applyFilters}
              >
                <i className="fas fa-filter"></i> Filtrar
              </button>
            </div>
          </div>
          {renderTransactionsTable()}
          <div className={styles["pagination"]}>
            <button
              onClick={() => currentPage > 1 && previousPage()}
              disabled={currentPage === 1}
              className={styles["pagination-btn"]}
            >
              Anterior
            </button>
            <span className={styles["pagination-info"]}>
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => currentPage < totalPages && nextPage()}
              disabled={currentPage === totalPages}
              className={styles["pagination-btn"]}
            >
              Próxima
            </button>
          </div>
        </main>
      </div>
      {renderModal()}
      <ConfirmationDialog
        title="Confirmação"
        message={`Tem certeza que deseja ${
          approveOrReject === "approve" ? "aprovar" : "rejeitar"
        } este depósito?`}
        onConfirm={approveOrRejectTransaction}
        onCancel={() => setIsDialogOpen(false)}
        isOpen={isDialogOpen}
      />
    </>
  );
};

export default DepositDashPage;
