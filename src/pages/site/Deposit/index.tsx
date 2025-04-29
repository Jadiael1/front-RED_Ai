import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DepositPage = () => {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState<number | string | null>(
    null
  );

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/assets/css/deposit.css";
    link.id = "deposit-page-style";
    document.head.appendChild(link);

    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href = "/assets/fontawesome/css/all.min.css";
    link2.id = "fontawesome-page-style";
    document.head.appendChild(link2);

    return () => {
      const existingLink = document.getElementById("deposit-page-style");
      if (existingLink) {
        existingLink.remove();
      }
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
      <div className="container">
        <h1 style={{ textAlign: "center", color: "var(--secondary-color)" }}>
          Selecione o Valor do Depósito
        </h1>

        <div className="package-grid">
          {/* <!-- Pacotes de depósito (valores do manifesto) --> */}
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`package-card ${
                selectedAmount === pkg ? "active" : ""
              }`}
              onClick={() => selectPackage(pkg)}
            >
              <div className="package-value">
                {pkg === "custom"
                  ? "Outro valor"
                  : `${pkg.toLocaleString()} Kz`}
              </div>
            </div>
          ))}
        </div>

        <button
          className="next-btn"
          id="nextBtn"
          onClick={() => goToPayment()}
        >
          PRÓXIMO PASSO <i className="fas fa-arrow-right"></i>
        </button>
      </div>

      {/* <!-- Menu inferior --> */}
      <div className="footer-nav">
        <a
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
          className="nav-item"
        >
          <i className="fas fa-home"></i>
          <span>Home</span>
        </a>
        <a
          onClick={() => navigate("/products")}
          style={{ cursor: "pointer" }}
          className="nav-item"
        >
          <i className="fas fa-box"></i>
          <span>Produtos</span>
        </a>
        <a
          onClick={() => navigate("/teams")}
          style={{ cursor: "pointer" }}
          className="nav-item"
        >
          <i className="fas fa-network-wired"></i>
          <span>Equipe</span>
        </a>
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
export default DepositPage;
