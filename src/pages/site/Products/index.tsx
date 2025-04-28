import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/assets/css/productPage.css";
    link.id = "productpage-page-style";
    document.head.appendChild(link);

    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href = "/assets/fontawesome/css/all.min.css";
    link2.id = "fontawesome-page-style";
    document.head.appendChild(link2);

    return () => {
      const existingLink = document.getElementById("productpage-page-style");
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
        <h1
          style={{
            color: "var(--secondary-color)",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Nossos Planos de Investimento
        </h1>

        <div className="product-grid">
          {/* <!-- Produto VIP 1 --> */}
          <div className="product-card">
            <span className="product-badge">VIP 1</span>
            <h3 className="product-title">Plano Básico 1</h3>

            <div className="product-detail">
              <span className="label">Investimento:</span>
              <span className="value">5.000 Kz</span>
            </div>

            <div className="product-detail">
              <span className="label">Renda Diária:</span>
              <span className="value">500 Kz (10%)</span>
            </div>

            <div className="product-detail">
              <span className="label">Duração:</span>
              <span className="value">30 dias</span>
            </div>

            <div className="product-detail">
              <span className="label">Rendimento Total:</span>
              <span className="value">15.000 Kz</span>
            </div>

            <div className="product-detail">
              <span className="label">Disponíveis:</span>
              <span className="value">5/5</span>
            </div>

            <button className="buy-btn">COMPRAR</button>
          </div>

          {/* <!-- Produto VIP 2 --> */}
          <div className="product-card">
            <span className="product-badge">VIP 2</span>
            <h3 className="product-title">Plano Básico 2</h3>

            <div className="product-detail">
              <span className="label">Investimento:</span>
              <span className="value">15.000 Kz</span>
            </div>

            <div className="product-detail">
              <span className="label">Renda Diária:</span>
              <span className="value">1.500 Kz (10%)</span>
            </div>

            <div className="product-detail">
              <span className="label">Duração:</span>
              <span className="value">30 dias</span>
            </div>

            <div className="product-detail">
              <span className="label">Rendimento Total:</span>
              <span className="value">45.000 Kz</span>
            </div>

            <div className="product-detail">
              <span className="label">Disponíveis:</span>
              <span className="value">5/5</span>
            </div>

            <button className="buy-btn">COMPRAR</button>
          </div>

          {/* <!-- Produto VIP 3 --> */}
          <div className="product-card">
            <span className="product-badge">VIP 3</span>
            <h3 className="product-title">Plano Básico 3</h3>

            <div className="product-detail">
              <span className="label">Investimento:</span>
              <span className="value">30.000 Kz</span>
            </div>

            <div className="product-detail">
              <span className="label">Renda Diária:</span>
              <span className="value">3.000 Kz (10%)</span>
            </div>

            <div className="product-detail">
              <span className="label">Duração:</span>
              <span className="value">30 dias</span>
            </div>

            <div className="product-detail">
              <span className="label">Rendimento Total:</span>
              <span className="value">90.000 Kz</span>
            </div>

            <div className="product-detail">
              <span className="label">Disponíveis:</span>
              <span className="value">5/5</span>
            </div>

            <button className="buy-btn">COMPRAR</button>
          </div>

          {/* <!-- Produto VIP 4 --> */}
          <div className="product-card">
            <span className="product-badge">VIP 4</span>
            <h3 className="product-title">Plano Intermédio 1</h3>

            <div className="product-detail">
              <span className="label">Investimento:</span>
              <span className="value">75.000 Kz</span>
            </div>

            <div className="product-detail">
              <span className="label">Renda Diária:</span>
              <span className="value">6.750 Kz (9%)</span>
            </div>

            <div className="product-detail">
              <span className="label">Duração:</span>
              <span className="value">30 dias</span>
            </div>

            <div className="product-detail">
              <span className="label">Rendimento Total:</span>
              <span className="value">202.500 Kz</span>
            </div>

            <div className="product-detail">
              <span className="label">Disponíveis:</span>
              <span className="value">5/5</span>
            </div>

            <button className="buy-btn">COMPRAR</button>
          </div>

          {/* <!-- Produto VIP 5 --> */}
          <div className="product-card">
            <span className="product-badge">VIP 5</span>
            <h3 className="product-title">Plano Intermédio 2</h3>

            <div className="product-detail">
              <span className="label">Investimento:</span>
              <span className="value">150.000 Kz</span>
            </div>

            <div className="product-detail">
              <span className="label">Renda Diária:</span>
              <span className="value">13.500 Kz (9%)</span>
            </div>

            <div className="product-detail">
              <span className="label">Duração:</span>
              <span className="value">30 dias</span>
            </div>

            <div className="product-detail">
              <span className="label">Rendimento Total:</span>
              <span className="value">405.000 Kz</span>
            </div>

            <div className="product-detail">
              <span className="label">Disponíveis:</span>
              <span className="value">5/5</span>
            </div>

            <button className="buy-btn">COMPRAR</button>
          </div>

          {/* <!-- Produto VIP 6 --> */}
          <div className="product-card">
            <span className="product-badge">VIP 6</span>
            <h3 className="product-title">Plano Intermédio 3</h3>

            <div className="product-detail">
              <span className="label">Investimento:</span>
              <span className="value">500.000 Kz</span>
            </div>

            <div className="product-detail">
              <span className="label">Renda Diária:</span>
              <span className="value">45.000 Kz (9%)</span>
            </div>

            <div className="product-detail">
              <span className="label">Duração:</span>
              <span className="value">30 dias</span>
            </div>

            <div className="product-detail">
              <span className="label">Rendimento Total:</span>
              <span className="value">1.350.000 Kz</span>
            </div>

            <div className="product-detail">
              <span className="label">Disponíveis:</span>
              <span className="value">5/5</span>
            </div>

            <button className="buy-btn">COMPRAR</button>
          </div>

          {/* <!-- Produto VIP 7 --> */}
          <div className="product-card">
            <span className="product-badge">VIP 7</span>
            <h3 className="product-title">Plano Avançado 1</h3>

            <div className="product-detail">
              <span className="label">Investimento:</span>
              <span className="value">1.000.000 Kz</span>
            </div>

            <div className="product-detail">
              <span className="label">Renda Diária:</span>
              <span className="value">80.000 Kz (8%)</span>
            </div>

            <div className="product-detail">
              <span className="label">Duração:</span>
              <span className="value">30 dias</span>
            </div>

            <div className="product-detail">
              <span className="label">Rendimento Total:</span>
              <span className="value">2.400.000 Kz</span>
            </div>

            <div className="product-detail">
              <span className="label">Disponíveis:</span>
              <span className="value">5/5</span>
            </div>

            <button className="buy-btn">COMPRAR</button>
          </div>

          {/* <!-- Produto VIP 8 --> */}
          <div className="product-card">
            <span className="product-badge">VIP 8</span>
            <h3 className="product-title">Plano Avançado 2</h3>

            <div className="product-detail">
              <span className="label">Investimento:</span>
              <span className="value">2.500.000 Kz</span>
            </div>

            <div className="product-detail">
              <span className="label">Renda Diária:</span>
              <span className="value">175.000 Kz (8%)</span>
            </div>

            <div className="product-detail">
              <span className="label">Duração:</span>
              <span className="value">30 dias</span>
            </div>

            <div className="product-detail">
              <span className="label">Rendimento Total:</span>
              <span className="value">5.250.000 Kz</span>
            </div>

            <div className="product-detail">
              <span className="label">Disponíveis:</span>
              <span className="value">5/5</span>
            </div>

            <button className="buy-btn">COMPRAR</button>
          </div>
          {/* <!-- Produto VIP 9 --> */}
          <div className="product-card">
            <span className="product-badge">VIP 9</span>
            <h3 className="product-title">Plano Avançado 3</h3>

            <div className="product-detail">
              <span className="label">Investimento:</span>
              <span className="value">3.500.000 Kz</span>
            </div>

            <div className="product-detail">
              <span className="label">Renda Diária:</span>
              <span className="value">245.000 Kz (8%)</span>
            </div>

            <div className="product-detail">
              <span className="label">Duração:</span>
              <span className="value">30 dias</span>
            </div>

            <div className="product-detail">
              <span className="label">Rendimento Total:</span>
              <span className="value">7.350.000 Kz</span>
            </div>

            <div className="product-detail">
              <span className="label">Disponíveis:</span>
              <span className="value">5/5</span>
            </div>

            <button className="buy-btn">COMPRAR</button>
          </div>

          {/* <!-- Adicionaremos ou editaremos mais produtos VIP caso for necessário e todos devem seguir o mesmo funcionamento --> */}
        </div>
      </div>

      {/* // <!-- Menu Inferior --> */}
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
          className="nav-item active"
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
          className="nav-item"
        >
          <i className="fas fa-user"></i>
          <span>Perfil</span>
        </a>
      </div>
    </>
  );
};

export default ProductPage;
