import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./assets/css/TransactionHistory.module.css";

const TransactionHistoryPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.fontFamily =
      "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    document.body.style.margin = "0";
    document.body.style.padding = "0 0 80px 0";
    document.body.style.backgroundColor = "#f5f7fa";
    document.body.style.color = "#333";
    document.body.style.lineHeight = "1.6";

    const el = document.body;
    if (el) {
      el.style.setProperty("--primary-color", "#3498db");
      el.style.setProperty("--secondary-color", "#2c3e50");
      el.style.setProperty("--accent-color", "#e74c3c");
      el.style.setProperty("--light-color", "#ecf0f1");
      el.style.setProperty("--dark-color", "#34495e");
      el.style.setProperty("--success-color", "#2ecc71");
      el.style.setProperty("--warning-color", "#f39c12");
      el.style.setProperty("--pending-color", "#f39c12");
      el.style.setProperty("--rejected-color", "#e74c3c");
    }

    return () => {
      document.body.style.fontFamily = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
      document.body.style.lineHeight = "";

      if (el) {
        el.style.removeProperty("--primary-color");
        el.style.removeProperty("--secondary-color");
        el.style.removeProperty("--accent-color");
        el.style.removeProperty("--light-color");
        el.style.removeProperty("--dark-color");
        el.style.removeProperty("--success-color");
        el.style.removeProperty("--warning-color");
        el.style.removeProperty("--pending-color");
        el.style.removeProperty("--rejected-color");
      }
    };
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.h1s}>Histórico de Transações</h1>
          <p>Todas as suas movimentações financeiras</p>
        </div>

        <div className={styles.filters}>
          <div className={styles["filter-group"]}>
            <label htmlFor="filter-type">Filtrar por tipo:</label>
            <select className={styles.selects} id="filter-type">
              <option value="all">Todos</option>
              <option value="deposit">Depósito</option>
              <option value="withdrawal">Retirada</option>
              <option value="income">Rendimento</option>
              <option value="bonus">Bônus</option>
            </select>
          </div>

          <div className={styles["filter-group"]}>
            <label htmlFor="filter-status">Filtrar por status:</label>
            <select className={styles.selects} id="filter-status">
              <option value="all">Todos</option>
              <option value="approved">Aprovado</option>
              <option value="pending">Pendente</option>
              <option value="rejected">Rejeitado</option>
            </select>
          </div>

          <div className={styles["filter-group"]}>
            <label htmlFor="filter-date">Filtrar por data:</label>
            <input className={styles.inputs} type="date" id="filter-date" />
          </div>
        </div>

        <div className={styles["transaction-list"]} id="transaction-list">
          {/* <!-- Exemplo de transação - Depósito Aprovado --> */}
          <div className={styles["transaction-item"]}>
            <div className={styles["transaction-info"]}>
              <div className={styles["transaction-type"]}>Depósito</div>
              <div className={styles["transaction-date"]}>15/03/2023 14:30</div>
              <span className={`${styles.status} ${styles["status-approved"]}`}>
                Aprovado
              </span>
            </div>
            <div
              className={styles["transaction-amount"]}
              style={{ color: "var(--success-color)" }}
            >
              + 50.000 kz
            </div>
          </div>

          {/* <!-- Exemplo de transação - Retirada Pendente --> */}
          <div className={styles["transaction-item"]}>
            <div className={styles["transaction-info"]}>
              <div className={styles["transaction-type"]}>Retirada</div>
              <div className={styles["transaction-date"]}>16/03/2023 10:15</div>
              <span className={`${styles.status} ${styles["status-pending"]}`}>
                Pendente
              </span>
            </div>
            <div
              className={styles["transaction-amount"]}
              style={{ color: "var(--pending-color)" }}
            >
              - 25.000 kz
            </div>
          </div>

          {/* <!-- Exemplo de transação - Rendimento Diário --> */}
          <div className={styles["transaction-item"]}>
            <div className={styles["transaction-info"]}>
              <div className={styles["transaction-type"]}>Rendimento VIP 1</div>
              <div className={styles["transaction-date"]}>16/03/2023 00:01</div>
              <span className={`${styles.status} ${styles["status-approved"]}`}>
                Aprovado
              </span>
            </div>
            <div
              className={styles["transaction-amount"]}
              style={{ color: "var(--success-color)" }}
            >
              + 500 kz
            </div>
          </div>

          {/* <!-- Exemplo de transação - Bônus de Convite --> */}
          <div className={styles["transaction-item"]}>
            <div className={styles["transaction-info"]}>
              <div className={styles["transaction-type"]}>Bônus Nível 1</div>
              <div className={styles["transaction-date"]}>14/03/2023 18:45</div>
              <span className={`${styles.status} ${styles["status-approved"]}`}>
                Aprovado
              </span>
            </div>
            <div
              className={styles["transaction-amount"]}
              style={{ color: "var(--success-color)" }}
            >
              + 5.000 kz
            </div>
          </div>

          {/* <!-- Exemplo de transação - Retirada Rejeitada --> */}
          <div className={styles["transaction-item"]}>
            <div className={styles["transaction-info"]}>
              <div className={styles["transaction-type"]}>Retirada</div>
              <div className={styles["transaction-date"]}>13/03/2023 21:30</div>
              <span className={`${styles.status} ${styles["status-rejected"]}`}>
                Rejeitado
              </span>
            </div>
            <div
              className={styles["transaction-amount"]}
              style={{ color: "var(--rejected-color)" }}
            >
              - 30.000 kz
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Menu de navegação inferior --> */}
      <div className={styles["footer-nav"]}>
        <a
          onClick={() => navigate("/profile")}
          style={{ cursor: "pointer" }}
          className={styles["nav-item"]}
        >
          <i className={`fas fa-user ${styles.is}`}></i>
          <span>Perfil</span>
        </a>
      </div>
    </>
  );
};
export default TransactionHistoryPage;
