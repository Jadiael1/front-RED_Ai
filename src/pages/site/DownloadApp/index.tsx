import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./assets/css/DownloadApp.module.css";

const DownloadAppPage = () => {
  const navigate = useNavigate();

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

  return (
    <>
      <div className={styles.container}>
        <div className={styles["download-section"]}>
          <img
            src="/assets/images/logod.png"
            alt="RED Ai App"
            className={styles["app-icon"]}
          />
          <h1></h1>
          <p>
            Baixe nosso aplicativo e gerencie seus investimentos de qualquer
            lugar
          </p>

          <div className={styles["download-buttons"]}>
            <a
              href="https://play.google.com/store/apps/details?id=ao.redai"
              className={styles["download-btn"]}
            >
              <i className="fab fa-google-play"></i>
              <span>Google Play</span>
            </a>

            <a
              href="https://apps.apple.com/ao/app/red-ai/id123456789"
              className={styles["download-btn"]}
            >
              <i className="fab fa-apple"></i>
              <span>App Store</span>
            </a>

            <a href="download/redai-app.apk" className={styles["download-btn"]}>
              <i className="fas fa-download"></i>
              <span>APK Directo</span>
            </a>
          </div>

          <div className={styles["qr-code"]}>
            <img
              src="/assets/images/qrcode_placeholder.png"
              alt="QR Code"
              width="200"
            />
            <p>Aponte a câmera, faz o scan para baixar</p>
          </div>

          <div className={styles.features}>
            <div className={styles["feature-card"]}>
              <i className="fas fa-bolt"></i>
              <h3>Rápido</h3>
              <p>Operações em poucos segundos</p>
            </div>

            <div className={styles["feature-card"]}>
              <i className="fas fa-shield-alt"></i>
              <h3>Seguro</h3>
              <p>Proteção bancária avançada</p>
            </div>

            <div className={styles["feature-card"]}>
              <i className="fas fa-sync-alt"></i>
              <h3>Atualizado</h3>
              <p>Rendimentos em tempo real</p>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Menu de navegação inferior --> */}
      <div className={styles["footer-nav"]}>
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
export default DownloadAppPage;
