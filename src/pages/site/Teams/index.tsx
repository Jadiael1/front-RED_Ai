import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./assets/css/Teams.module.css";

const TeamsPage = () => {
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
            <span id="inviteLink">https://redai.com/invite/RED123456</span>
            <button
              className={styles["copy-btn"]}
              onClick={() => {
                /*copy invite*/
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
              <tr className={styles.trs}>
                <td className={styles.tds}>15/05/2023</td>
                <td className={styles.tds}>1</td>
                <td className={styles.tds}>João Silva</td>
                <td className={styles.tds}>50.000 Kz</td>
                <td
                  className={styles.tds}
                  style={{ color: "var(--success-color)", fontWeight: "bold" }}
                >
                  5.000 Kz
                </td>
              </tr>
              <tr className={styles.trs}>
                <td className={styles.tds}>10/05/2023</td>
                <td className={styles.tds}>2</td>
                <td className={styles.tds}>Maria Souza</td>
                <td className={styles.tds}>30.000 Kz</td>
                <td
                  className={styles.tds}
                  style={{ color: "var(--success-color)", fontWeight: "bold" }}
                >
                  1.500 Kz
                </td>
              </tr>
              <tr className={styles.trs}>
                <td className={styles.tds}>05/05/2023</td>
                <td className={styles.tds}>1</td>
                <td className={styles.tds}>Carlos Oliveira</td>
                <td className={styles.tds}>100.000 Kz</td>
                <td
                  className={styles.tds}
                  style={{ color: "var(--success-color)", fontWeight: "bold" }}
                >
                  10.000 Kz
                </td>
              </tr>
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
              <tr className={styles.trs}>
                <td className={styles.tds} style={{ fontWeight: "bold" }}>
                  Plano Básico 1
                </td>
                <td className={styles.tds}>5.000 kz</td>
                <td className={styles.tds}>500 kz (10%)</td>
                <td className={styles.tds}>30 Dias</td>
                <td className={styles.tds}>15.000 Kz</td>
              </tr>
              <tr className={styles.trs}>
                <td className={styles.tds} style={{ fontWeight: "bold" }}>
                  Plano Básico 2
                </td>
                <td className={styles.tds}>15.000 kz</td>
                <td className={styles.tds}>1.500 kz (10%)</td>
                <td className={styles.tds}>30 Dias</td>
                <td className={styles.tds}>45.000 Kz</td>
              </tr>
              <tr className={styles.trs}>
                <td className={styles.tds} style={{ fontWeight: "bold" }}>
                  Plano Básico 3
                </td>
                <td className={styles.tds}>30.000 kz</td>
                <td className={styles.tds}>3.000 kz (10%)</td>
                <td className={styles.tds}>30 Dias</td>
                <td className={styles.tds}>90.000 Kz</td>
              </tr>
              <tr className={styles.trs}>
                <td className={styles.tds} style={{ fontWeight: "bold" }}>
                  P. Intermédio 1
                </td>
                <td className={styles.tds}>75.000 Kz</td>
                <td className={styles.tds}>6.750 kz (9%)</td>
                <td className={styles.tds}>30 Dias</td>
                <td className={styles.tds}>202.500 Kz</td>
              </tr>
              <tr className={styles.trs}>
                <td className={styles.tds} style={{ fontWeight: "bold" }}>
                  P. Intermédio 2
                </td>
                <td className={styles.tds}>150.000 kz</td>
                <td className={styles.tds}>13.500 kz(9%)</td>
                <td className={styles.tds}>30 Dias</td>
                <td className={styles.tds}>405.000 Kz</td>
              </tr>
              <tr className={styles.trs}>
                <td className={styles.tds} style={{ fontWeight: "bold" }}>
                  P. Intermédio 3
                </td>
                <td className={styles.tds}>500.000 Kz</td>
                <td className={styles.tds}>45.000 kz (9%)</td>
                <td className={styles.tds}>30 Dias</td>
                <td className={styles.tds}>1.350.000 Kz</td>
              </tr>
              <tr className={styles.trs}>
                <td className={styles.tds} style={{ fontWeight: "bold" }}>
                  Plano Avançado 1
                </td>
                <td className={styles.tds}>1.000.000 kz</td>
                <td className={styles.tds}>80.000 kz (8%)</td>
                <td className={styles.tds}>30 Dias</td>
                <td className={styles.tds}>2.400.000 Kz</td>
              </tr>
              <tr className={styles.trs}>
                <td className={styles.tds} style={{ fontWeight: "bold" }}>
                  Plano Avançado 2
                </td>
                <td className={styles.tds}>2.500.000 Kz</td>
                <td className={styles.tds}>175.000 kz (8%)</td>
                <td className={styles.tds}>30 Dias</td>
                <td className={styles.tds}>5.250.000 Kz</td>
              </tr>
              <tr className={styles.trs}>
                <td className={styles.tds} style={{ fontWeight: "bold" }}>
                  Plano Avançado 3
                </td>
                <td className={styles.tds}>3.500.000 kz</td>
                <td className={styles.tds}>245.000 kz (8%)</td>
                <td className={styles.tds}>30 Dias</td>
                <td className={styles.tds}>7.350.000 Kz</td>
              </tr>
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
