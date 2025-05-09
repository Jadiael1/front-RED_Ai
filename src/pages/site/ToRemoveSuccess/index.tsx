import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./assets/css/ToRemoveSuccess.module.css";
import { getTransaction, TTransactionData } from "../../../api/endpoints/transactions";
import { useAuth } from "../../../hooks/useAuth";

const ToRemoveSuccessPage = () => {
  const [transaction, setTransaction] = useState<TTransactionData | null>(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const transactionId = state?.data.id ?? searchParams.get("id") ?? 0;
  const transactionData: TTransactionData | null = state?.data ?? null;
  const { user } = useAuth();

  useEffect(() => {
    if (transactionData) {
      setTransaction(transactionData);
    } else {
      (async () => {
        const response = await getTransaction({ id: transactionId });
        const { data } = response;
        setTransaction(data as TTransactionData);
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
      el.style.setProperty("--warning-color", "#f39c12");
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
        el.style.removeProperty("--warning-color");
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
                RT2025-0{transaction?.id}0
              </span>
            </div>
            <div className={styles["detail-row"]}>
              <span className={styles["detail-label"]}>Valor Bruto:</span>
              <span className={styles["detail-value"]} id="grossAmount">
                {formatNumber(Number(transaction?.gross_value))} kz
              </span>
            </div>
            <div className={styles["detail-row"]}>
              <span className={styles["detail-label"]}>Taxa (10%):</span>
              <span className={styles["detail-value"]} id="feeAmount">
                {formatNumber(
                  Number(transaction?.gross_value) - Number(transaction?.amount)
                )}{" "}
                Kz
              </span>
            </div>
            <div className={styles["detail-row"]}>
              <span className={styles["detail-label"]}>Valor Líquido:</span>
              <span className={styles["detail-value"]} id="netAmount">
                {formatNumber(Number(transaction?.amount))} Kz
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
                {user?.iban}
              </span>
            </div>
            <div className={styles["detail-row"]}>
              <span className={styles["detail-label"]}>Data/Hora:</span>
              <span className={styles["detail-value"]} id="requestDate">
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
