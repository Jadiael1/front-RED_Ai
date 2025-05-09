import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./assets/css/ToRemove.module.css";
import AlertDiv from "../../../components/Alert";
import { useAuth } from "../../../hooks/useAuth";
import { withdrawal } from "../../../api/endpoints/withdrawal";

const ToRemovePage = () => {
  const navigate = useNavigate();
  const [amountToBeWithdrawn, setAmountToBeWithdrawn] = useState<number>(0);
  const [netAmountToBeWithdrawn, setNetAmountToBeWithdrawn] =
    useState<number>(0);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertLink, setAlertLink] = useState<string | undefined>();
  const [alertLinkMessage, setAlertLinkMessage] = useState<
    string | undefined
  >();
  const [alertType, setAlertType] = useState<
    "success" | "warning" | "error" | null
  >(null);
  const [submitButtonStatus, setSubmitButtonStatus] = useState<boolean>(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.iban) {
      setSubmitButtonStatus(true);
      setAlertType("warning");
      setAlertMessage(
        "Antes de solicitar retirada, defina seu iban valido em seu"
      );
      setAlertLink("/account-management");
      setAlertLinkMessage("perfil.");
    }
  }, [user?.iban]);

  useEffect(() => {
    document.body.style.fontFamily =
      "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    document.body.style.margin = "0";
    document.body.style.padding = "0 0 80px 0";
    document.body.style.backgroundColor = "#f5f7fa";

    const el = document.body;
    if (el) {
      el.style.setProperty("--primary-color", "#3498db");
      el.style.setProperty("--secondary-color", "#2c3e50");
      el.style.setProperty("--accent-color", "#e74c3c");
      el.style.setProperty("--success-color", "#2ecc71");
      el.style.setProperty("--light-color", "#ecf0f1");
    }

    return () => {
      document.body.style.fontFamily = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.backgroundColor = "";

      if (el) {
        el.style.removeProperty("--primary-color");
        el.style.removeProperty("--secondary-color");
        el.style.removeProperty("--accent-color");
        el.style.removeProperty("--success-color");
        el.style.removeProperty("--light-color");
      }
    };
  }, []);

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

  const handleChangeAmount = async (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(evt.currentTarget.value);
    setAmountToBeWithdrawn(Number(value));
    const netValue = value - value * 0.1;
    setNetAmountToBeWithdrawn(netValue);
  };

  const submitPayment = async () => {
    const response = await withdrawal({ amount: amountToBeWithdrawn });
    if (response.status === "success") {
      showAlert("success", "Solicitação para saque realizada com sucesso.");
      setTimeout(() => {
        navigate(
          `/removed-success?amount=${amountToBeWithdrawn}&netAmount=${netAmountToBeWithdrawn}`,
          {
            state: {
              amount: amountToBeWithdrawn,
              netAmount: netAmountToBeWithdrawn,
              data: response.data,
            },
          }
        );
      }, 900);
      return;
    }

    if (
      response.status === "error" &&
      response.message ===
        "Withdrawal requests are allowed only between 9:00 and 21:00."
    ) {
      showAlert(
        "warning",
        "Solicitações de retirada são permitidas somente entre 9:00 e 21:00."
      );
      return;
    }

    if (
      response.status === "error" &&
      response.message === "You have already requested a withdrawal today."
    ) {
      showAlert(
        "warning",
        "Você já solicitou um saque hoje. Apenas uma solicitação por dia é permitida."
      );
      return;
    }

    if (
      response.status === "error" &&
      response.message === "Validation error." &&
      response.errors &&
      response.errors["amount"][0] === "validation.min.numeric"
    ) {
      showAlert("warning", "Você deve sacar um valor minimo de 2.500 Kz");
      return;
    }

    if (
      response.status === "error" &&
      response.message === "Validation error." &&
      response.errors &&
      response.errors["amount"][0] === "validation.max.numeric"
    ) {
      showAlert("warning", "Valor maximo para saque é de 500.000 Kz");
      return;
    }

    if (response.status === "error") {
      showAlert(
        "error",
        "Erro interno, tente realizar saque novamente outra hora."
      );
      return;
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles["withdrawal-card"]}>
          <h1 className={styles["section-title"]}>Solicitar Retirada</h1>

          {alertType && alertMessage && (
            <AlertDiv
              type={alertType}
              message={alertMessage}
              link={alertLink}
              linkMessage={alertLinkMessage}
            />
          )}

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>Valor a Retirar (Kz)</label>
            <input
              type="number"
              className={styles["form-input"]}
              id="withdrawalAmount"
              placeholder="Entre 2.500 e 500.000"
              min="2500"
              max="500000"
              value={amountToBeWithdrawn}
              onChange={handleChangeAmount}
            />
            <div className={styles["form-note"]}>
              Valor mínimo: 2.500 Kz | Valor máximo: 500.000 Kz | Taxa: 10%
            </div>
          </div>

          {/* <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>
              Método de Recebimento
            </label>
            <select className={styles["form-input"]} id="paymentMethod">
              <option value="iban">Transferência Bancária (IBAN)</option>
              <option value="mbway">Transfência Express</option>
            </select>
          </div> */}

          {/* <div className={styles["form-group"]} id="ibanField">
            <label className={styles["form-label"]}>IBAN da Conta</label>
            <input
              type="text"
              className={styles["form-input"]}
              id="iban"
              placeholder="AO06 0045 0000 1234 5678 9019 2"
              maxLength={21}
            />
            <div className={styles["form-note"]}>
              Deve conter exatamente 21 dígitos
            </div>
          </div> */}

          {/* <div
            className={styles["form-group"]}
            id="mbwayField"
            style={{ display: "none" }}
          >
            <label className={styles["form-label"]}>Número de Telefone</label>
            <input
              type="tel"
              className={styles["form-input"]}
              id="mbwayNumber"
              placeholder="923 456 789"
              maxLength={9}
            />
          </div> */}

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>
              Valor Líquido a Receber
            </label>
            <input
              type="text"
              className={styles["form-input"]}
              id="netAmount"
              readOnly
              style={{
                backgroundColor: "var(--light-color)",
                fontWeight: "bold",
              }}
              value={netAmountToBeWithdrawn}
              disabled={submitButtonStatus}
            />
          </div>

          <button
            className={styles["submit-btn"]}
            id="submitBtn"
            disabled={submitButtonStatus}
            onClick={() => {
              submitPayment();
            }}
          >
            SOLICITAR RETIRADA
          </button>

          <div
            style={{
              textAlign: "center",
              marginTop: "15px",
              fontSize: "12px",
              color: "#7f8c8d",
            }}
          >
            <i className="fas fa-clock"></i> Processamento apenas de Segunda a
            Sábado (9:00-21:00)
          </div>
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

export default ToRemovePage;
