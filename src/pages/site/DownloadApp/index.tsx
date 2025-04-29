import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DownloadAppPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/assets/css/downloadapp.css";
    link.id = "downloadapp-page-style";
    document.head.appendChild(link);

    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href = "/assets/fontawesome/css/all.min.css";
    link2.id = "fontawesome-page-style";
    document.head.appendChild(link2);

    return () => {
      const existingLink = document.getElementById("downloadapp-page-style");
      if (existingLink) {
        existingLink.remove();
      }
      const existingLink2 = document.getElementById("fontawesome-page-style");
      if (existingLink2) {
        existingLink2.remove();
      }
    };
  }, []);

  return (
    <>
      <div className="container">
        <div className="download-section">
          <img
            src="/assets/images/logod.png"
            alt="RED Ai App"
            className="app-icon"
          />
          <h1></h1>
          <p>
            Baixe nosso aplicativo e gerencie seus investimentos de qualquer
            lugar
          </p>

          <div className="download-buttons">
            <a
              href="https://play.google.com/store/apps/details?id=ao.redai"
              className="download-btn"
            >
              <i className="fab fa-google-play"></i>
              <span>Google Play</span>
            </a>

            <a
              href="https://apps.apple.com/ao/app/red-ai/id123456789"
              className="download-btn"
            >
              <i className="fab fa-apple"></i>
              <span>App Store</span>
            </a>

            <a href="download/redai-app.apk" className="download-btn">
              <i className="fas fa-download"></i>
              <span>APK Directo</span>
            </a>
          </div>

          <div className="qr-code">
            <img
              src="/assets/images/qrcode_placeholder.png"
              alt="QR Code"
              width="200"
            />
            <p>Aponte a câmera, faz o scan para baixar</p>
          </div>

          <div className="features">
            <div className="feature-card">
              <i className="fas fa-bolt"></i>
              <h3>Rápido</h3>
              <p>Operações em poucos segundos</p>
            </div>

            <div className="feature-card">
              <i className="fas fa-shield-alt"></i>
              <h3>Seguro</h3>
              <p>Proteção bancária avançada</p>
            </div>

            <div className="feature-card">
              <i className="fas fa-sync-alt"></i>
              <h3>Atualizado</h3>
              <p>Rendimentos em tempo real</p>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Menu de navegação inferior --> */}
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
export default DownloadAppPage;
