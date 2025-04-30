import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import styles from "./assets/css/Profile.module.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

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
        <div className={styles["profile-header"]}>
          <img
            src="/assets/images/avatar.png"
            alt="Foto do Perfil"
            className={styles["profile-avatar"]}
          />
          <h1 className={styles["profile-name"]}>Nelo Designer</h1>
          <div className={styles["profile-id"]}>ID: REDAI123456</div>
        </div>

        <div className={styles["balance-cards"]}>
          <div className={styles["balance-card"]}>
            <div className={styles["balance-label"]}>SALDO PRINCIPAL</div>
            <div className={styles["balance-value"]}>AOA 0</div>
          </div>
          <div className={styles["balance-card"]}>
            <div className={styles["balance-label"]}>RETIRADA TOTAL</div>
            <div className={styles["balance-value"]}>AOA 0</div>
          </div>
        </div>

        <div className={styles["primary-actions"]}>
          <button
            className={styles["action-btn"]}
            onClick={() => {
              navigate("/deposit");
            }}
          >
            <i className="fas fa-money-bill-wave"></i>
            <span className={styles["action-label"]}>DEPÓSITO</span>
          </button>
          <button
            className={styles["action-btn"]}
            onClick={() => {
              /* ../secundarias/retirada.html */
            }}
          >
            <i className="fas fa-wallet"></i>
            <span className={styles["action-label"]}>RETIRADA</span>
          </button>
          <button
            className={styles["action-btn"]}
            onClick={() => {
              /* ../secundarias/suporte.html */
            }}
          >
            <i className="fas fa-headset"></i>
            <span className={styles["action-label"]}>SUPORTE</span>
          </button>
        </div>

        <h2 className={styles["section-title"]}>MINHAS FERRAMENTAS</h2>
        <div className={styles["tools-grid"]}>
          <div
            className={styles["tool-card"]}
            onClick={() => {
              navigate("/my-investments");
            }}
          >
            <div className={styles["tool-icon"]}>
              <i className="fas fa-chart-line"></i>
            </div>
            <div className={styles["tool-info"]}>
              <h3>MEUS INVESTIMENTOS</h3>
              <p>Acompanhe seus investimentos</p>
            </div>
          </div>
          <div
            className={styles["tool-card"]}
            onClick={() => {
              navigate("/transaction-history");
            }}
          >
            <div className={styles["tool-icon"]}>
              <i className="fas fa-file-invoice-dollar"></i>
            </div>
            <div className={styles["tool-info"]}>
              <h3>EXTRATOS</h3>
              <p>Histórico de transações</p>
            </div>
          </div>

          <div
            className={styles["tool-card"]}
            onClick={() => {
              navigate("/teams");
            }}
          >
            <div className={styles["tool-icon"]}>
              <i className="fas fa-gift"></i>
            </div>
            <div className={styles["tool-info"]}>
              <h3>BÔNUS</h3>
              <p>Promoções e recompensas</p>
            </div>
          </div>

          <div
            className={styles["tool-card"]}
            onClick={() => {
              navigate("/account-management");
            }}
          >
            <div className={styles["tool-icon"]}>
              <i className="fas fa-user-cog"></i>
            </div>
            <div className={styles["tool-info"]}>
              <h3>CONTA</h3>
              <p>Gerencie informações pessoais e segurança</p>
            </div>
          </div>
        </div>

        <h2 className={styles["section-title"]}>CONFIGURAÇÕES</h2>
        <div className={styles["menu-list"]}>
          <div
            className={styles["menu-item"]}
            onClick={() => {
              navigate("/about-us");
            }}
          >
            <i className="fas fa-info-circle"></i>
            <span className={styles["menu-label"]}>SOBRE NÓS</span>
            <i className={`fas fa-chevron-right ${styles["menu-arrow"]}`}></i>
          </div>
          <div
            className={styles["menu-item"]}
            onClick={() => {
              navigate("/support-center");
            }}
          >
            <i className="fas fa-question-circle"></i>
            <span className={styles["menu-label"]}>CENTRAL DE SUPORTE</span>
            <i className={`fas fa-chevron-right ${styles["menu-arrow"]}`}></i>
          </div>

          <div
            className={styles["menu-item"]}
            onClick={() => {
              navigate("/terms-and-conditions");
            }}
          >
            <i className="fas fa-file-contract"></i>
            <span className={styles["menu-label"]}>TERMOS & CONDIÇÕES</span>
            <i className={`fas fa-chevron-right ${styles["menu-arrow"]}`}></i>
          </div>
          <div
            className={styles["menu-item"]}
            onClick={() => {
              navigate("/privacy-policy");
            }}
          >
            <i className="fas fa-user-shield"></i>
            <span className={styles["menu-label"]}>POLITICA E PRIVACIDADE</span>
            <i className={`fas fa-chevron-right ${styles["menu-arrow"]}`}></i>
          </div>
        </div>

        <h2 className={styles["section-title"]}>APLICATIVO</h2>
        <div className={styles["menu-list"]}>
          <div
            className={styles["menu-item"]}
            onClick={() => {
              navigate("/download-app");
            }}
          >
            <i className="fas fa-download"></i>
            <span className={styles["menu-label"]}>DESCARREGAR APP</span>
            <i className={`fas fa-chevron-right ${styles["menu-arrow"]}`}></i>
          </div>
          <div className={styles["menu-item"]} onClick={() => logout()}>
            <i className="fas fa-sign-out-alt"></i>
            <span className={styles["menu-label"]}>SAIR</span>
            <i className={`fas fa-chevron-right ${styles["menu-arrow"]}`}></i>
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
          className={`${styles["nav-item"]} ${styles.active}`}
        >
          <i className="fas fa-user"></i>
          <span>Perfil</span>
        </a>
      </div>
    </>
  );
};
export default ProfilePage;
