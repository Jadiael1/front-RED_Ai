import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import styles from "./assets/css/Profile.module.css";
import avatarPlaceHolder from "../../../assets/images/avatar_placeholder.png";
import {
  getTransactions,
  TTransactionData,
} from "../../../api/endpoints/transactions";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [totalWithdrawal, setTotalWithdrawal] = useState<number>(0);
  // const [transactions, setTransactions] = useState<TTransactionData[] | null>(null);

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
      el.style.setProperty("--accent-color", "#e74c3c");
      el.style.setProperty("--light-color", "#ecf0f1");
      el.style.setProperty("--dark-color", "#34495e");
      el.style.setProperty("--success-color", "#2ecc71");
      el.style.setProperty("--warning-color", "#f39c12");
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
        el.style.removeProperty("--accent-color");
        el.style.removeProperty("--light-color");
        el.style.removeProperty("--dark-color");
        el.style.removeProperty("--success-color");
        el.style.removeProperty("--warning-color");
      }
    };
  }, []);

  useEffect(() => {
    (async () => {
      const response = await getTransactions({
        perPage: 99999,
        sortBy: "created_at",
        sortOrder: "desc",
        status: "approved",
        type: "withdrawal",
      });
      const totalAmount = response.data.data
        .map((transaction: TTransactionData) => {
          const amount = Number(transaction.amount);
          const originalAmount = amount / 0.9;
          return parseFloat(originalAmount.toFixed(2));
        })
        .reduce(
          (accumulator: number, currentValue: number) =>
            accumulator + currentValue,
          0
        );
      setTotalWithdrawal(totalAmount);
    })();
  }, []);

  function extractInviteCode(url: string) {
    // Encontra a última ocorrência de '/' na URL
    const lastSlashIndex = url.lastIndexOf("/");

    // Se uma barra for encontrada, extrai a substring após ela
    if (lastSlashIndex !== -1) {
      return url.substring(lastSlashIndex + 1);
    } else {
      // Se não houver barra, retorna a URL original (ou você pode tratar de outra forma)
      return url;
    }
  }

  function formatNumber(number: number) {
    return new Intl.NumberFormat("pt", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles["profile-header"]}>
          <img
            src={avatarPlaceHolder}
            alt="Foto do Perfil"
            className={styles["profile-avatar"]}
          />
          <h1 className={styles["profile-name"]}>{user?.name}</h1>
          <div className={styles["profile-id"]}>
            ID:{" "}
            {user?.invite_code
              ? extractInviteCode(user?.invite_code as string)
              : 0}
          </div>
        </div>

        <div className={styles["balance-cards"]}>
          <div className={styles["balance-card"]}>
            <div className={styles["balance-label"]}>SALDO PRINCIPAL</div>
            <div className={styles["balance-value"]}>
              AOA {formatNumber(Number(user?.wallet?.balance as string))}
            </div>
          </div>
          <div className={styles["balance-card"]}>
            <div className={styles["balance-label"]}>RETIRADA TOTAL</div>
            <div className={styles["balance-value"]}>
              AOA {formatNumber(totalWithdrawal)}
            </div>
          </div>
        </div>

        <div className={styles["primary-actions"]}>
          <button
            className={styles["action-btn"]}
            onClick={() => {
              navigate("/deposit");
            }}
          >
            <i className={`fas fa-money-bill-wave ${styles.is}`}></i>
            <span className={styles["action-label"]}>DEPÓSITO</span>
          </button>
          <button
            className={styles["action-btn"]}
            onClick={() => {
              navigate("/remove");
            }}
          >
            <i className={`fas fa-wallet ${styles.is}`}></i>
            <span className={styles["action-label"]}>RETIRADA</span>
          </button>
          <button
            className={styles["action-btn"]}
            onClick={() => {
              navigate("/support-center");
            }}
          >
            <i className={`fas fa-headset ${styles.is}`}></i>
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
              <i className={`fas fa-chart-line ${styles.is}`}></i>
            </div>
            <div className={styles["tool-info"]}>
              <h3 className={styles.h3s}>MEUS INVESTIMENTOS</h3>
              <p className={styles.ps}>Acompanhe seus investimentos</p>
            </div>
          </div>
          <div
            className={styles["tool-card"]}
            onClick={() => {
              navigate("/transaction-history");
            }}
          >
            <div className={styles["tool-icon"]}>
              <i className={`fas fa-file-invoice-dollar ${styles.is}`}></i>
            </div>
            <div className={styles["tool-info"]}>
              <h3 className={styles.h3s}>EXTRATOS</h3>
              <p className={styles.ps}>Histórico de transações</p>
            </div>
          </div>

          <div
            className={styles["tool-card"]}
            onClick={() => {
              navigate("/teams");
            }}
          >
            <div className={styles["tool-icon"]}>
              <i className={`fas fa-gift ${styles.is}`}></i>
            </div>
            <div className={styles["tool-info"]}>
              <h3 className={styles.h3s}>BÔNUS</h3>
              <p className={styles.ps}>Promoções e recompensas</p>
            </div>
          </div>

          <div
            className={styles["tool-card"]}
            onClick={() => {
              navigate("/account-management");
            }}
          >
            <div className={styles["tool-icon"]}>
              <i className={`fas fa-user-cog ${styles.is}`}></i>
            </div>
            <div className={styles["tool-info"]}>
              <h3 className={styles.h3s}>CONTA</h3>
              <p className={styles.ps}>
                Gerencie informações pessoais e segurança
              </p>
            </div>
          </div>
          {user?.is_admin && (
            <div
              className={styles["tool-card"]}
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              <div className={styles["tool-icon"]}>
                <i className={`fas fa-tools ${styles.is}`}></i>
              </div>
              <div className={styles["tool-info"]}>
                <h3 className={styles.h3s}>DASHBOARD</h3>
                <p className={styles.ps}>Gerencie o sistema</p>
              </div>
            </div>
          )}
        </div>

        <h2 className={styles["section-title"]}>CONFIGURAÇÕES</h2>
        <div className={styles["menu-list"]}>
          <div
            className={styles["menu-item"]}
            onClick={() => {
              navigate("/about-us");
            }}
          >
            <i className={`fas fa-info-circle ${styles.is}`}></i>
            <span className={styles["menu-label"]}>SOBRE NÓS</span>
            <i
              className={`fas fa-chevron-right ${styles["menu-arrow"]} ${styles.is}`}
            ></i>
          </div>
          <div
            className={styles["menu-item"]}
            onClick={() => {
              navigate("/support-center");
            }}
          >
            <i className={`fas fa-question-circle ${styles.is}`}></i>
            <span className={styles["menu-label"]}>CENTRAL DE SUPORTE</span>
            <i
              className={`fas fa-chevron-right ${styles["menu-arrow"]} ${styles.is}`}
            ></i>
          </div>

          <div
            className={styles["menu-item"]}
            onClick={() => {
              navigate("/terms-and-conditions");
            }}
          >
            <i className={`fas fa-file-contract ${styles.is}`}></i>
            <span className={styles["menu-label"]}>TERMOS & CONDIÇÕES</span>
            <i
              className={`fas fa-chevron-right ${styles["menu-arrow"]} ${styles.is}`}
            ></i>
          </div>
          <div
            className={styles["menu-item"]}
            onClick={() => {
              navigate("/privacy-policy");
            }}
          >
            <i className={`fas fa-user-shield ${styles.is}`}></i>
            <span className={styles["menu-label"]}>POLITICA E PRIVACIDADE</span>
            <i
              className={`fas fa-chevron-right ${styles["menu-arrow"]} ${styles.is}`}
            ></i>
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
            <i className={`fas fa-download ${styles.is}`}></i>
            <span className={styles["menu-label"]}>DESCARREGAR APP</span>
            <i
              className={`fas fa-chevron-right ${styles["menu-arrow"]} ${styles.is}`}
            ></i>
          </div>
          <div className={styles["menu-item"]} onClick={() => logout()}>
            <i className={`fas fa-sign-out-alt ${styles.is}`}></i>
            <span className={styles["menu-label"]}>SAIR</span>
            <i
              className={`fas fa-chevron-right ${styles["menu-arrow"]} ${styles.is}`}
            ></i>
          </div>
        </div>
      </div>

      <div className={styles["footer-nav"]}>
        <a
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
          className={styles["nav-item"]}
        >
          <i className={`fas fa-home ${styles.is}`}></i>
          <span>Home</span>
        </a>
        <a
          onClick={() => navigate("/products")}
          style={{ cursor: "pointer" }}
          className={styles["nav-item"]}
        >
          <i className={`fas fa-box ${styles.is}`}></i>
          <span>Produtos</span>
        </a>
        <a
          onClick={() => navigate("/teams")}
          style={{ cursor: "pointer" }}
          className={styles["nav-item"]}
        >
          <i className={`fas fa-network-wired ${styles.is}`}></i>
          <span>Equipe</span>
        </a>
        <a
          onClick={() => navigate("/profile")}
          style={{ cursor: "pointer" }}
          className={`${styles["nav-item"]} ${styles.active}`}
        >
          <i className={`fas fa-user ${styles.is}`}></i>
          <span>Perfil</span>
        </a>
      </div>
    </>
  );
};
export default ProfilePage;
