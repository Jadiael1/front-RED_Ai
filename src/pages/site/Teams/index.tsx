import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TeamsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/public/assets/css/teamPage.css";
      link.id = "teampage-page-style";
      document.head.appendChild(link);
  
      const link2 = document.createElement("link");
      link2.rel = "stylesheet";
      link2.href = "/assets/fontawesome/css/all.min.css";
      link2.id = "fontawesome-page-style";
      document.head.appendChild(link2);
  
      return () => {
        const existingLink = document.getElementById("teampage-page-style");
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
        {/* <!-- Seção 1: Link de Convite --> */}
        <div className="invite-section">
          <h2>
            Seu Link de Convite <i className="fas fa-user-plus"></i>
          </h2>
          <p>
            Compartilhe este link e ganhe bônus quando seus convidados
            investirem
          </p>

          <div className="invite-code">
            <span id="inviteLink">https://redai.com/invite/RED123456</span>
            <button
              className="copy-btn"
              onClick={() => {
                /*copy invite*/
              }}
            >
              <i className="fas fa-copy"></i> Copiar
            </button>
          </div>

          <div className="social-share">
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

        {/* <!-- Seção 2: Níveis de Convite ja expliquei mais ou menos como deve funcionar esta pagina lá no maniifesto, vai mostrar o total de ganho poor cada nivel--> */}
        <div className="card">
          <h2 className="card-title">
            <span>
              <i className="fas fa-money-bill-wave"></i> BÔNUS POR NÍVEL
            </span>
            <span className="badge">GANHOS</span>
          </h2>
          <div className="level-card">
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="level-badge">1</div>
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

          <div className="level-card">
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="level-badge">2</div>
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

          <div className="level-card">
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="level-badge">3</div>
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

        {/* <!-- Seção 3: Tabela de Lucros ela deverá mostrar apenas 3 convidados mais recentes-->  */}

        <div className="card">
          <h2 className="card-title">
            <span>
              <i className="fas fa-money-bill-wave"></i> BÔNUS DA REDE
            </span>
            <span className="badge">GANHOS</span>
          </h2>
          <table className="earnings-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Nível</th>
                <th>Convidado</th>
                <th>Investimento</th>
                <th>Seu Lucro</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>15/05/2023</td>
                <td>1</td>
                <td>João Silva</td>
                <td>50.000 Kz</td>
                <td
                  style={{ color: "var(--success-color)", fontWeight: "bold" }}
                >
                  5.000 Kz
                </td>
              </tr>
              <tr>
                <td>10/05/2023</td>
                <td>2</td>
                <td>Maria Souza</td>
                <td>30.000 Kz</td>
                <td
                  style={{ color: "var(--success-color)", fontWeight: "bold" }}
                >
                  1.500 Kz
                </td>
              </tr>
              <tr>
                <td>05/05/2023</td>
                <td>1</td>
                <td>Carlos Oliveira</td>
                <td>100.000 Kz</td>
                <td
                  style={{ color: "var(--success-color)", fontWeight: "bold" }}
                >
                  10.000 Kz
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* <!-- Seção C: Tabela de Rendimentos Diários --> */}
        <div className="card">
          <h2 className="card-title">
            <span>
              <i className="fas fa-calendar-alt"></i> RENDA POR PRODUTO
            </span>
            <span className="badge">ANÁLISE</span>
          </h2>
          <table className="earnings-table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Investimento</th>
                <th>Renda Diária</th>
                <th>Duração</th>
                <th>Renda Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: "bold" }}>Plano Básico 1</td>
                <td>5.000 kz</td>
                <td>500 kz (10%)</td>
                <td>30 Dias</td>
                <td>15.000 Kz</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold" }}>Plano Básico 2</td>
                <td>15.000 kz</td>
                <td>1.500 kz (10%)</td>
                <td>30 Dias</td>
                <td>45.000 Kz</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold" }}>Plano Básico 3</td>
                <td>30.000 kz</td>
                <td>3.000 kz (10%)</td>
                <td>30 Dias</td>
                <td>90.000 Kz</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold" }}>P. Intermédio 1</td>
                <td>75.000 Kz</td>
                <td>6.750 kz (9%)</td>
                <td>30 Dias</td>
                <td>202.500 Kz</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold" }}>P. Intermédio 2</td>
                <td>150.000 kz</td>
                <td>13.500 kz(9%)</td>
                <td>30 Dias</td>
                <td>405.000 Kz</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold" }}>P. Intermédio 3</td>
                <td>500.000 Kz</td>
                <td>45.000 kz (9%)</td>
                <td>30 Dias</td>
                <td>1.350.000 Kz</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold" }}>Plano Avançado 1</td>
                <td>1.000.000 kz</td>
                <td>80.000 kz (8%)</td>
                <td>30 Dias</td>
                <td>2.400.000 Kz</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold" }}>Plano Avançado 2</td>
                <td>2.500.000 Kz</td>
                <td>175.000 kz (8%)</td>
                <td>30 Dias</td>
                <td>5.250.000 Kz</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold" }}>Plano Avançado 3</td>
                <td>3.500.000 kz</td>
                <td>245.000 kz (8%)</td>
                <td>30 Dias</td>
                <td>7.350.000 Kz</td>
              </tr>
            </tbody>
          </table>
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
          onClick={() => navigate("/Products")}
          style={{ cursor: "pointer" }}
          className="nav-item"
        >
          <i className="fas fa-box"></i>
          <span>Produtos</span>
        </a>
        <a
          onClick={() => navigate("/teams")}
          style={{ cursor: "pointer" }}
          className="nav-item active"
        >
          <i className="fas fa-network-wired"></i>
          <span>Equipe</span>
        </a>
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
export default TeamsPage;
