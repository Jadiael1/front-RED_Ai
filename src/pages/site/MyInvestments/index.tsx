import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./assets/css/MyInvestments.module.css";

const MyInvestmentsPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState("23:59:59");

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
      el.style.setProperty("--success-color", "#2ecc71");
      el.style.setProperty("--warning-color", "#f39c12");
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
        el.style.removeProperty("--success-color");
        el.style.removeProperty("--warning-color");
        el.style.removeProperty("--light-color");
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
      <div className={styles.container}>
        <div className={styles["investment-header"]}>
          <h1 className={styles["section-title"]} style={{ marginTop: 0 }}>
            MEUS INVESTIMENTOS
          </h1>
          <span style={{ fontSize: "14px", color: "#7f8c8d" }}>
            Saldo: <strong>0 Kz</strong>
          </span>
        </div>

        {/* <!-- Cronômetro de Renda Diária --> */}
        <div className={styles.countdown}>
          <div>Próxima renda em:</div>
          <div id="countdown-timer">{countdown}</div>
        </div>

        {activeInvestments &&
          activeInvestments.map((activeInvestment, index) => (
            <div key={index} className={styles["investment-card"]}>
              <div className={styles["investment-badge"]}>
                {activeInvestment.badge}
              </div>
              <div className={styles["investment-name"]}>
                {activeInvestment.name}
              </div>

              <div className={styles["investment-details"]}>
                <div className={styles["detail-item"]}>
                  <span className={styles["detail-label"]}>Investimento</span>
                  <span className={styles["detail-value"]}>
                    {activeInvestment.invested}
                  </span>
                </div>
                <div className={styles["detail-item"]}>
                  <span className={styles["detail-label"]}>Renda Diária</span>
                  <span className={styles["detail-value"]}>
                    {activeInvestment.daily}
                  </span>
                </div>
                <div className={styles["detail-item"]}>
                  <span className={styles["detail-label"]}>Duração</span>
                  <span className={styles["detail-value"]}>
                    {activeInvestment.duration}
                  </span>
                </div>
                <div className={styles["detail-item"]}>
                  <span className={styles["detail-label"]}>Dias Restantes</span>
                  <span className={styles["detail-value"]}>
                    {activeInvestment.remaining}
                  </span>
                </div>
              </div>

              <div className={styles["progress-container"]}>
                <div
                  className={styles["progress-bar"]}
                  style={{ width: activeInvestment.progress }}
                ></div>
              </div>
            </div>
          ))}

        {/* <!-- Seção de Investimentos Concluídos --> */}
        <h2 className={styles["section-title"]}>HISTÓRICO DE INVESTIMENTOS</h2>
        {completedInvestments &&
          completedInvestments.map((completedInvestment, index) => (
            <div
              key={index}
              className={styles["investment-card"]}
              style={{ opacity: "0.7" }}
            >
              <div
                className={styles["investment-badge"]}
                style={{ backgroundColor: "#7f8c8d" }}
              >
                Concluído
              </div>
              <div className={styles["investment-name"]}>
                {completedInvestment.name}
              </div>

              <div className={styles["investment-details"]}>
                <div className={styles["detail-item"]}>
                  <span className={styles["detail-label"]}>Investimento</span>
                  <span className={styles["detail-value"]}>
                    {completedInvestment.invested}
                  </span>
                </div>
                <div className={styles["detail-item"]}>
                  <span className={styles["detail-label"]}>
                    Rendimento Total
                  </span>
                  <span className={styles["detail-value"]}>
                    {completedInvestment.totalReturn}
                  </span>
                </div>
                <div className={styles["detail-item"]}>
                  <span className={styles["detail-label"]}>Período</span>
                  <span className={styles["detail-value"]}>
                    {completedInvestment.period}
                  </span>
                </div>
                <div className={styles["detail-item"]}>
                  <span className={styles["detail-label"]}>Status</span>
                  <span
                    className={styles["detail-value"]}
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
      <div className={styles["footer-nav"]}>
        <a
          onClick={() => navigate("/profile")}
          style={{ cursor: "pointer" }}
          className={styles["nav-item"]}
        >
          <i className={`fas fa-user ${styles.is}`}></i>
          <span>Perfil</span>
        </a>
      </div>
    </>
  );
};
export default MyInvestmentsPage;
