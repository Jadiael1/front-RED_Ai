import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./assets/css/Teams.module.css";
import { useAuth } from "../../../hooks/useAuth";
import {
  getNetworkBonus,
  TNetworkBonus,
} from "../../../api/endpoints/networkBonus";
import {
  getProductsSummary,
  TProductsSummary,
} from "../../../api/endpoints/productsSummary";

const TeamsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [netWorkBonus, setNetWorkBonus] = useState<TNetworkBonus[] | null>(
    null
  );
  const [productSummary, setProductSummary] = useState<
    TProductsSummary[] | null
  >(null);

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
      // get network bonus
      const resp = await getNetworkBonus();
      setNetWorkBonus(resp.data);
      // get product summary
      const response = await getProductsSummary();
      setProductSummary(response.data);
    })();
  }, []);

  const formatLocalDateTime = (utcString: string) => {
    const date = new Date(utcString);
    const localDate = date.toLocaleDateString();
    const localTime = date.toLocaleTimeString();
    return `${localDate} ${localTime}`;
  };

  return (
    <>
      <div className={styles.container}>
        {/* <!-- Seção 1: Link de Convite --> */}
        <div className={styles["invite-section"]}>
          <h2>
            Seu Link de Convite <i className="fas fa-user-plus"></i>
          </h2>
          <p>
            Compartilhe este link e ganhe bônus quando seus convidados
            investirem
          </p>

          <div className={styles["invite-code"]}>
            <span id="inviteLink">{user?.invite_code ?? ""}</span>
            <button
              className={styles["copy-btn"]}
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(user?.invite_code ?? "");
                } catch (err) {
                  console.error("Falha ao copiar texto: ", err);
                }
              }}
            >
              <i className="fas fa-copy"></i> Copiar
            </button>
          </div>

          <div className={styles["social-share"]}>
            <a href="https://chat.whatsapp.com/GIWptDybiWJAHeyblPyoOw">
              <button
                style={{
                  background: "#25D366",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  marginRight: "10px",
                }}
              >
                <i className="fab fa-whatsapp"></i>WhatsApp
              </button>
            </a>
            <a href="https://t.me/RedAi_canal">
              <button
                style={{
                  background: "#0088cc",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "5px",
                }}
              >
                <i className="fab fa-telegram"></i> Telegram
              </button>
            </a>
          </div>
        </div>

        {/* <!-- Seção 2: Níveis de Convite --> */}
        <div className={styles.card}>
          <h2 className={styles["card-title"]}>
            <span>
              <i className={`fas fa-money-bill-wave ${styles.is}`}></i> BÔNUS
              POR NÍVEL
            </span>
            <span className={styles.badge}>GANHOS</span>
          </h2>
          <div className={styles["level-card"]}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className={styles["level-badge"]}>1</div>
              <div style={{ marginLeft: "15px" }}>
                <h3 style={{ margin: 0 }}>Nível 1</h3>
                <p style={{ margin: "5px 0 0 0", color: "#7f8c8d" }}>
                  Primeira Geração
                </p>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: "0", fontWeight: "bold" }}>30%</p>
              <p style={{ margin: "5px 0 0 0", color: "#7f8c8d" }}>
                Total: 15.000 Kz
              </p>
            </div>
          </div>

          <div className={styles["level-card"]}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className={styles["level-badge"]}>2</div>
              <div style={{ marginLeft: "15px" }}>
                <h3 style={{ margin: 0 }}>Nível 2</h3>
                <p style={{ margin: "5px 0 0 0", color: "#7f8c8d" }}>
                  Segunda geração
                </p>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, fontWeight: "bold" }}>10%</p>
              <p style={{ margin: "5px 0 0 0", color: "#7f8c8d" }}>
                Total: 7.500 Kz
              </p>
            </div>
          </div>

          <div className={styles["level-card"]}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className={styles["level-badge"]}>3</div>
              <div style={{ marginLeft: "15px" }}>
                <h3 style={{ margin: 0 }}>Nível 3</h3>
                <p style={{ margin: "5px 0 0 0", color: "#7f8c8d" }}>
                  Terceira geração
                </p>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, fontWeight: "bold" }}>5%</p>
              <p style={{ margin: "5px 0 0 0", color: "#7f8c8d" }}>
                Total: 3.000 Kz
              </p>
            </div>
          </div>
        </div>

        {/* <!-- Seção 3: Tabela de Lucros --> */}
        <div className={styles.card}>
          <h2 className={styles["card-title"]}>
            <span>
              <i className={`fas fa-money-bill-wave ${styles.is}`}></i> BÔNUS DA
              REDE
            </span>
            <span className={styles.badge}>GANHOS</span>
          </h2>
          <table className={styles["earnings-table"]}>
            <thead>
              <tr className={styles.trs}>
                <th className={styles.ths}>Data</th>
                <th className={styles.ths}>Nível</th>
                <th className={styles.ths}>Convidado</th>
                <th className={styles.ths}>Investimento</th>
                <th className={styles.ths}>Seu Lucro</th>
              </tr>
            </thead>
            <tbody>
              {netWorkBonus ? (
                netWorkBonus.map((networkBonu, index) => (
                  <tr className={styles.trs} key={index}>
                    <td className={styles.tds}>
                      {formatLocalDateTime(networkBonu.date)}
                    </td>
                    <td className={styles.tds}>{networkBonu.level}</td>
                    <td className={styles.tds}>{networkBonu.invitee_name}</td>
                    <td className={styles.tds}>{networkBonu.investment} Kz</td>
                    <td
                      className={styles.tds}
                      style={{
                        color: "var(--success-color)",
                        fontWeight: "bold",
                      }}
                    >
                      {networkBonu.bonus_generated} Kz
                    </td>
                  </tr>
                ))
              ) : (
                <tr className={styles.trs}>
                  <td className={styles.tds}>Loading...</td>
                  <td className={styles.tds}>Loading...</td>
                  <td className={styles.tds}>Loading...</td>
                  <td className={styles.tds}>Loading... Kz</td>
                  <td
                    className={styles.tds}
                    style={{
                      color: "var(--success-color)",
                      fontWeight: "bold",
                    }}
                  >
                    Loading... Kz
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* <!-- Seção C: Tabela de Rendimentos Diários --> */}
        <div className={styles.card}>
          <h2 className={styles["card-title"]}>
            <span>
              <i className={`fas fa-calendar-alt ${styles.is}`}></i> RENDA POR
              PRODUTO
            </span>
            <span className={styles.badge}>ANÁLISE</span>
          </h2>
          <table className={styles["earnings-table"]}>
            <thead>
              <tr className={styles.trs}>
                <th className={styles.ths}>Produto</th>
                <th className={styles.ths}>Investimento</th>
                <th className={styles.ths}>Renda Diária</th>
                <th className={styles.ths}>Duração</th>
                <th className={styles.ths}>Renda Total</th>
              </tr>
            </thead>
            <tbody>
              {productSummary ? (
                productSummary.map((productSum, index) => (
                  <tr className={styles.trs} key={index}>
                    <td className={styles.tds} style={{ fontWeight: "bold" }}>
                      {productSum.product_name}
                    </td>
                    <td className={styles.tds}>{productSum.investment} kz</td>
                    <td className={styles.tds}>
                      {productSum.daily_income} kz (10%)
                    </td>
                    <td className={styles.tds}>
                      {Math.trunc(productSum.remaining_days)} Dias
                    </td>
                    <td className={styles.tds}>{productSum.total_earned} Kz</td>
                  </tr>
                ))
              ) : (
                <tr className={styles.trs}>
                  <td className={styles.tds} style={{ fontWeight: "bold" }}>
                    Loading...
                  </td>
                  <td className={styles.tds}>Loading... kz</td>
                  <td className={styles.tds}>Loading... kz (10%)</td>
                  <td className={styles.tds}>Loading... Dias</td>
                  <td className={styles.tds}>Loading... Kz</td>
                </tr>
              )}
            </tbody>
          </table>
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
          onClick={() => navigate("/Products")}
          style={{ cursor: "pointer" }}
          className={styles["nav-item"]}
        >
          <i className={`fas fa-box ${styles.is}`}></i>
          <span>Produtos</span>
        </a>
        <a
          onClick={() => navigate("/teams")}
          style={{ cursor: "pointer" }}
          className={`${styles["nav-item"]} ${styles.active}`}
        >
          <i className={`fas fa-network-wired ${styles.is}`}></i>
          <span>Equipe</span>
        </a>
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
export default TeamsPage;
