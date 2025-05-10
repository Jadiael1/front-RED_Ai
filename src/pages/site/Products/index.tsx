import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./assets/css/Products.module.css";
import { getProducts, TProduct } from "../../../api/endpoints/product";
import ConfirmationDialog from "../../../components/ConfirmationDialog";
import { purchaseProduct } from "../../../api/endpoints/purchaseProduct";
import AlertDiv from "../../../components/Alert";

const ProductPage = () => {
  const [products, setProducts] = useState<TProduct[] | null>(null);
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertLink, setAlertLink] = useState<string | undefined>();
  const [alertLinkMessage, setAlertLinkMessage] = useState<
    string | undefined
  >();
  const [alertType, setAlertType] = useState<
    "success" | "warning" | "error" | null
  >(null);

  const showAlert = (
    type: "success" | "warning" | "error",
    message: string
  ) => {
    setAlertType(type);
    setAlertMessage(message);

    setTimeout(() => {
      setAlertMessage("");
      setAlertType(null);
    }, 5000);
  };

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
    setAlertLink(undefined);
    setAlertLinkMessage(undefined);
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

  const handleBuyClick = (product: TProduct) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const updateRemainingLimit = (id: number | null) => {
    setProducts((prevProducts) =>
      prevProducts
        ? prevProducts.map((product) =>
            product.id === id
              ? {
                  ...product,
                  remaining_limit: product.remaining_limit
                    ? product.remaining_limit - 1
                    : null,
                }
              : product
          )
        : prevProducts
    );
  };

  const confirmPurchase = async () => {
    setIsDialogOpen(false);
    if (selectedProduct) {
      const response = await purchaseProduct({
        product_id: selectedProduct.id,
      });
      if (response.status === "success") {
        showAlert("success", "produto comprado com sucesso");
        updateRemainingLimit(selectedProduct.id);
      } else if (
        response.status === "error" &&
        response.message === "Insufficient balance."
      ) {
        showAlert("error", "Saldo insuficiente");
      } else if (
        response.status === "error" &&
        response.message === "Purchase limit reached for this product."
      ) {
        showAlert("error", "Limite de compra atingido para este produto.");
      } else if (response.status === "error") {
        showAlert("error", "Erro interno, tente novamente mais tarde.");
      }
    }
    setSelectedProduct(null);
  };

  const cancelPurchase = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

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

        {alertType && alertMessage && (
          <AlertDiv
            type={alertType}
            message={alertMessage}
            link={alertLink}
            linkMessage={alertLinkMessage}
          />
        )}

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

                <button
                  className={styles["buy-btn"]}
                  onClick={() => handleBuyClick(product)}
                >
                  COMPRAR
                </button>
              </div>
            ))
          ) : (
            <>
              <div className={styles["product-card"]} key="1654A8G7J8941985">
                <span className={styles["product-badge"]}>Loading...</span>
                <h3 className={styles["product-title"]}>Loading...</h3>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Investimento:</span>
                  <span className={styles.value}>Loading... Kz</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Renda Diária:</span>
                  <span className={styles.value}>Loading... Kz (10%)</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Duração:</span>
                  <span className={styles.value}>Loading... dias</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Rendimento Total:</span>
                  <span className={styles.value}>Loading... Kz</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Disponíveis:</span>
                  <span className={styles.value}>Loading...</span>
                </div>

                <button className={styles["buy-btn"]} disabled>
                  COMPRAR
                </button>
              </div>
              <div className={styles["product-card"]} key="A0X18S5G6F9D">
                <span className={styles["product-badge"]}>Loading...</span>
                <h3 className={styles["product-title"]}>Loading...</h3>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Investimento:</span>
                  <span className={styles.value}>Loading... Kz</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Renda Diária:</span>
                  <span className={styles.value}>Loading... Kz (10%)</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Duração:</span>
                  <span className={styles.value}>Loading... dias</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Rendimento Total:</span>
                  <span className={styles.value}>Loading... Kz</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Disponíveis:</span>
                  <span className={styles.value}>Loading...</span>
                </div>

                <button className={styles["buy-btn"]} disabled>
                  COMPRAR
                </button>
              </div>
              <div className={styles["product-card"]} key="A7F45S2X5H9LD87">
                <span className={styles["product-badge"]}>Loading...</span>
                <h3 className={styles["product-title"]}>Loading...</h3>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Investimento:</span>
                  <span className={styles.value}>Loading... Kz</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Renda Diária:</span>
                  <span className={styles.value}>Loading... Kz (10%)</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Duração:</span>
                  <span className={styles.value}>Loading... dias</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Rendimento Total:</span>
                  <span className={styles.value}>Loading... Kz</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Disponíveis:</span>
                  <span className={styles.value}>Loading...</span>
                </div>

                <button className={styles["buy-btn"]} disabled>
                  COMPRAR
                </button>
              </div>
              <div className={styles["product-card"]} key="Z9X8C1W5H5">
                <span className={styles["product-badge"]}>Loading...</span>
                <h3 className={styles["product-title"]}>Loading...</h3>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Investimento:</span>
                  <span className={styles.value}>Loading... Kz</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Renda Diária:</span>
                  <span className={styles.value}>Loading... Kz (10%)</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Duração:</span>
                  <span className={styles.value}>Loading... dias</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Rendimento Total:</span>
                  <span className={styles.value}>Loading... Kz</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Disponíveis:</span>
                  <span className={styles.value}>Loading...</span>
                </div>

                <button className={styles["buy-btn"]} disabled>
                  COMPRAR
                </button>
              </div>
              <div className={styles["product-card"]} key="0A1Q4E5XC38A">
                <span className={styles["product-badge"]}>Loading...</span>
                <h3 className={styles["product-title"]}>Loading...</h3>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Investimento:</span>
                  <span className={styles.value}>Loading... Kz</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Renda Diária:</span>
                  <span className={styles.value}>Loading... Kz (10%)</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Duração:</span>
                  <span className={styles.value}>Loading... dias</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Rendimento Total:</span>
                  <span className={styles.value}>Loading... Kz</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Disponíveis:</span>
                  <span className={styles.value}>Loading...</span>
                </div>

                <button className={styles["buy-btn"]} disabled>
                  COMPRAR
                </button>
              </div>
              <div className={styles["product-card"]} key="13A2S8E9J2B">
                <span className={styles["product-badge"]}>Loading...</span>
                <h3 className={styles["product-title"]}>Loading...</h3>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Investimento:</span>
                  <span className={styles.value}>Loading... Kz</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Renda Diária:</span>
                  <span className={styles.value}>Loading... Kz (10%)</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Duração:</span>
                  <span className={styles.value}>Loading... dias</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Rendimento Total:</span>
                  <span className={styles.value}>Loading... Kz</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Disponíveis:</span>
                  <span className={styles.value}>Loading...</span>
                </div>

                <button className={styles["buy-btn"]} disabled>
                  COMPRAR
                </button>
              </div>
              <div className={styles["product-card"]} key="ALDF845H698D9E4Q">
                <span className={styles["product-badge"]}>Loading...</span>
                <h3 className={styles["product-title"]}>Loading...</h3>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Investimento:</span>
                  <span className={styles.value}>Loading... Kz</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Renda Diária:</span>
                  <span className={styles.value}>Loading... Kz (10%)</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Duração:</span>
                  <span className={styles.value}>Loading... dias</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Rendimento Total:</span>
                  <span className={styles.value}>Loading... Kz</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Disponíveis:</span>
                  <span className={styles.value}>Loading...</span>
                </div>

                <button className={styles["buy-btn"]} disabled>
                  COMPRAR
                </button>
              </div>
              <div className={styles["product-card"]} key="157A5B5K9YE8">
                <span className={styles["product-badge"]}>Loading...</span>
                <h3 className={styles["product-title"]}>Loading...</h3>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Investimento:</span>
                  <span className={styles.value}>Loading... Kz</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Renda Diária:</span>
                  <span className={styles.value}>Loading... Kz (10%)</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Duração:</span>
                  <span className={styles.value}>Loading... dias</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Rendimento Total:</span>
                  <span className={styles.value}>Loading... Kz</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Disponíveis:</span>
                  <span className={styles.value}>Loading...</span>
                </div>

                <button className={styles["buy-btn"]} disabled>
                  COMPRAR
                </button>
              </div>
              <div className={styles["product-card"]} key="15487A5F5J2R">
                <span className={styles["product-badge"]}>Loading...</span>
                <h3 className={styles["product-title"]}>Loading...</h3>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Investimento:</span>
                  <span className={styles.value}>Loading... Kz</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Renda Diária:</span>
                  <span className={styles.value}>Loading... Kz (10%)</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Duração:</span>
                  <span className={styles.value}>Loading... dias</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Rendimento Total:</span>
                  <span className={styles.value}>Loading... Kz</span>
                </div>

                <div className={styles["product-detail"]}>
                  <span className={styles.label}>Disponíveis:</span>
                  <span className={styles.value}>Loading...</span>
                </div>

                <button className={styles["buy-btn"]} disabled>
                  COMPRAR
                </button>
              </div>
            </>
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
      <ConfirmationDialog
        title="Confirmar Compra"
        message={`Tem certeza que deseja comprar o produto ${selectedProduct?.name}?`}
        onConfirm={confirmPurchase}
        onCancel={cancelPurchase}
        isOpen={isDialogOpen}
      />
    </>
  );
};

export default ProductPage;
