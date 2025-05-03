import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./assets/css/DepositSuccess.module.css";

const DepositSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.fontFamily =
      "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    document.body.style.margin = "0";
    document.body.style.padding = "0 0 80px 0";
    document.body.style.backgroundColor = "#f5f7fa";
    document.body.style.textAlign = "center";

    const el = document.body;
    if (el) {
      el.style.setProperty("--primary-color", "#3498db");
      el.style.setProperty("--secondary-color", "#2c3e50");
      el.style.setProperty("--success-color", "#2ecc71");
      el.style.setProperty("--light-color", "#ecf0f1");
    }

    return () => {
      document.body.style.fontFamily = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.backgroundColor = "";
      document.body.style.textAlign = "";

      if (el) {
        el.style.removeProperty("--primary-color");
        el.style.removeProperty("--secondary-color");
        el.style.removeProperty("--success-color");
        el.style.removeProperty("--light-color");
      }
    };
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles["success-card"]}>
          <div className={styles["success-icon"]}>
            <i className="fas fa-check-circle"></i>
          </div>
          <h1 className={styles["success-title"]}>
            Depósito Registrado com Sucesso!
          </h1>
          <p>
            Seu depósito está em análise e será processado dentro de 24 horas.
          </p>

          <div className={styles["transaction-details"]}>
            <div className={styles["detail-row"]}>
              <span className={styles["detail-label"]}>Valor:</span>
              <span className={styles["detail-value"]} id="displayAmount">
                15.000 Kz
              </span>
            </div>
            <div className={styles["detail-row"]}>
              <span className={styles["detail-label"]}>Método:</span>
              <span className={styles["detail-value"]} id="displayMethod">
                Transferência Bancária
              </span>
            </div>
            <div className={styles["detail-row"]}>
              <span className={styles["detail-label"]}>IBAN Depositante:</span>
              <span className={styles["detail-value"]} id="displayIban">
                AO06 0045 0000 1234 5678 9019 2
              </span>
            </div>
            <div className={styles["detail-row"]}>
              <span className={styles["detail-label"]}>Data/Hora:</span>
              <span className={styles["detail-value"]} id="displayDate">
                25/05/2023 14:30
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
            onClick={() => navigate("/")}
          >
            <i className="fas fa-home"></i> VOLTAR AO INÍCIO
          </button>
        </div>
      </div>

      <div className={styles["footer-nav"]}>
        <a
          onClick={() => navigate("/")}
          className={styles["nav-item"]}
          style={{ cursor: "pointer" }}
        >
          <i className="fas fa-home"></i>
          <span>Home</span>
        </a>
        <a
          onClick={() => navigate("/products")}
          className={styles["nav-item"]}
          style={{ cursor: "pointer" }}
        >
          <i className="fas fa-box"></i>
          <span>Produtos</span>
        </a>
        <a
          onClick={() => navigate("/teams")}
          className={styles["nav-item"]}
          style={{ cursor: "pointer" }}
        >
          <i className="fas fa-network-wired"></i>
          <span>Equipe</span>
        </a>
        <a
          onClick={() => navigate("/profile")}
          className={styles["nav-item"]}
          style={{ cursor: "pointer" }}
        >
          <i className="fas fa-user"></i>
          <span>Perfil</span>
        </a>
      </div>
    </>
  );
};

export default DepositSuccessPage;
