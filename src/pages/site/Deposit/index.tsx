import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./assets/css/Deposit.module.css";

const DepositPage = () => {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState<number | string | null>(
    null
  );

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

  const selectPackage = (value: number | string) => {
    setSelectedAmount(value);
  };

  const goToPayment = () => {
    if (selectedAmount !== null) {
      navigate("/payment", {
        state: { amount: selectedAmount },
      });
    }
  };

  const packages = [5000, 15000, 30000, 75000, 150000, "custom"];
  return (
    <>
      <div className={styles.container}>
        <h1 style={{ textAlign: "center", color: "var(--secondary-color)" }}>
          Selecione o Valor do Depósito
        </h1>

        <div className={styles["package-grid"]}>
          {/* <!-- Pacotes de depósito (valores do manifesto) --> */}
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`${styles["package-card"]} ${
                selectedAmount === pkg ? styles.active : ""
              }`}
              onClick={() => selectPackage(pkg)}
            >
              <div className={styles["package-value"]}>
                {pkg === "custom"
                  ? "Outro valor"
                  : `${pkg.toLocaleString()} Kz`}
              </div>
            </div>
          ))}
        </div>

        <button
          className={styles["next-btn"]}
          id="nextBtn"
          onClick={() => goToPayment()}
        >
          PRÓXIMO PASSO <i className="fas fa-arrow-right"></i>
        </button>
      </div>

      {/* <!-- Menu inferior --> */}
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
export default DepositPage;
