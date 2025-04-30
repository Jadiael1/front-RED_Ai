import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./assets/css/TransactionHistory.module.css";

const TransactionHistoryPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href = "/assets/fontawesome/css/all.min.css";
    link2.id = "fontawesome-page-style";
    document.head.appendChild(link2);
    return () => {
      const existingLink2 = document.getElementById("fontawesome-page-style");
      if (existingLink2) {
        existingLink2.remove();
      }
    };
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Histórico de Transações</h1>
          <p>Todas as suas movimentações financeiras</p>
        </div>

        <div className={styles.filters}>
          <div className={styles["filter-group"]}>
            <label htmlFor="filter-type">Filtrar por tipo:</label>
            <select id="filter-type">
              <option value="all">Todos</option>
              <option value="deposit">Depósito</option>
              <option value="withdrawal">Retirada</option>
              <option value="income">Rendimento</option>
              <option value="bonus">Bônus</option>
            </select>
          </div>

          <div className={styles["filter-group"]}>
            <label htmlFor="filter-status">Filtrar por status:</label>
            <select id="filter-status">
              <option value="all">Todos</option>
              <option value="approved">Aprovado</option>
              <option value="pending">Pendente</option>
              <option value="rejected">Rejeitado</option>
            </select>
          </div>

          <div className={styles["filter-group"]}>
            <label htmlFor="filter-date">Filtrar por data:</label>
            <input type="date" id="filter-date" />
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
          <i className="fas fa-user"></i>
          <span>Perfil</span>
        </a>
      </div>
    </>
  );
};
export default TransactionHistoryPage;
