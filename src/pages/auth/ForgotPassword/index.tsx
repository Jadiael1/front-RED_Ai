import { useEffect, useState, useTransition } from "react";
import logob from "../../../assets/images/logob.png";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../api/endpoints/forgotPassword";
import styles from "./assets/css/ForgotPassword.module.css";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    document.body.style.fontFamily =
      "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.backgroundColor = "#f5f7fa";
    document.body.style.color = "#333";
    document.body.style.lineHeight = "1.6";
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
    document.body.style.minHeight = "100vh";

    const el = document.body;
    if (el) {
      el.style.setProperty("--primary-color", "#3498db");
      el.style.setProperty("--secondary-color", "#2c3e50");
      el.style.setProperty("--accent-color", "#e74c3c");
      el.style.setProperty("--light-color", "#ecf0f1");
      el.style.setProperty("--success-color", "#2ecc71");
    }

    return () => {
      document.body.style.fontFamily = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
      document.body.style.lineHeight = "";
      document.body.style.display = "";
      document.body.style.justifyContent = "";
      document.body.style.alignItems = "";
      document.body.style.minHeight = "";

      if (el) {
        el.style.removeProperty("--primary-color");
        el.style.removeProperty("--secondary-color");
        el.style.removeProperty("--accent-color");
        el.style.removeProperty("--light-color");
        el.style.removeProperty("--success-color");
      }
    };
  }, []);

  const handleForgotPassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    // setIsLoading(true);
    startTransition(async () => {
      try {
        const data = await forgotPassword({ email });

        if (
          data.status_code === 200 &&
          data.message === "We have emailed your password reset link!"
        ) {
          setMessage(data.message);
        } else {
          setError(data.message || "Erro ao enviar o e-mail. Tente novamente.");
        }
      } catch {
        setError("Erro ao enviar o e-mail. Tente novamente.");
      }
    });
  };

  return (
    <>
      <div className={styles["recover-container"]}>
        <img src={logob} alt="RED Ai" className={styles.logo} />
        <h1 className={styles.h1s}>Recuperação de Senha</h1>

        <div className={styles.steps}>
          <div className={`${styles.step} ${styles.active}`}>
            <div className={styles["step-number"]}>1</div>
            <div className={styles["step-text"]}>Identificação</div>
          </div>
          <div className={styles.step}>
            <div className={styles["step-number"]}>2</div>
            <div className={styles["step-text"]}>Código</div>
          </div>
          <div className={styles.step}>
            <div className={styles["step-number"]}>3</div>
            <div className={styles["step-text"]}>Nova Senha</div>
          </div>
        </div>

        <form id="recoverForm" onSubmit={handleForgotPassword} method="POST">
          <div className={styles["form-group"]}>
            <label className={styles.labels} htmlFor="email">
              Email ou Telefone Cadastrado
            </label>
            <input
              className={styles.inputs}
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && (
              <div id="emailError" className={styles["error-message"]}>
                {error}
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`${styles.btn} ${isPending ? styles.loading : ""}`}
            disabled={isPending}
          >
            Continuar
          </button>

          {message && (
            <div id="successMessage" className={styles["success-message"]}>
              Enviamos um código de verificação para seu email/telefone.
              Verifuqie seu e-mail/telefone
            </div>
          )}

          <div className={styles["login-link"]}>
            Lembrou sua senha?{" "}
            <a
              className={styles.as}
              onClick={() => navigate("/auth/signin")}
              style={{ cursor: "pointer" }}
            >
              Faça login
            </a>
          </div>
        </form>
      </div>
    </>
  );
};
export default ForgotPasswordPage;
