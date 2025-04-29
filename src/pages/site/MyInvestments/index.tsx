import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyInvestmentsPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState("23:59:59");

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/assets/css/myinvestments.css";
    link.id = "myinvestments-page-style";
    document.head.appendChild(link);

    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href = "/assets/fontawesome/css/all.min.css";
    link2.id = "fontawesome-page-style";
    document.head.appendChild(link2);

    return () => {
      const existingLink = document.getElementById("myinvestments-page-style");
      if (existingLink) {
        existingLink.remove();
      }
      const existingLink2 = document.getElementById("fontawesome-page-style");
      if (existingLink2) {
        existingLink2.remove();
      }
    };
  }, []);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const hours = 23 - now.getHours();
      const minutes = 59 - now.getMinutes();
      const seconds = 59 - now.getSeconds();
      setCountdown(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const activeInvestments = [
    {
      badge: "VIP 1",
      name: "Plano Inicial",
      invested: "5.000 Kz",
      daily: "500 Kz",
      duration: "30 dias",
      remaining: "15",
      progress: "50%",
    },
    {
      badge: "VIP 2",
      name: "Plano Intermediário",
      invested: "15.000 Kz",
      daily: "1.500 Kz",
      duration: "30 dias",
      remaining: "22",
      progress: "26.67%",
    },
  ];

  const completedInvestments = [
    {
      badge: "Concluído",
      name: "Plano Básico",
      invested: "5.000 Kz",
      totalReturn: "15.000 Kz",
      period: "01/05 - 30/05/2023",
      status: "Concluído",
    },
  ];

  return (
    <>
      <div className="container">
        <div className="investment-header">
          <h1 className="section-title" style={{ marginTop: 0 }}>
            MEUS INVESTIMENTOS
          </h1>
          <span style={{ fontSize: "14px", color: "#7f8c8d" }}>
            Saldo: <strong>0 Kz</strong>
          </span>
        </div>

        {/* <!-- Cronômetro de Renda Diária --> */}
        <div className="countdown">
          <div>Próxima renda em:</div>
          <div id="countdown-timer">{countdown}</div>
        </div>

        {activeInvestments &&
          activeInvestments.map((activeInvestment) => (
            <div className="investment-card">
              <div className="investment-badge">{activeInvestment.badge}</div>
              <div className="investment-name">{activeInvestment.name}</div>

              <div className="investment-details">
                <div className="detail-item">
                  <span className="detail-label">Investimento</span>
                  <span className="detail-value">
                    {activeInvestment.invested}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Renda Diária</span>
                  <span className="detail-value">{activeInvestment.daily}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Duração</span>
                  <span className="detail-value">
                    {activeInvestment.duration}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Dias Restantes</span>
                  <span className="detail-value">
                    {activeInvestment.remaining}
                  </span>
                </div>
              </div>

              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ width: activeInvestment.progress }}
                ></div>
              </div>
            </div>
          ))}

        {/* <!-- Seção de Investimentos Concluídos --> */}
        <h2 className="section-title">HISTÓRICO DE INVESTIMENTOS</h2>
        {completedInvestments &&
          completedInvestments.map((completedInvestment) => (
            <div className="investment-card" style={{ opacity: "0.7" }}>
              <div
                className="investment-badge"
                style={{ backgroundColor: "#7f8c8d" }}
              >
                Concluído
              </div>
              <div className="investment-name">{completedInvestment.name}</div>

              <div className="investment-details">
                <div className="detail-item">
                  <span className="detail-label">Investimento</span>
                  <span className="detail-value">
                    {completedInvestment.invested}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Rendimento Total</span>
                  <span className="detail-value">
                    {completedInvestment.totalReturn}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Período</span>
                  <span className="detail-value">
                    {completedInvestment.period}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status</span>
                  <span
                    className="detail-value"
                    style={{ color: "var(--success-color)" }}
                  >
                    {completedInvestment.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* <!-- Menu inferior --> */}
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
export default MyInvestmentsPage;
