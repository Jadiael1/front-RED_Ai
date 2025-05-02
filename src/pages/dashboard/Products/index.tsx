import { useEffect } from "react";
import styles from "./assets/css/Products.module.css";
import productPlaceHolder from "../../../assets/images/product_placeholder.png";

const ProductsDashPage = () => {

  useEffect(() => {
    document.body.style.fontFamily =
      "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.backgroundColor = "#f8f9fa";
    document.body.style.color = "#333";
    document.body.style.overflowX = "hidden";

    const el = document.body;
    if (el) {
      el.style.setProperty("--primary-color", "#3498db");
      el.style.setProperty("--secondary-color", "#2c3e50");
      el.style.setProperty("--accent-color", "#e74c3c");
      el.style.setProperty("--light-color", "#ecf0f1");
      el.style.setProperty("--success-color", "#2ecc71");
      el.style.setProperty("--warning-color", "#f39c12");
    }

    return () => {
      document.body.style.fontFamily = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
      document.body.style.overflowX = "";

      if (el) {
        el.style.removeProperty("--primary-color");
        el.style.removeProperty("--secondary-color");
        el.style.removeProperty("--accent-color");
        el.style.removeProperty("--light-color");
        el.style.removeProperty("--success-color");
        el.style.removeProperty("--warning-color");
      }
    };
  }, []);

  return (
    <main className={`${styles["main-content"]}`}>
      <h1>Gerenciamento de Produtos</h1>

      <button
        className={`${styles["add-product-btn"]}`}
        onClick={() => {
          /* showProductForm() */
        }}
      >
        <i className="fas fa-plus"></i> Adicionar Produto
      </button>

      <div className={`${styles["product-list"]}`}>
        <div className={`${styles["product-card"]}`}>
          <img
            src={productPlaceHolder}
            alt="Pacote Premium"
            className={`${styles["product-image"]}`}
          />
          <div className={`${styles["product-info"]}`}>
            <h3>Pacote Premium</h3>
            <p>
              <strong>Preço:</strong> 500,000 kz
            </p>
            <p>
              <strong>Estoque:</strong> 50 unidades
            </p>
            <p>
              <strong>Categoria:</strong> Investimento
            </p>
            <div className={`${styles["product-actions"]}`}>
              <button
                className={`${styles["action-btn"]} ${styles["btn-edit"]}`}
                onClick={() => {
                  /* editProduct("P1001") */
                }}
              >
                Editar
              </button>
              <button
                className={`${styles["action-btn"]} ${styles["btn-ban"]}`}
              >
                Desativar
              </button>
            </div>
          </div>
        </div>

        {/* <!-- Mais produtos... --> */}
      </div>

      {/* <!-- Formulário de Produto --> */}
      <div id="productForm" className={`${styles["product-form"]}`}>
        <h2 className={`${styles["section-title"]}`} id="form-title">
          Adicionar Novo Produto
        </h2>

        <div className={`${styles["form-grid"]}`}>
          <div>
            <div className={`${styles["form-group"]}`}>
              <label className={`${styles.labels}`} htmlFor="product-name">
                Nome do Produto
              </label>
              <input
                type="text"
                id="product-name"
                className={`${styles["form-control"]}`}
              />
            </div>

            <div className={`${styles["form-group"]}`}>
              <label className={`${styles.labels}`} htmlFor="product-price">
                Preço (kz)
              </label>
              <input
                type="number"
                id="product-price"
                className={`${styles["form-control"]}`}
              />
            </div>

            <div className={`${styles["form-group"]}`}>
              <label className={`${styles.labels}`} htmlFor="product-stock">
                Estoque
              </label>
              <input
                type="number"
                id="product-stock"
                className={`${styles["form-control"]}`}
              />
            </div>
          </div>

          <div>
            <div className={`${styles["form-group"]}`}>
              <label className={`${styles.labels}`} htmlFor="product-category">
                Categoria
              </label>
              <select
                id="product-category"
                className={`${styles["form-control"]}`}
              >
                <option>Investimento</option>
                <option>Serviço</option>
                <option>Produto Físico</option>
              </select>
            </div>

            <div className={`${styles["form-group"]}`}>
              <label className={`${styles.labels}`} htmlFor="product-image">
                Imagem do Produto
              </label>
              <input
                type="file"
                id="product-image"
                className={`${styles["form-control"]}`}
                onChange={() => {
                  /* previewImage() */
                }}
              />
              <img id="imagePreview" className={`${styles["image-preview"]}`} />
            </div>

            <div className={`${styles["form-group"]}`}>
              <label
                className={`${styles.labels}`}
                htmlFor="product-description"
              >
                Descrição
              </label>
              <textarea
                id="product-description"
                className={`${styles["form-control"]}`}
                rows={4}
              ></textarea>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button
            className={`${styles["action-btn"]} ${styles["btn-approve"]}`}
            onClick={() => {
              /* saveProduct() */
            }}
          >
            Salvar
          </button>
          <button
            className={`${styles["action-btn"]} ${styles["btn-reject"]}`}
            onClick={() => {
              /* hideProductForm() */
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProductsDashPage;
