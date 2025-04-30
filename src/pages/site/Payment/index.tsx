import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./assets/css/Payment.module.css";

interface Reference {
  ref: string;
  account: string;
  validUntil: string;
}

const referenceList: Reference[] = [
  {
    ref: "REF001",
    account: "AO06 0045 0000 1111 1111 1111 1",
    validUntil: "12:00",
  },
  {
    ref: "REF002",
    account: "AO06 0045 0000 2222 2222 2222 2",
    validUntil: "13:00",
  },
  {
    ref: "REF003",
    account: "AO06 0045 0000 3333 3333 3333 3",
    validUntil: "14:00",
  },
  {
    ref: "REF004",
    account: "AO06 0045 0000 4444 4444 4444 4",
    validUntil: "15:00",
  },
  {
    ref: "REF005",
    account: "AO06 0045 0000 5555 5555 5555 5",
    validUntil: "16:00",
  },
  {
    ref: "REF006",
    account: "AO06 0045 0000 6666 6666 6666 6",
    validUntil: "17:00",
  },
  {
    ref: "REF007",
    account: "AO06 0045 0000 7777 7777 7777 7",
    validUntil: "18:00",
  },
  {
    ref: "REF008",
    account: "AO06 0045 0000 8888 8888 8888 8",
    validUntil: "19:00",
  },
  {
    ref: "REF009",
    account: "AO06 0045 0000 9999 9999 9999 9",
    validUntil: "20:00",
  },
  {
    ref: "REF010",
    account: "AO06 0045 0000 0000 0000 0000 0",
    validUntil: "21:00",
  },
];

const PaymentPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const amount = state?.amount ?? "5.000";

  const [selectedMethod, setSelectedMethod] = useState("transferencia");
  const [file, setFile] = useState<File | null>(null);
  const [isWorkingHours, setIsWorkingHours] = useState(true);
  const [currentRef, setCurrentRef] = useState<Reference>(referenceList[0]);

  const getCurrentReference = (): Reference => {
    const hour = new Date().getHours();
    return (
      referenceList.find((ref) => hour < parseInt(ref.validUntil)) ||
      referenceList[referenceList.length - 1]
    );
  };

  useEffect(() => {
    document.body.style.fontFamily =
      "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    document.body.style.margin = "0";
    document.body.style.padding = "0 0 80px 0";
    document.body.style.backgroundColor = "#f5f7fa";

    return () => {
      document.body.style.fontFamily = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.backgroundColor = "";
    };
  }, []);

  useEffect(() => {
    const updateStatus = () => {
      const hour = new Date().getHours();
      setIsWorkingHours(hour >= 6 && hour < 21);
      setCurrentRef(getCurrentReference());
    };

    updateStatus();
    const interval = setInterval(updateStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) setFile(e.target.files[0]);
    else setFile(null);
  };

  const submitPayment = () => {
    alert(
      `Pagamento de ${amount} Kz via ${selectedMethod} enviado!\nReferência: ${currentRef.ref}`
    );
    navigate("/deposito-sucesso", { state: { amount, ref: currentRef.ref } });
  };

  const isSubmitEnabled = file && isWorkingHours;

  const renderMethodDetails = () => {
    if (!currentRef) return null;
    const infoStyle = { fontSize: "12px", color: "#7f8c8d", marginTop: "10px" };
    switch (selectedMethod) {
      case "transferencia":
        return (
          <>
            <div className={styles["reference-box"]}>
              <div className={styles["reference-item"]}>
                <span className={styles["reference-label"]}>Banco:</span> BAI
              </div>
              <div className={styles["reference-item"]}>
                <span className={styles["reference-label"]}>IBAN:</span>{" "}
                {currentRef.account}
              </div>
              <div className={styles["reference-item"]}>
                <span className={styles["reference-label"]}>Titular:</span> Nome
                da Conta
              </div>
              <div className={styles["reference-item"]}>
                <span className={styles["reference-label"]}>Válido até:</span>{" "}
                {currentRef.validUntil}
              </div>
            </div>
            <p style={infoStyle}>
              <i className="fas fa-info-circle"></i> Esta referência é válida
              apenas até o horário indicado
            </p>
          </>
        );
      case "mbway":
        return (
          <>
            <div className={styles["reference-box"]}>
              <div className={styles["reference-item"]}>
                <span className={styles["reference-label"]}>
                  Número MB Way:
                </span>{" "}
                923 456 789
              </div>
              <div className={styles["reference-item"]}>
                <span className={styles["reference-label"]}>Referência:</span>{" "}
                {currentRef.ref}
              </div>
              <div className={styles["reference-item"]}>
                <span className={styles["reference-label"]}>Válida até:</span>{" "}
                {currentRef.validUntil}
              </div>
            </div>
            <p style={infoStyle}>
              <i className="fas fa-info-circle"></i> Esta referência é válida
              apenas até o horário indicado
            </p>
          </>
        );
      case "dinheiro":
        return (
          <>
            <div className={styles["reference-box"]}>
              <div className={styles["reference-item"]}>
                <span className={styles["reference-label"]}>
                  Locais de depósito:
                </span>{" "}
                Agências Bancárias
              </div>
              <div className={styles["reference-item"]}>
                <span className={styles["reference-label"]}>
                  Número da conta:
                </span>{" "}
                {currentRef.account}
              </div>
              <div className={styles["reference-item"]}>
                <span className={styles["reference-label"]}>Titular:</span> Nome
                da Conta
              </div>
              <div className={styles["reference-item"]}>
                <span className={styles["reference-label"]}>Válida até:</span>{" "}
                {currentRef.validUntil}
              </div>
            </div>
            <p style={infoStyle}>
              <i className="fas fa-info-circle"></i> Esta referência é válida
              apenas até o horário indicado
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles["payment-card"]}>
          <h2 className={styles["section-title"]}>Método de Pagamento</h2>
          <div className={styles["method-grid"]}>
            {["transferencia", "mbway", "dinheiro"].map((method) => (
              <div
                key={method}
                className={`${styles["method-card"]} ${
                  selectedMethod === method ? styles.active : ""
                }`}
                onClick={() => setSelectedMethod(method)}
              >
                <div className={styles["method-icon"]}>
                  <i
                    className={`fas ${
                      method === "transferencia"
                        ? "fa-exchange-alt"
                        : method === "mbway"
                        ? "fa-mobile-alt"
                        : "fa-money-bill-wave"
                    }`}
                  ></i>
                </div>
                <div>
                  {method === "transferencia"
                    ? "Transferência Bancária"
                    : method === "mbway"
                    ? "Pagamento Via Referência"
                    : "Depósito em Dinheiro"}
                </div>
              </div>
            ))}
          </div>
          <div id="methodDetails">{renderMethodDetails()}</div>
        </div>

        <div className={styles["payment-card"]}>
          <h2 className={styles["section-title"]}>Enviar Comprovante</h2>
          <label htmlFor="fileInput">
            <div className={styles["upload-box"]}>
              <div className={styles["upload-icon"]}>
                <i className="fas fa-cloud-upload-alt"></i>
              </div>
              <div>Clique para enviar comprovante</div>
              <div style={{ fontSize: "12px", color: "#7f8c8d" }}>
                Formatos: JPG, PNG ou PDF (máx. 5MB)
              </div>
            </div>
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
          {file && (
            <div className={styles["file-preview"]}>
              <i className="fas fa-check-circle"></i>
              <span>{file.name}</span>
            </div>
          )}
          <div style={{ marginTop: 20, fontSize: 14 }}>
            <div>
              <strong>Valor selecionado:</strong>{" "}
              {amount === "custom" ? "Valor personalizado" : `${amount} Kz`}
            </div>
            <div style={{ color: "#7f8c8d", marginTop: 5 }}>
              <i className="fas fa-clock"></i> Processamento apenas das 6:00 às
              21:00
            </div>
          </div>
          <button
            className={styles["submit-btn"]}
            disabled={!isSubmitEnabled}
            onClick={submitPayment}
          >
            {isWorkingHours
              ? "CONFIRMAR PAGAMENTO"
              : "FORA DO HORÁRIO (6:00-21:00)"}
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

export default PaymentPage;
