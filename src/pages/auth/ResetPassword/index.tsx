import { useEffect, useState, useTransition } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logob from "../../../assets/images/logob.png";
import { passwordReset } from "../../../api/endpoints/passwordReset";
import styles from "./assets/css/ResetPassword.module.css";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const email = queryParams.get("email");
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

  const handleResetPassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    startTransition(async () => {
      try {
        if (!token || !email) {
          setError("Falta de credenciais. Falha na redifinição de senha.");
          return;
        }
        const data = await passwordReset({
          token,
          email,
          password,
          password_confirmation: confirmPassword,
        });

        if (data.status_code === 200 && data.status === "success") {
          console.log(data);
          setMessage(data.message);
          setTimeout(() => navigate("/auth/signin"), 3000);
        } else {
          setError(
            data.message || "Erro ao redefinir a senha. Tente novamente."
          );
        }
      } catch {
        setError("Erro ao redefinir a senha. Tente novamente.");
      }
    });
  };

  return (
    <div className={styles["recover-container"]}>
      <img src={logob} alt="RED Ai" className={styles.logo} />
      <h1>Criar Nova Senha</h1>

      <div className={styles.steps}>
        <div className={styles.step}>
          <div className={styles["step-number"]}>1</div>
          <div className={styles["step-text"]}>Identificação</div>
        </div>
        <div className={styles.step}>
          <div className={styles["step-number"]}>2</div>
          <div className={styles["step-text"]}>Código</div>
        </div>
        <div className={`${styles.step} ${styles.active}`}>
          <div className={styles["step-number"]}>3</div>
          <div className={styles["step-text"]}>Nova Senha</div>
        </div>
      </div>

      <form id="newPasswordForm" onSubmit={handleResetPassword}>
        <div className={styles["form-group"]}>
          <label className={styles.labels} htmlFor="password">
            Nova Senha
          </label>
          <input
            className={styles.inputs}
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div id="passwordError" className={styles["error-message"]}></div>
        </div>

        <div className={styles["form-group"]}>
          <label className={styles.labels} htmlFor="confirmPassword">
            Confirmar Nova Senha
          </label>
          <input
            className={styles.inputs}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && (
            <div id="confirmError" className={styles["error-message"]}>
              {error}
            </div>
          )}
        </div>

        <button
          type="submit"
          className={`${styles.btn} ${isPending ? styles.loading : ""}`}
          disabled={isPending}
        >
          Atualizar Senha
        </button>

        {message && (
          <div id="successMessage" className={styles["success-message"]}>
            Senha atualizada com sucesso!{" "}
            <b>
              <a
                onClick={() => navigate("/auth/signin")}
                style={{ cursor: "pointer" }}
              >
                acesse a sua conta
              </a>
              ...
            </b>
          </div>
        )}
      </form>
    </div>
  );
};

export default ResetPasswordPage;
