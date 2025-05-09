import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./assets/css/Products.module.css";
import { getProducts, TProduct } from "../../../api/endpoints/product";

const ProductPage = () => {
  const [products, setProducts] = useState<TProduct[] | null>(null);
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

  useEffect(() => {
    (async () => {
      const response = await getProducts();
      setProducts(response.data.data);
    })();
  }, []);

  function formatNumber(number: number) {
    return new Intl.NumberFormat("pt", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  }

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
          {products ? (
            products.map((product, index) => (
              <div className={styles["product-card"]} key={index}>
                <span className={styles["product-badge"]}>VIP {index + 1}</span>
                <h3 className={styles["product-title"]}>{product.name}</h3>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Investimento:</span>
                  <span className={styles.value}>
                    {formatNumber(Number(product.price))} Kz
                  </span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Renda Diária:</span>
                  <span className={styles.value}>
                    {formatNumber(Number(product.daily_income))} Kz (10%)
                  </span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Duração:</span>
                  <span className={styles.value}>
                    {product.duration_days} dias
                  </span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Rendimento Total:</span>
                  <span className={styles.value}>
                    {formatNumber(Number(product.total_income))} Kz
                  </span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Disponíveis:</span>
                  <span className={styles.value}>
                    {product.remaining_limit}/{product.limit}
                  </span>
                </div>

                <button className={styles["buy-btn"]}>COMPRAR</button>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
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
