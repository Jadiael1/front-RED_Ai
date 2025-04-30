import { useEffect, useState, useCallback } from "react";
import banner1 from "../../../assets/images/banner1.png";
import banner2 from "../../../assets/images/banner2.png";
import banner3 from "../../../assets/images/banner3.png";
import logoc from "../../../assets/images/logoc.png";
import { useNavigate } from "react-router-dom";
import styles from "./assets/css/Home.module.css";

interface Slide {
  src: string;
  alt: string;
}

interface User {
  phoneMasked: string;
  amount: string;
}

const slidesData: Slide[] = [
  { src: banner1, alt: "Banner 1" },
  { src: banner2, alt: "Banner 2" },
  { src: banner3, alt: "Banner 3" },
];

const usersData: User[] = [
  { phoneMasked: "92*****09", amount: "100.000 kz" },
  { phoneMasked: "91*****34", amount: "75.000 kz" },
  { phoneMasked: "93*****21", amount: "150.000 kz" },
  { phoneMasked: "92*****45", amount: "50.000 kz" },
  { phoneMasked: "91*****67", amount: "200.000 kz" },
  { phoneMasked: "91*****89", amount: "350.000 kz" },
];

const HomePage = () => {
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const navigate = useNavigate();

  const nextSlide = useCallback(() => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 3000);
    return () => clearInterval(intervalId);
  }, [nextSlide]);

  const handleActionClick = (path: string) => {
    navigate(path);
  };

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

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <img src={logoc} alt="RED Ai" className={styles.logo} />
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
        <div className={`${styles["action-buttons"]}`}>
          <button
            className={`${styles["action-btn"]}`}
            onClick={() => handleActionClick("/")}
          >
            <i className="fas fa-money-bill-wave"></i>
            <span className={`${styles["action-label"]}`}>DEPÓSITO</span>
          </button>
          <button
            className={`${styles["action-btn"]}`}
            onClick={() => handleActionClick("/")}
          >
            <i className="fas fa-wallet"></i>
            <span className={`${styles["action-label"]}`}>RETIRADA</span>
          </button>
          <button
            className={`${styles["action-btn"]}`}
            onClick={() => handleActionClick("/")}
          >
            <i className="fas fa-headset"></i>
            <span className={`${styles["action-label"]}`}>SUPORTE</span>
          </button>
        </div>

        {/* <!-- Últimos Investidores --> */}
        <div className={`${styles["recent-users"]}`}>
          <h2 className={`${styles["section-title"]}`}>ÚLTIMOS INVESTIDORES</h2>
          <div className={`${styles["user-list"]}`}>
            {usersData.map((user, index) => (
              <div className={`${styles["user-item"]}`} key={index}>
                <span>{user.phoneMasked}</span>
                <span>{user.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Menu de navegação inferior */}
      <div className={`${styles["footer-nav"]}`}>
        <a
          onClick={() => handleActionClick("/")}
          style={{ cursor: "pointer" }}
          className={`${styles["nav-item"]} ${styles.active}`}
        >
          <i className="fas fa-home"></i>
          <span>Home</span>
        </a>
        <a
          onClick={() => handleActionClick("/products")}
          style={{ cursor: "pointer" }}
          className={`${styles["nav-item"]}`}
        >
          <i className="fas fa-box"></i>
          <span>Produtos</span>
        </a>
        <a
          onClick={() => handleActionClick("/teams")}
          style={{ cursor: "pointer" }}
          className={`${styles["nav-item"]}`}
        >
          <i className="fas fa-network-wired"></i>
          <span>Equipe</span>
        </a>
        <a
          onClick={() => handleActionClick("/profile")}
          style={{ cursor: "pointer" }}
          className={`${styles["nav-item"]}`}
        >
          <i className="fas fa-user"></i>
          <span>Perfil</span>
        </a>
      </div>
    </>
  );
};

export default HomePage;
