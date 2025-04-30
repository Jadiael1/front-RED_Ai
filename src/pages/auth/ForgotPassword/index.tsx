import { useState, useTransition } from "react";
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
        <h1>Recuperação de Senha</h1>

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
            <label htmlFor="email">Email ou Telefone Cadastrado</label>
            <input
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
