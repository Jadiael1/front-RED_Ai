import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./assets/css/DepositSuccess.module.css";
import { useAuth } from "../../../hooks/useAuth";
import {
  getTransaction,
  TTransactionData as TTransaction,
} from "../../../api/endpoints/transactions";

const DepositSuccessPage = () => {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState<TTransaction | null>(null);
  const { user } = useAuth();

  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const transactionId = state?.id ?? searchParams.get("id") ?? 0;
  const transactionData = state?.data ?? null;

  useEffect(() => {
    if (transactionData) {
      setTransaction(transactionData);
    } else {
      (async () => {
        const response = await getTransaction({ id: transactionId });
        const { data } = response;
        setTransaction(data);
      })();
    }
  }, [transactionData, transactionId]);

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

  function convertTimestampToLocal(timestampWithUnknownZone: string) {
    const timestampSeconds = parseInt(timestampWithUnknownZone.slice(0, -2));
    if (isNaN(timestampSeconds)) {
      return "Formato de timestamp inválido.";
    }
    const date = new Date(timestampSeconds * 1000);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString(undefined, options).replace(",", "");
  }

  function formatNumber(number: number) {
    return new Intl.NumberFormat("pt", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  }

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
                {formatNumber(Number(transaction?.amount))} Kz
              </span>
            </div>
            <div className={styles["detail-row"]}>
              <span className={styles["detail-label"]}>Método:</span>
              <span className={styles["detail-value"]} id="displayMethod">
                {transaction?.method == "transfer"
                  ? "Transferência Bancária"
                  : transaction?.method == "reference"
                  ? "Pagamento Via Referência"
                  : "Depósito em Dinheiro"}
              </span>
            </div>
            <div className={styles["detail-row"]}>
              <span className={styles["detail-label"]}>IBAN Depositante:</span>
              <span className={styles["detail-value"]} id="displayIban">
                {user?.iban}
              </span>
            </div>
            <div className={styles["detail-row"]}>
              <span className={styles["detail-label"]}>Data/Hora:</span>
              <span className={styles["detail-value"]} id="displayDate">
                {transaction?.created_at
                  ? convertTimestampToLocal(transaction?.created_at)
                  : null}
              </span>
            </div>
            <div className={styles["detail-row"]}>
              <span className={styles["detail-label"]}>Status:</span>
              <span
                className={`${styles["detail-value"]} ${styles["status-pending"]}`}
              >
                {transaction?.status}
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
