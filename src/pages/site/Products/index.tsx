import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./assets/css/Products.module.css";

const ProductPage = () => {
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
        <h1
          style={{
            color: "var(--secondary-color)",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Nossos Planos de Investimento
        </h1>

        <div className={styles["product-grid"]}>
          {/* <!-- Produto VIP 1 --> */}
          <div className={styles["product-card"]}>
            <span className={styles["product-badge"]}>VIP 1</span>
            <h3 className={styles["product-title"]}>Plano Básico 1</h3>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Investimento:</span>
              <span className={styles.value}>5.000 Kz</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Renda Diária:</span>
              <span className={styles.value}>500 Kz (10%)</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Duração:</span>
              <span className={styles.value}>30 dias</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Rendimento Total:</span>
              <span className={styles.value}>15.000 Kz</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Disponíveis:</span>
              <span className={styles.value}>5/5</span>
            </div>

            <button className={styles["buy-btn"]}>COMPRAR</button>
          </div>

          {/* <!-- Produto VIP 2 --> */}
          <div className={styles["product-card"]}>
            <span className={styles["product-badge"]}>VIP 2</span>
            <h3 className={styles["product-title"]}>Plano Básico 2</h3>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Investimento:</span>
              <span className={styles.value}>15.000 Kz</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Renda Diária:</span>
              <span className={styles.value}>1.500 Kz (10%)</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Duração:</span>
              <span className={styles.value}>30 dias</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Rendimento Total:</span>
              <span className={styles.value}>45.000 Kz</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Disponíveis:</span>
              <span className={styles.value}>5/5</span>
            </div>

            <button className={styles["buy-btn"]}>COMPRAR</button>
          </div>

          {/* <!-- Produto VIP 3 --> */}
          <div className={styles["product-card"]}>
            <span className={styles["product-badge"]}>VIP 3</span>
            <h3 className={styles["product-title"]}>Plano Básico 3</h3>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Investimento:</span>
              <span className={styles.value}>30.000 Kz</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Renda Diária:</span>
              <span className={styles.value}>3.000 Kz (10%)</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Duração:</span>
              <span className={styles.value}>30 dias</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Rendimento Total:</span>
              <span className={styles.value}>90.000 Kz</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Disponíveis:</span>
              <span className={styles.value}>5/5</span>
            </div>

            <button className={styles["buy-btn"]}>COMPRAR</button>
          </div>

          {/* <!-- Produto VIP 4 --> */}
          <div className={styles["product-card"]}>
            <span className={styles["product-badge"]}>VIP 4</span>
            <h3 className={styles["product-title"]}>Plano Intermédio 1</h3>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Investimento:</span>
              <span className={styles.value}>75.000 Kz</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Renda Diária:</span>
              <span className={styles.value}>6.750 Kz (9%)</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Duração:</span>
              <span className={styles.value}>30 dias</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Rendimento Total:</span>
              <span className={styles.value}>202.500 Kz</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Disponíveis:</span>
              <span className={styles.value}>5/5</span>
            </div>

            <button className={styles["buy-btn"]}>COMPRAR</button>
          </div>

          {/* <!-- Produto VIP 5 --> */}
          <div className={styles["product-card"]}>
            <span className={styles["product-badge"]}>VIP 5</span>
            <h3 className={styles["product-title"]}>Plano Intermédio 2</h3>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Investimento:</span>
              <span className={styles.value}>150.000 Kz</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Renda Diária:</span>
              <span className={styles.value}>13.500 Kz (9%)</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Duração:</span>
              <span className={styles.value}>30 dias</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Rendimento Total:</span>
              <span className={styles.value}>405.000 Kz</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Disponíveis:</span>
              <span className={styles.value}>5/5</span>
            </div>

            <button className={styles["buy-btn"]}>COMPRAR</button>
          </div>

          {/* <!-- Produto VIP 6 --> */}
          <div className={styles["product-card"]}>
            <span className={styles["product-badge"]}>VIP 6</span>
            <h3 className={styles["product-title"]}>Plano Intermédio 3</h3>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Investimento:</span>
              <span className={styles.value}>500.000 Kz</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Renda Diária:</span>
              <span className={styles.value}>45.000 Kz (9%)</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Duração:</span>
              <span className={styles.value}>30 dias</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Rendimento Total:</span>
              <span className={styles.value}>1.350.000 Kz</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Disponíveis:</span>
              <span className={styles.value}>5/5</span>
            </div>

            <button className={styles["buy-btn"]}>COMPRAR</button>
          </div>

          {/* <!-- Produto VIP 7 --> */}
          <div className={styles["product-card"]}>
            <span className={styles["product-badge"]}>VIP 7</span>
            <h3 className={styles["product-title"]}>Plano Avançado 1</h3>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Investimento:</span>
              <span className={styles.value}>1.000.000 Kz</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Renda Diária:</span>
              <span className={styles.value}>80.000 Kz (8%)</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Duração:</span>
              <span className={styles.value}>30 dias</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Rendimento Total:</span>
              <span className={styles.value}>2.400.000 Kz</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Disponíveis:</span>
              <span className={styles.value}>5/5</span>
            </div>

            <button className={styles["buy-btn"]}>COMPRAR</button>
          </div>

          {/* <!-- Produto VIP 8 --> */}
          <div className={styles["product-card"]}>
            <span className={styles["product-badge"]}>VIP 8</span>
            <h3 className={styles["product-title"]}>Plano Avançado 2</h3>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Investimento:</span>
              <span className={styles.value}>2.500.000 Kz</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Renda Diária:</span>
              <span className={styles.value}>175.000 Kz (8%)</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Duração:</span>
              <span className={styles.value}>30 dias</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Rendimento Total:</span>
              <span className={styles.value}>5.250.000 Kz</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Disponíveis:</span>
              <span className={styles.value}>5/5</span>
            </div>

            <button className={styles["buy-btn"]}>COMPRAR</button>
          </div>

          {/* <!-- Produto VIP 9 --> */}
          <div className={styles["product-card"]}>
            <span className={styles["product-badge"]}>VIP 9</span>
            <h3 className={styles["product-title"]}>Plano Avançado 3</h3>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Investimento:</span>
              <span className={styles.value}>3.500.000 Kz</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Renda Diária:</span>
              <span className={styles.value}>245.000 Kz (8%)</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Duração:</span>
              <span className={styles.value}>30 dias</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Rendimento Total:</span>
              <span className={styles.value}>7.350.000 Kz</span>
            </div>

            <div className={styles["product-detail"]}>
              <span className={styles.label}>Disponíveis:</span>
              <span className={styles.value}>5/5</span>
            </div>

            <button className={styles["buy-btn"]}>COMPRAR</button>
          </div>
        </div>
      </div>

      {/* // <!-- Menu Inferior --> */}
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
          className={`${styles["nav-item"]} ${styles.active}`}
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
          className={styles["nav-item"]}
        >
          <i className={`fas fa-user ${styles.is}`}></i>
          <span>Perfil</span>
        </a>
      </div>
    </>
  );
};

export default ProductPage;
