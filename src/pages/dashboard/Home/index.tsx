import { useEffect, useState } from "react";
import redai2 from "../../../assets/images/redai2.png";
import styles from "./assets/css/Home.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { getUsers } from "../../../api/endpoints/users";
import {
  getTransactionsAdm,
  TTransactionData,
} from "../../../api/endpoints/transactions";
import { getTotalInvitedUsers } from "../../../api/endpoints/totalInvitedUsers";
import { ApproveOrRejectWithdrawal } from "../../../api/endpoints/ApproveOrRejectWithdrawal";
import { approveOrRejectDeposit } from "../../../api/endpoints/approveOrRejectDeposit";
import ConfirmationDialog from "../../../components/ConfirmationDialog";
import AlertDiv from "../../../components/Alert";
import { IUser } from "../../../types";

const HomeDashPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalActiveUsers, setTotalActiveUsers] = useState<number>(0);
  const [totalDeposited, setTotalDeposited] = useState<number>(0);
  const [totalWithdrawn, setTotalWithdrawn] = useState<number>(0);
  const [totalInvitedUsers, setTotalInvitedUsers] = useState<number>(0);
  const [totalProductsSold, setTotalProductsSold] = useState<number>(0);
  const [pendingTransactions, setPendingTransactions] = useState<
    TTransactionData[] | null
  >(null);
  const [selectedTransaction, setSelectedTransaction] =
    useState<TTransactionData | null>(null);
  const [approveOrReject, setApproveOrReject] = useState<
    "approve" | "reject" | null
  >(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<
    "success" | "warning" | "error" | null
  >(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertLink, setAlertLink] = useState<string | undefined>(undefined);
  const [alertLinkMessage, setAlertLinkMessage] = useState<string | undefined>(
    undefined
  );
  const [latestRegisteredUsers, setLatestRegisteredUsers] = useState<
    (IUser & { createdAtDate: string })[] | null
  >(null);

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

  useEffect(() => {
    setAlertLink(undefined);
    setAlertLinkMessage(undefined);
    (async () => {
      const resp = await getUsers();
      setTotalUsers(resp.data.total);
      const activeUsers = resp.data.data.map((user) => user.email_verified_at);
      setTotalActiveUsers(activeUsers.length);

      //
      const latestRegisteredUsers1 = resp.data.data
        .map((user) => {
          const cleanedTimestamp = parseInt(
            user.created_at.replace(/\D/g, ""),
            10
          );
          const date = new Date(cleanedTimestamp * 1000);
          const localDate = date.toLocaleDateString();
          const localTime = date.toLocaleTimeString();

          return {
            ...user,
            createdAtDate: `${localDate} ${localTime}`,
          };
        })
        .sort((a, b) => b.id - a.id)
        .slice(0, 5);
      setLatestRegisteredUsers(latestRegisteredUsers1);
      //
      
      const transactions = await getTransactionsAdm({
        status: "approved",
        sortBy: "created_at",
        sortOrder: "desc",
        perPage: 99999,
      });
      const totalDeposited1 = transactions.data.data
        .filter((transaction) => transaction.type === "deposit")
        .map((transaction) => Number(transaction.amount))
        .reduce(
          (accumulator: number, currentValue: number) =>
            accumulator + currentValue,
          0
        );
      const totalWithdrawn1 = transactions.data.data
        .filter((transaction) => transaction.type === "withdrawal")
        .map((transaction) => {
          const amount = Number(transaction.amount);
          const originalAmount = amount / 0.9;
          // return Number(transaction.amount);
          return parseFloat(originalAmount.toFixed(2));
        })
        .reduce(
          (accumulator: number, currentValue: number) =>
            accumulator + currentValue,
          0
        );
      const totalProductsSold1 = transactions.data.data.filter(
        (transaction) => transaction.type === "investment"
      );
      setTotalProductsSold(totalProductsSold1.length);

      const totalInvitedUsersResp = await getTotalInvitedUsers();
      setTotalInvitedUsers(totalInvitedUsersResp.data.total_invited);
      setTotalDeposited(totalDeposited1);
      setTotalWithdrawn(totalWithdrawn1);

      const pendingTransactions1 = await getTransactionsAdm({
        status: "pending",
        sortBy: "created_at",
        sortOrder: "desc",
        perPage: 99999,
      });
      setPendingTransactions(pendingTransactions1.data.data);
    })();
  }, []);

  const cancelApproveOrReject = () => {
    setIsDialogOpen(false);
    setSelectedTransaction(null);
  };

  const handleApproveOrRejectTransactionButton = (
    transaction: TTransactionData,
    action: "approve" | "reject"
  ) => {
    setIsDialogOpen(true);
    setSelectedTransaction(transaction);
    setApproveOrReject(action);
  };

  const updatePendingTransactions = (id: number) => {
    setPendingTransactions((prevPendingTransactions) =>
      prevPendingTransactions
        ? prevPendingTransactions.filter((transaction) => transaction.id !== id)
        : prevPendingTransactions
    );
  };

  const approveOrRejectTransaction = async () => {
    setIsDialogOpen(false);
    type TApprovalStatus = "approve" | "reject";
    const action: TApprovalStatus = approveOrReject as TApprovalStatus;
    const transaction = selectedTransaction as TTransactionData;
    const type = transaction.type;
    const transaction_id = transaction.id;
    const status = action === "approve" ? "approved" : "rejected";

    if (type === "withdrawal") {
      const resp = await ApproveOrRejectWithdrawal({
        status: status,
        transaction_id: transaction_id,
      });
      if (resp.status === "success") {
        showAlert(
          "success",
          `Transação de retirada ${
            status === "approved" ? "aprovada" : "rejeitada"
          } com sucesso.`
        );
        updatePendingTransactions(transaction_id);
      } else {
        showAlert(
          "error",
          `Erro ao ${
            status === "approved" ? "aprovar" : "rejeitar"
          } transação de retirada.`
        );
      }
    }
    if (type === "deposit") {
      const resp = await approveOrRejectDeposit({
        status: status,
        transaction_id: transaction_id,
      });
      if (resp.status === "success") {
        showAlert(
          "success",
          `Transação de deposito ${
            status === "approved" ? "aprovada" : "rejeitada"
          } com sucesso.`
        );
        updatePendingTransactions(transaction_id);
      } else {
        showAlert(
          "error",
          `Erro ao ${
            status === "approved" ? "aprovar" : "rejeitar"
          } transação de deposito.`
        );
      }
    }
    setSelectedTransaction(null);
  };

  const showAlert = (
    type: "success" | "warning" | "error",
    message: string
  ) => {
    setAlertType(type);
    setAlertMessage(message);

    setTimeout(() => {
      setAlertMessage("");
      setAlertType(null);
    }, 5000);
  };

  return (
    <>
      <header className={styles["admin-header"]}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <button className={styles["menu-toggle"]} id="menuToggle">
            <i className="fas fa-bars"></i>
          </button>
          <img
            src={redai2}
            alt="RED Ai logo"
            className={styles.logo}
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
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
            onClick={() => logout()}
            style={{ cursor: "pointer" }}
          >
            <i className="fas fa-sign-out-alt"></i>{" "}
            <span className={`${styles.spans}`}>Sair</span>
          </a>
        </nav>
      </header>

      <div className={styles["admin-container"]}>
        {alertType && alertMessage && (
          <AlertDiv
            type={alertType}
            message={alertMessage}
            link={alertLink}
            linkMessage={alertLinkMessage}
          />
        )}
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
                {totalUsers}
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
                {totalActiveUsers}
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
                {totalDeposited} kz
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
                {totalWithdrawn} kz
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
                {totalInvitedUsers}
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
                {totalProductsSold}
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
                {pendingTransactions ? (
                  pendingTransactions.map((pendingTransaction) => (
                    <tr className={`${styles.trs}`}>
                      <td className={`${styles.tds}`}>
                        #{pendingTransaction.id}
                      </td>
                      <td className={`${styles.tds}`}>
                        {pendingTransaction.type === "withdrawal"
                          ? "Retirada"
                          : ""}
                        {pendingTransaction.type === "deposit"
                          ? "Deposito"
                          : ""}
                      </td>
                      <td className={`${styles.tds}`}>
                        {pendingTransaction.user_email}
                      </td>
                      <td className={`${styles.tds}`}>
                        {pendingTransaction.amount} kz
                      </td>
                      <td className={`${styles.tds}`}>
                        {pendingTransaction.created_at}
                      </td>
                      <td className={`${styles.tds}`}>
                        <span
                          className={`${styles["status-badge"]} ${styles["status-pending"]}`}
                        >
                          {pendingTransaction.status === "pending"
                            ? "Pendente"
                            : ""}
                        </span>
                      </td>
                      <td className={`${styles.tds}`}>
                        <button
                          className={`${styles["action-btn"]} ${styles["btn-approve"]}`}
                          onClick={() => {
                            handleApproveOrRejectTransactionButton(
                              pendingTransaction,
                              "approve"
                            );
                          }}
                        >
                          Aprovar
                        </button>
                        <button
                          className={`${styles["action-btn"]} ${styles["btn-reject"]}`}
                          onClick={() => {
                            handleApproveOrRejectTransactionButton(
                              pendingTransaction,
                              "reject"
                            );
                          }}
                        >
                          Rejeitar
                        </button>
                        {pendingTransaction.type === "deposit" &&
                          pendingTransaction.receipt && (
                            <button
                              className={`${styles["action-btn"]} ${styles["btn-view"]}`}
                              onClick={() => {
                                window.open(
                                  pendingTransaction.receipt as string,
                                  "_blank"
                                );
                              }}
                            >
                              ver
                            </button>
                          )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className={`${styles.trs}`} key='abcdefg9548756$'>
                    <td className={`${styles.tds}`}>#loading...</td>
                    <td className={`${styles.tds}`}>loading...</td>
                    <td className={`${styles.tds}`}>loading...</td>
                    <td className={`${styles.tds}`}>loading... kz</td>
                    <td className={`${styles.tds}`}>loading...</td>
                    <td className={`${styles.tds}`}>
                      <span
                        className={`${styles["status-badge"]} ${styles["status-pending"]}`}
                      >
                        loading...
                      </span>
                    </td>
                    <td className={`${styles.tds}`}>
                      <button
                        className={`${styles["action-btn"]} ${styles["btn-approve"]}`}
                      >
                        loading...
                      </button>
                      <button
                        className={`${styles["action-btn"]} ${styles["btn-reject"]}`}
                      >
                        loading...
                      </button>
                      <button
                        className={`${styles["action-btn"]} ${styles["btn-view"]}`}
                      >
                        loading...
                      </button>
                    </td>
                  </tr>
                )}
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
                {latestRegisteredUsers ? (
                  latestRegisteredUsers.map((latestRegisteredUser) => (
                    <tr className={`${styles.trs}`}>
                      <td className={`${styles.tds}`}>
                        #{latestRegisteredUser.id}
                      </td>
                      <td className={`${styles.tds}`}>
                        {latestRegisteredUser.name}
                      </td>
                      <td className={`${styles.tds}`}>
                        {latestRegisteredUser.email}
                      </td>
                      <td className={`${styles.tds}`}>
                        {latestRegisteredUser.phone}
                      </td>
                      <td className={`${styles.tds}`}>
                        {latestRegisteredUser.createdAtDate}
                      </td>
                      <td className={`${styles.tds}`}>
                        {latestRegisteredUser.inviter_id ?? 0}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className={`${styles.trs}`}>
                    <td className={`${styles.tds}`}>#1055</td>
                    <td className={`${styles.tds}`}>Maria Santos</td>
                    <td className={`${styles.tds}`}>maria@email.com</td>
                    <td className={`${styles.tds}`}>912345678</td>
                    <td className={`${styles.tds}`}>15/03/2023</td>
                    <td className={`${styles.tds}`}>EQP456</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      <ConfirmationDialog
        title="Confirmar"
        message={`Tem certeza que deseja ${
          approveOrReject && approveOrReject === "approve"
            ? "aprovar"
            : "rejeitar"
        } ${
          selectedTransaction?.type === "withdrawal"
            ? "a Retirada"
            : "o Deposito"
        }?`}
        onConfirm={approveOrRejectTransaction}
        onCancel={cancelApproveOrReject}
        isOpen={isDialogOpen}
      />
    </>
  );
};

export default HomeDashPage;
