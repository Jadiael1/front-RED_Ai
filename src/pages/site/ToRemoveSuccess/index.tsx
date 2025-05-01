import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./assets/css/ToRemoveSuccess.module.css";

const ToRemoveSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.fontFamily =
      "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    document.body.style.margin = "0";
    document.body.style.padding = "0 0 80px 0";
    document.body.style.backgroundColor = "#f5f7fa";
    document.body.style.textAlign = "center";

    return () => {
      document.body.style.fontFamily = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.backgroundColor = "";
      document.body.style.textAlign = "";
    };
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles["success-card"]}>
          <div
            className={`${styles["status-icon"]} ${styles["status-pending"]}`}
          >
            <i className="fas fa-clock"></i>
          </div>
          <h1 className={styles["success-title"]}>
            Solicitação de Retirada Registrada!
          </h1>
          <p>Sua solicitação será processada dentro de 24 horas úteis.</p>

          <div className={styles["transaction-details"]}>
            <div className={styles["detail-row"]}>
              <span className={styles["detail-label"]}>Nº da Solicitação:</span>
              <span className={styles["detail-value"]} id="requestId">
                RT2023-0542
              </span>
            </div>
            <div className={styles["detail-row"]}>
              <span className={styles["detail-label"]}>Valor Bruto:</span>
              <span className={styles["detail-value"]} id="grossAmount">
                50.000 Kz
              </span>
            </div>
            <div className={styles["detail-row"]}>
              <span className={styles["detail-label"]}>Taxa (10%):</span>
              <span className={styles["detail-value"]} id="feeAmount">
                5.000 Kz
              </span>
            </div>
            <div className={styles["detail-row"]}>
              <span className={styles["detail-label"]}>Valor Líquido:</span>
              <span className={styles["detail-value"]} id="netAmount">
                45.000 Kz
              </span>
            </div>
            <div className={styles["detail-row"]}>
              <span className={styles["detail-label"]}>Método:</span>
              <span className={styles["detail-value"]} id="paymentMethod">
                Transferência Bancária
              </span>
            </div>
            <div className={styles["detail-row"]}>
              <span className={styles["detail-label"]}>Conta Destino:</span>
              <span className={styles["detail-value"]} id="accountDetails">
                AO06 0045 0000 9876 5432 1012 3
              </span>
            </div>
            <div className={styles["detail-row"]}>
              <span className={styles["detail-label"]}>Data/Hora:</span>
              <span className={styles["detail-value"]} id="requestDate">
                25/05/2023 15:42
              </span>
            </div>
            <div className={styles["detail-row"]}>
              <span className={styles["detail-label"]}>Status:</span>
              <span
                className={`${styles["detail-value"]} ${styles["status-pending"]}`}
              >
                Pendente
              </span>
            </div>
          </div>

          <button
            className={styles["action-btn"]}
            onClick={() => {
              navigate("/transaction-history");
            }}
          >
            <i className="fas fa-history"></i> VER HISTÓRICO
          </button>

          <button
            className={styles["action-btn"]}
            onClick={() => {
              navigate("/");
            }}
            style={{
              backgroundColor: "var(--light-color)",
              color: "var(--secondary-color)",
              marginTop: "10px",
            }}
          >
            <i className="fas fa-home"></i> VOLTAR AO INÍCIO
          </button>
        </div>
      </div>

      <div className={styles["footer-nav"]}>
        <a
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
          className={styles["nav-item"]}
        >
          <i className="fas fa-home"></i>
          <span>Home</span>
        </a>
        <a
          onClick={() => navigate("/products")}
          style={{ cursor: "pointer" }}
          className={styles["nav-item"]}
        >
          <i className="fas fa-box"></i>
          <span>Produtos</span>
        </a>
        <a
          onClick={() => navigate("/teams")}
          style={{ cursor: "pointer" }}
          className={styles["nav-item"]}
        >
          <i className="fas fa-network-wired"></i>
          <span>Equipe</span>
        </a>
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

export default ToRemoveSuccessPage;
