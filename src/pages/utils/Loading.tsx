import { useEffect } from "react";
const LoadingPage = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/assets/css/loading.css";
    link.id = "loading-page-style";
    document.head.appendChild(link);

    return () => {
      const existingLink = document.getElementById("loading-page-style");
      if (existingLink) {
        existingLink.remove();
      }
    };
  }, []);

  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Carregando ...</p>
    </div>
  );
};

export default LoadingPage;
