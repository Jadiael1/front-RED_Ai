import { useEffect, useState, useCallback } from "react";
import banner1 from "../../../assets/images/banner1.png";
import banner2 from "../../../assets/images/banner2.png";
import banner3 from "../../../assets/images/banner3.png";
import logoc from "../../../assets/images/logoc.png";
import { useNavigate } from "react-router-dom";
import styles from "./assets/css/Home.module.css";
import {
  getLatestInvestors,
  TTLatestInvestorsData,
} from "../../../api/endpoints/latestInvestors";

interface Slide {
  src: string;
  alt: string;
}

const slidesData: Slide[] = [
  { src: banner1, alt: "Banner 1" },
  { src: banner2, alt: "Banner 2" },
  { src: banner3, alt: "Banner 3" },
];

const HomePage = () => {
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [latestInvestors, setLatestInvestors] = useState<
    TTLatestInvestorsData[] | null
  >(null);
  const navigate = useNavigate();

  const nextSlide = useCallback(() => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
  }, []);

  useEffect(() => {
    (async () => {
      const response = await getLatestInvestors();
      setLatestInvestors(response.data);
    })();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 3000);
    return () => clearInterval(intervalId);
  }, [nextSlide]);

  useEffect(() => {
    document.body.style.fontFamily =
      "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    document.body.style.margin = "0";
    document.body.style.padding = "0 0 80px 0";
    document.body.style.backgroundColor = "#f5f7fa";
    document.body.style.color = "#333";
    document.body.style.lineHeight = "1.6";
    document.body.style.fontSize = "12px";

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
      document.body.style.fontSize = "";

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
      <div className={`${styles.container}`}>
        <div className={`${styles.header}`}>
          <img src={logoc} alt="RED Ai" className={`${styles.logo}`} />
          <h1 style={{ color: "var(--secondary-color)" }}>BENVINDO A RED Ai</h1>
        </div>

        {/* <!-- Slideshow de Imagens --> */}
        <div className={`${styles["slideshow-container"]}`}>
          {slidesData.map((slide, index) => (
            <img
              key={index}
              src={slide.src}
              alt={slide.alt}
              className={`${styles.slide}`}
              style={{ display: index === slideIndex ? "block" : "none" }}
            />
          ))}
        </div>

        {/* <!-- Texto Dinâmico --> */}
        <div className={`${styles["news-ticker"]}`}>
          <div className={`${styles["ticker-content"]}`}>
            🚀 Últimas notícias: Sistema de indicações com bônus de até 30% •
            Novo produto VIP disponível • Horário de retiradas: Seg-Sáb das 9h
            às 21h
          </div>
        </div>

        {/* <!-- Botões de Ação --> */}
        <div className={`${styles["primary-actions"]}`}>
          <button
            className={`${styles["action-btn"]}`}
            onClick={() => {
              navigate("/deposit");
              /* window.location.href='../secundarias/deposito.html' */
            }}
          >
            <i className={`fas fa-money-bill-wave ${styles.is}`}></i>
            <span className={`${styles["action-label"]}`}>DEPÓSITO</span>
          </button>
          <button
            className={`${styles["action-btn"]}`}
            onClick={() => {
              navigate("/remove");
              /* window.location.href='../secundarias/retirada.html' */
            }}
          >
            <i className={`fas fa-wallet ${styles.is}`}></i>
            <span className={`${styles["action-label"]}`}>RETIRADA</span>
          </button>
          <button
            className={`${styles["action-btn"]}`}
            onClick={() => {
              navigate("/support-center");
              /* window.location.href='../secundarias/suporte.html' */
            }}
          >
            <i className={`fas fa-headset ${styles.is}`}></i>
            <span className={`${styles["action-label"]}`}>SUPORTE</span>
          </button>
        </div>

        {/* <!-- Últimos Investidores --> */}
        <div className={`${styles.recent}`}>
          <h2 className={`${styles["section-title"]}`}>ÚLTIMOS INVESTIDORES</h2>
          <div className={`${styles["user-list"]}`}>
            {latestInvestors &&
              latestInvestors.map((latestInvestor, index) => (
                <div className={`${styles["user-item"]}`} key={index}>
                  <span>{latestInvestor.phone}</span>
                  <span>{latestInvestor.total_invested} kz</span>
                </div>
              ))}
          </div>
        </div>

        {/* <!-- Seção de Comunicados --> */}
        <div className={`${styles.recent}`}>
          <h2 className={`${styles["section-title"]}`}>COMUNICADOS</h2>
          <div className={`${styles["announcement-list"]}`}>
            <div className={`${styles["announcement-item"]}`}>
              <h3 className={`${styles.h3s}`}>Manutenção Periódica</h3>
              <p className={`${styles["announcement-date"]}`}>15/05/2025</p>
              <p>
                Em certos momentos havendo a necessidade de manutenção regular
                no funcionamento do sistema, o site poderá estar <i>off-line</i>
                , mas sem interrupção no processamento normal do seus
                investimentos, e toda e qualquer manutenção haverá um aviso
                prévio.
                <b />
              </p>
            </div>
            <div className={`${styles["announcement-item"]}`}>
              <h3 className={`${styles.h3s}`}>Transações</h3>
              <p className={`${styles["announcement-date"]}`}>01/05/2025</p>
              <p> Você precisa saber isso, os termos ~do nosso</p>
              <li>
                Depósitos:
                <ol>
                  <li>Horário de processamento: 6h às 21h, diariamente.</li>
                  <li>Comprovante (pdf) deve ser enviado para análise.</li>
                </ol>
              </li>
              <li>
                Retiradas:
                <ol>
                  <li>Horário: 9h às 21h, de segunda a sábado.</li>
                  <li>Taxa administrativa de 10% sobre o valor sacado.</li>
                  <li>Limite mínimo: 2.500 kz; máximo: 500.000 kz por dia.</li>
                  <li>
                    Tanto o depósito e a retirada são processados dentro de 24h
                    no máximo.
                  </li>
                </ol>
              </li>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Menu de navegação inferior --> */}
      <div className={`${styles["footer-nav"]}`}>
        <a
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
          className={`${styles["nav-item"]} ${styles.active}`}
        >
          <i className={`fas fa-home ${styles.is}`}></i>
          <span>Home</span>
        </a>
        <a
          onClick={() => navigate("/products")}
          style={{ cursor: "pointer" }}
          className={`${styles["nav-item"]}`}
        >
          <i className={`fas fa-box ${styles.is}`}></i>
          <span>Produtos</span>
        </a>
        <a
          onClick={() => navigate("/teams")}
          style={{ cursor: "pointer" }}
          className={`${styles["nav-item"]}`}
        >
          <i className={`fas fa-network-wired ${styles.is}`}></i>
          <span>Equipe</span>
        </a>
        <a
          onClick={() => navigate("/profile")}
          style={{ cursor: "pointer" }}
          className={`${styles["nav-item"]}`}
        >
          <i className={`fas fa-user ${styles.is}`}></i>
          <span>Perfil</span>
        </a>
      </div>
    </>
  );
};

export default HomePage;
