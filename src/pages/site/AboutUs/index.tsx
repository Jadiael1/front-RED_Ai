import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./assets/css/AboutUs.module.css";
import logoc from "../../../assets/images/logoc.png";

const AboutUsPage = () => {
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
      el.style.setProperty("--primary-color", "#e74c3c");
      el.style.setProperty("--secondary-color", "#2c3e50");
      el.style.setProperty("--light-color", "#ecf0f1");
      el.style.setProperty("--dark-color", "#34495e");
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
        el.style.removeProperty("--light-color");
        el.style.removeProperty("--dark-color");
      }
    };
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <img src={logoc} alt="RED Ai" className={styles.logo} />
          <h1 className={styles.h1s}>RED Ai</h1>
          <p>Sua ponte para o crescimento financeiro inteligente.</p>
        </div>

        <div className={styles["content-section"]}>
          <h2 className={styles["section-title"]}>Nossa História</h2>
          <p>
            A RED Ai nasceu em 2024 com a missão de democratizar o acesso a
            investimentos de capital no mercado angolano. Fundada por uma equipe
            de especialistas em finanças e tecnologia, nossa plataforma foi
            desenvolvida para oferecer oportunidades de crescimento financeiro
            acessíveis a todos.
          </p>

          <p>
            O nome "RED Ai" representa nossa rede de oportunidades e a
            facilidade de acesso - basta clicar e seu dinheiro começa a
            trabalhar para você.
          </p>
        </div>

        <div className={styles["content-section"]}>
          <h2 className={styles["section-title"]}>Nossa Missão</h2>
          <p>Transformar a relação das pessoas com o dinheiro, oferecendo:</p>
          <ul>
            <li>Produtos de investimento transparentes</li>
            <li>Rentabilidade diária garantida</li>
            <li>Plataforma 100% digital e segura</li>
            <li>Educação financeira acessível</li>
          </ul>
        </div>

        <div className={styles["content-section"]}>
          <h2 className={styles["section-title"]}>Nossos Valores</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
            <div
              style={{
                flex: 1,
                minWidth: "200px",
                background: "#f8f9fa",
                padding: "15px",
                borderRadius: "8px",
                borderLeft: "4px solid var(--primary-color)",
              }}
            >
              <h3 style={{ marginTop: 0, color: "var(--primary-color)" }}>
                Transparência
              </h3>
              <p>Todas as taxas e condições claramente informadas</p>
            </div>
            <div
              style={{
                flex: 1,
                minWidth: "200px",
                background: "#f8f9fa",
                padding: "15px",
                borderRadius: "8px",
                borderLeft: "4px solid var(--primary-color)",
              }}
            >
              <h3 style={{ marginTop: 0, color: "var(--primary-color)" }}>
                Segurança
              </h3>
              <p>
                Tecnologia de ponta para proteger seus dados e investimentos
              </p>
            </div>
            <div
              style={{
                flex: 1,
                minWidth: "200px",
                background: "#f8f9fa",
                padding: "15px",
                borderRadius: "8px",
                borderLeft: "4px solid var(--primary-color)",
              }}
            >
              <h3 style={{ marginTop: 0, color: "var(--primary-color)" }}>
                Inovação
              </h3>
              <p>Soluções financeiras simples e eficientes</p>
            </div>
          </div>
        </div>

        <div className={styles["content-section"]}>
          <h2 className={styles["section-title"]}>Como Funciona</h2>
          <p>
            Na RED Ai, você investe em nossos Planos VIP que oferecem rendimento
            diário. Cada produto tem:
          </p>
          <ul>
            <li>Valor de investimento inicial claro</li>
            <li>Renda diária garantida (de 7% a 10%)</li>
            <li>Ciclo definido (30-60 dias)</li>
            <li>Limite de 5 investimentos por produto</li>
          </ul>
          <p>
            Seu dinheiro rende automaticamente todos os dias, e você pode
            acompanhar tudo pelo nosso aplicativo ou site.
          </p>
        </div>

        <div className={styles["content-section"]}>
          <h2 className={styles["section-title"]}>Fale Conosco</h2>
          <p>Estamos sempre disponíveis para ajudar:</p>
          <p>
            <i
              className="fas fa-envelope"
              style={{ color: "var(--primary-color)" }}
            ></i>{" "}
            <strong>Email:</strong> suporte@redai.ao
          </p>
          <p>
            <i
              className="fas fa-phone-alt"
              style={{ color: "var(--primary-color)" }}
            ></i>{" "}
            <strong>Telefone:</strong> +244 923 456 789
          </p>
          <p>
            <i
              className="fab fa-whatsapp"
              style={{ color: "var(--primary-color)" }}
            ></i>{" "}
            <strong>WhatsApp:</strong> +244 923 456 789
          </p>
        </div>
      </div>

      {/* <!-- Menu de navegação inferior --> */}
      <div className={styles["footer-nav"]}>
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
export default AboutUsPage;
