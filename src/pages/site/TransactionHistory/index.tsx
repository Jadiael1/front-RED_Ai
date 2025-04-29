import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TransactionHistoryPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/assets/css/transactionhistory.css";
    link.id = "transactionhistory-page-style";
    document.head.appendChild(link);

    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href = "/assets/fontawesome/css/all.min.css";
    link2.id = "fontawesome-page-style";
    document.head.appendChild(link2);

    return () => {
      const existingLink = document.getElementById(
        "transactionhistory-page-style"
      );
      if (existingLink) {
        existingLink.remove();
      }
      const existingLink2 = document.getElementById("fontawesome-page-style");
      if (existingLink2) {
        existingLink2.remove();
      }
    };
  }, []);

  return (
    <>
      <div className="container">
        <div className="header">
          <h1>Histórico de Transações</h1>
          <p>Todas as suas movimentações financeiras</p>
        </div>

        <div className="filters">
          <div className="filter-group">
            <label htmlFor="filter-type">Filtrar por tipo:</label>
            <select id="filter-type">
              <option value="all">Todos</option>
              <option value="deposit">Depósito</option>
              <option value="withdrawal">Retirada</option>
              <option value="income">Rendimento</option>
              <option value="bonus">Bônus</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="filter-status">Filtrar por status:</label>
            <select id="filter-status">
              <option value="all">Todos</option>
              <option value="approved">Aprovado</option>
              <option value="pending">Pendente</option>
              <option value="rejected">Rejeitado</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="filter-date">Filtrar por data:</label>
            <input type="date" id="filter-date" />
          </div>
        </div>

        <div className="transaction-list" id="transaction-list">
          {/* <!-- Exemplo de transação - Depósito Aprovado --> */}
          <div className="transaction-item">
            <div className="transaction-info">
              <div className="transaction-type">Depósito</div>
              <div className="transaction-date">15/03/2023 14:30</div>
              <span className="status status-approved">Aprovado</span>
            </div>
            <div
              className="transaction-amount"
              style={{ color: "var(--success-color)" }}
            >
              + 50.000 kz
            </div>
          </div>

          {/* <!-- Exemplo de transação - Retirada Pendente --> */}
          <div className="transaction-item">
            <div className="transaction-info">
              <div className="transaction-type">Retirada</div>
              <div className="transaction-date">16/03/2023 10:15</div>
              <span className="status status-pending">Pendente</span>
            </div>
            <div
              className="transaction-amount"
              style={{ color: "var(--pending-color)" }}
            >
              - 25.000 kz
            </div>
          </div>

          {/* <!-- Exemplo de transação - Rendimento Diário --> */}
          <div className="transaction-item">
            <div className="transaction-info">
              <div className="transaction-type">Rendimento VIP 1</div>
              <div className="transaction-date">16/03/2023 00:01</div>
              <span className="status status-approved">Aprovado</span>
            </div>
            <div
              className="transaction-amount"
              style={{ color: "var(--success-color)" }}
            >
              + 500 kz
            </div>
          </div>

          {/* <!-- Exemplo de transação - Bônus de Convite --> */}
          <div className="transaction-item">
            <div className="transaction-info">
              <div className="transaction-type">Bônus Nível 1</div>
              <div className="transaction-date">14/03/2023 18:45</div>
              <span className="status status-approved">Aprovado</span>
            </div>
            <div
              className="transaction-amount"
              style={{ color: "var(--success-color)" }}
            >
              + 5.000 kz
            </div>
          </div>

          {/* <!-- Exemplo de transação - Retirada Rejeitada --> */}
          <div className="transaction-item">
            <div className="transaction-info">
              <div className="transaction-type">Retirada</div>
              <div className="transaction-date">13/03/2023 21:30</div>
              <span className="status status-rejected">Rejeitado</span>
            </div>
            <div
              className="transaction-amount"
              style={{ color: "var(--rejected-color)" }}
            >
              - 30.000 kz
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Menu de navegação inferior --> */}
      <div className="footer-nav">
        <a
          onClick={() => navigate("/profile")}
          style={{ cursor: "pointer" }}
          className="nav-item"
        >
          <i className="fas fa-user"></i>
          <span>Perfil</span>
        </a>
      </div>
    </>
  );
};
export default TransactionHistoryPage;
