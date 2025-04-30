import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./assets/css/SupportCenter.module.css";

const SupportCenterPage = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null); // já abre o primeiro

  useEffect(() => {
    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href = "/assets/fontawesome/css/all.min.css";
    link2.id = "fontawesome-page-style";
    document.head.appendChild(link2);
    return () => {
      const existingLink2 = document.getElementById("fontawesome-page-style");
      if (existingLink2) {
        existingLink2.remove();
      }
    };
  }, []);

  const faqs = [
    {
      question: "Como faço meu primeiro depósito?",
      answer:
        'Acesse a seção "Depósito" no menu principal, selecione o valor e siga as instruções. Não esqueça de enviar o comprovante após realizar o pagamento.',
    },
    {
      question: "Qual o horário para solicitar retiradas?",
      answer:
        "As retiradas podem ser solicitadas de segunda a sábado, das 9h às 21h. Fora deste horário o sistema não processa pedidos.",
    },
    {
      question: "Como funciona o rendimento diário?",
      answer:
        "Seu rendimento é calculado a cada 24 horas fruto de transações vindas da bolsa de balores e creditado automaticamente em seu saldo principal. O ciclo completo dura de 30 a 60 dias, dependendo do produto.",
    },
    {
      question: "Posso ter mais de um investimento ativo?",
      answer:
        "Sim, você pode ter até 5 investimentos ativos por produto VIP. Cada produto tem seu limite independente.",
    },
    {
      question: "Como recebo meu bônus de indicação?",
      answer:
        'O bônus é creditado automaticamente em seu saldo quando seu indicado realiza o primeiro depósito. Você pode acompanhar na seção "Equipe".',
    },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Central de Suporte</h1>
          <p>Como podemos ajudar você hoje?</p>
        </div>

        <div className={styles["support-options"]}>
          <div className={styles["support-card"]}>
            <div className={styles["support-icon"]}>
              <i className="fab fa-whatsapp"></i>
            </div>
            <h2>WhatsApp</h2>
            <p>Atendimento rápido e direto pelo WhatsApp</p>
            <a
              href="https://wa.me/244923456789"
              className={styles["btn-support"]}
            >
              <i className="fab fa-whatsapp"></i> Chamar no WhatsApp
            </a>
          </div>

          <div className={styles["support-card"]}>
            <div className={styles["support-icon"]}>
              <i className="fab fa-telegram"></i>
            </div>
            <h2>Telegram</h2>
            <p>Canal oficial de comunicação</p>
            <a
              href="https://t.me/REDAi_Canal"
              className={styles["btn-support"]}
            >
              <i className="fab fa-telegram"></i> Entrar no Telegram
            </a>
          </div>

          <div className={styles["support-card"]}>
            <div className={styles["support-icon"]}>
              <i className="fas fa-users"></i>
            </div>
            <h2>Grupo de Investidores</h2>
            <p>Comunidade de investidores da RED Ai</p>
            <a
              href="https://t.me/REDAi_Canal"
              className={styles["btn-support"]}
            >
              <i className="fas fa-users"></i> Acessar Grupo
            </a>
          </div>
        </div>

        <div className={styles["faq-section"]}>
          <h2 style={{ color: "var(--secondary-color)", marginTop: 0 }}>
            Perguntas Frequentes
          </h2>
          {faqs.map((faq, index) => (
            <div className={styles["faq-item"]} key={index}>
              <div
                className={`${styles["faq-question"]} ${
                  openIndex === index ? styles.active : ""
                }`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.question}
              </div>
              <div
                className={styles["faq-answer"]}
                style={{ display: openIndex === index ? "block" : "none" }}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles["contact-info"]}>
          <h2 style={{ color: "var(--secondary-color)", marginTop: 0 }}>
            Outros Contatos
          </h2>
          <p>
            <i
              className="fas fa-envelope"
              style={{ color: "var(--secondary-color)" }}
            ></i>{" "}
            <strong>Email:</strong> suporte@redai.pt
          </p>
          <p>
            <i
              className="fas fa-phone-alt"
              style={{ color: "var(--secondary-color)" }}
            ></i>{" "}
            <strong>Telefone:</strong> +351 23 456 789
          </p>
          <p>
            <i
              className="fas fa-clock"
              style={{ color: "var(--secondary-color)" }}
            ></i>{" "}
            <strong>Horário de atendimento:</strong> 8h às 20h (segunda a
            sábado)
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
          <i className="fas fa-user"></i>
          <span>Perfil</span>
        </a>
      </div>
    </>
  );
};
export default SupportCenterPage;
