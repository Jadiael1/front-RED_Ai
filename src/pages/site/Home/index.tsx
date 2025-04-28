import { useEffect, useState, useCallback } from "react";
import banner1 from "./assets/imgs/banner1.png";
import banner2 from "./assets/imgs/banner2.png";
import banner3 from "./assets/imgs/banner3.png";
import logoc from "./assets/imgs/logoc.png";
import { useNavigate } from "react-router-dom";

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
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/assets/css/HomePage.css";
    link.id = "home-page-style";
    document.head.appendChild(link);

    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href = "/assets/fontawesome/css/all.min.css";
    link2.id = "fontawesome-page-style";
    document.head.appendChild(link2);

    return () => {
      const existingLink = document.getElementById("home-page-style");
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
        <div className="header">
          <img src={logoc} alt="RED Ai" className="logo" />
          <h1 style={{ color: "var(--secondary-color)" }}>BENVINDO A RED Ai</h1>
        </div>

        {/* <!-- Slideshow de Imagens --> */}
        <div className="slideshow-container">
          {slidesData.map((slide, index) => (
            <img
              key={index}
              src={slide.src}
              alt={slide.alt}
              className="slide"
              style={{ display: index === slideIndex ? "block" : "none" }}
            />
          ))}
        </div>

        {/* <!-- Texto Dinâmico --> */}
        <div className="news-ticker">
          <div className="ticker-content">
            🚀 Últimas notícias: Sistema de indicações com bônus de até 30% •
            Novo produto VIP disponível • Horário de retiradas: Seg-Sáb das 9h
            às 21h
          </div>
        </div>

        {/* <!-- Botões de Ação --> */}
        <div className="action-buttons">
          <button className="action-btn" onClick={() => handleActionClick("/")}>
            <i className="fas fa-money-bill-wave"></i>
            <span className="action-label">DEPÓSITO</span>
          </button>
          <button className="action-btn" onClick={() => handleActionClick("/")}>
            <i className="fas fa-wallet"></i>
            <span className="action-label">RETIRADA</span>
          </button>
          <button className="action-btn" onClick={() => handleActionClick("/")}>
            <i className="fas fa-headset"></i>
            <span className="action-label">SUPORTE</span>
          </button>
        </div>

        {/* <!-- Últimos Investidores --> */}
        <div className="recent-users">
          <h2 className="section-title">ÚLTIMOS INVESTIDORES</h2>
          <div className="user-list">
            {usersData.map((user, index) => (
              <div className="user-item" key={index}>
                <span>{user.phoneMasked}</span>
                <span>{user.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Menu de navegação inferior */}
      <div className="footer-nav">
        <a
          onClick={() => handleActionClick("/")}
          style={{ cursor: "pointer" }}
          className="nav-item active"
        >
          <i className="fas fa-home"></i>
          <span>Home</span>
        </a>
        <a
          onClick={() => handleActionClick("/products")}
          style={{ cursor: "pointer" }}
          className="nav-item"
        >
          <i className="fas fa-box"></i>
          <span>Produtos</span>
        </a>
        <a
          onClick={() => handleActionClick("/teams")}
          style={{ cursor: "pointer" }}
          className="nav-item "
        >
          <i className="fas fa-network-wired"></i>
          <span>Equipe</span>
        </a>
        <a
          onClick={() => handleActionClick("/profile")}
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

export default HomePage;
