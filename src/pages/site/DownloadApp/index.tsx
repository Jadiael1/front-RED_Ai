import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./assets/css/DownloadApp.module.css";
import logod from "../../../assets/images/logod.png";
import qrcodePlaceHolder from "../../../assets/images/qrcode_placeholder.png";

const DownloadAppPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.fontFamily =
      "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    document.body.style.margin = "0";
    document.body.style.padding = "0 0 80px 0";
    document.body.style.backgroundColor = "#f5f7fa";
    document.body.style.color = "#333";
    document.body.style.lineHeight = "1.6";

    const el = document.body;
    if (el) {
      el.style.setProperty("--primary-color", "#3498db");
      el.style.setProperty("--secondary-color", "#2c3e50");
      el.style.setProperty("--light-color", "#ecf0f1");
    }

    return () => {
      document.body.style.fontFamily = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
      document.body.style.lineHeight = "";

      if (el) {
        el.style.removeProperty("--primary-color");
        el.style.removeProperty("--secondary-color");
        el.style.removeProperty("--light-color");
      }
    };
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles["download-section"]}>
          <img src={logod} alt="RED Ai App" className={styles["app-icon"]} />
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
              <i className={`fab fa-google-play ${styles.is}`}></i>
              <span>Google Play</span>
            </a>

            <a
              href="https://apps.apple.com/ao/app/red-ai/id123456789"
              className={styles["download-btn"]}
            >
              <i className={`fab fa-apple ${styles.is}`}></i>
              <span>App Store</span>
            </a>

            <a href="download/redai-app.apk" className={styles["download-btn"]}>
              <i className={`fas fa-download ${styles.is}`}></i>
              <span>APK Directo</span>
            </a>
          </div>

          <div className={styles["qr-code"]}>
            <img src={qrcodePlaceHolder} alt="QR Code" width="200" />
            <p>Aponte a câmera, faz o scan para baixar</p>
          </div>

          <div className={styles.features}>
            <div className={styles["feature-card"]}>
              <i className={`fas fa-bolt ${styles.is}`}></i>
              <h3>Rápido</h3>
              <p>Operações em poucos segundos</p>
            </div>

            <div className={styles["feature-card"]}>
              <i className={`fas fa-shield-alt ${styles.is}`}></i>
              <h3>Seguro</h3>
              <p>Proteção bancária avançada</p>
            </div>

            <div className={styles["feature-card"]}>
              <i className={`fas fa-sync-alt ${styles.is}`}></i>
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
          <i className={`fas fa-user ${styles.is}`}></i>
          <span>Perfil</span>
        </a>
      </div>
    </>
  );
};
export default DownloadAppPage;
