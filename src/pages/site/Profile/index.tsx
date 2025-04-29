import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/assets/css/profilePage.css";
    link.id = "profile-page-style";
    document.head.appendChild(link);

    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href = "/assets/fontawesome/css/all.min.css";
    link2.id = "fontawesome-page-style";
    document.head.appendChild(link2);

    return () => {
      const existingLink = document.getElementById("profile-page-style");
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
        <div className="profile-header">
          <img
            src="/assets/images/avatar.png"
            alt="Foto do Perfil"
            className="profile-avatar"
          />
          <h1 className="profile-name">Nelo Designer</h1>
          <div className="profile-id">ID: REDAI123456</div>
        </div>

        <div className="balance-cards">
          <div className="balance-card">
            <div className="balance-label">SALDO PRINCIPAL</div>
            <div className="balance-value">AOA 0</div>
          </div>
          <div className="balance-card">
            <div className="balance-label">RETIRADA TOTAL</div>
            <div className="balance-value">AOA 0</div>
          </div>
        </div>

        <div className="primary-actions">
          <button
            className="action-btn"
            onClick={() => {
              navigate("/deposit");
            }}
          >
            <i className="fas fa-money-bill-wave"></i>
            <span className="action-label">DEPÓSITO</span>
          </button>
          <button
            className="action-btn"
            onClick={() => {
              /* ../secundarias/retirada.html */
            }}
          >
            <i className="fas fa-wallet"></i>
            <span className="action-label">RETIRADA</span>
          </button>
          <button
            className="action-btn"
            onClick={() => {
              /* ../secundarias/suporte.html */
            }}
          >
            <i className="fas fa-headset"></i>
            <span className="action-label">SUPORTE</span>
          </button>
        </div>

        <h2 className="section-title">MINHAS FERRAMENTAS</h2>
        <div className="tools-grid">
          <div
            className="tool-card"
            onClick={() => {
              navigate("/my-investments");
            }}
          >
            <div className="tool-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="tool-info">
              <h3>MEUS INVESTIMENTOS</h3>
              <p>Acompanhe seus investimentos</p>
            </div>
          </div>
          <div
            className="tool-card"
            onClick={() => {
              navigate("/transaction-history");
            }}
          >
            <div className="tool-icon">
              <i className="fas fa-file-invoice-dollar"></i>
            </div>
            <div className="tool-info">
              <h3>EXTRATOS</h3>
              <p>Histórico de transações</p>
            </div>
          </div>

          <div
            className="tool-card"
            onClick={() => {
              navigate("/teams");
            }}
          >
            <div className="tool-icon">
              <i className="fas fa-gift"></i>
            </div>
            <div className="tool-info">
              <h3>BÔNUS</h3>
              <p>Promoções e recompensas</p>
            </div>
          </div>

          <div
            className="tool-card"
            onClick={() => {
              navigate("/account-management");
            }}
          >
            <div className="tool-icon">
              <i className="fas fa-user-cog"></i>
            </div>
            <div className="tool-info">
              <h3>CONTA</h3>
              <p>Gerencie informações pessoais e segurança</p>
            </div>
          </div>
        </div>

        <h2 className="section-title">CONFIGURAÇÕES</h2>
        <div className="menu-list">
          <div
            className="menu-item"
            onClick={() => {
              navigate("/about-us");
            }}
          >
            <i className="fas fa-info-circle"></i>
            <span className="menu-label">SOBRE NÓS</span>
            <i className="fas fa-chevron-right menu-arrow"></i>
          </div>
          <div
            className="menu-item"
            onClick={() => {
              navigate("/support-center");
            }}
          >
            <i className="fas fa-question-circle"></i>
            <span className="menu-label">CENTRAL DE SUPORTE</span>
            <i className="fas fa-chevron-right menu-arrow"></i>
          </div>

          <div
            className="menu-item"
            onClick={() => {
              navigate("/terms-and-conditions");
            }}
          >
            <i className="fas fa-file-contract"></i>
            <span className="menu-label">TERMOS & CONDIÇÕES</span>
            <i className="fas fa-chevron-right menu-arrow"></i>
          </div>
          <div
            className="menu-item"
            onClick={() => {
              navigate("/privacy-policy");
            }}
          >
            <i className="fas fa-user-shield"></i>
            <span className="menu-label">POLITICA E PRIVACIDADE</span>
            <i className="fas fa-chevron-right menu-arrow"></i>
          </div>
        </div>

        <h2 className="section-title">APLICATIVO</h2>
        <div className="menu-list">
          <div
            className="menu-item"
            onClick={() => {
              navigate("/download-app");
            }}
          >
            <i className="fas fa-download"></i>
            <span className="menu-label">DESCARREGAR APP</span>
            <i className="fas fa-chevron-right menu-arrow"></i>
          </div>
          <div className="menu-item" onClick={() => logout()}>
            <i className="fas fa-sign-out-alt"></i>
            <span className="menu-label">SAIR</span>
            <i className="fas fa-chevron-right menu-arrow"></i>
          </div>
        </div>
      </div>

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
          className="nav-item active"
        >
          <i className="fas fa-user"></i>
          <span>Perfil</span>
        </a>
      </div>
    </>
  );
};
export default ProfilePage;
