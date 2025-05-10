import logob from "../../../assets/images/logob.png";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import styles from "./assets/css/SignIn.module.css";

const SignInPage = () => {
  const { login, user, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [errorCredential, setErrorCredential] = useState<string | null>(null);
  const [errorPassword, setErrorPassword] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isLoading) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    document.body.style.fontFamily =
      "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.backgroundColor = "#f5f7fa";
    document.body.style.color = "#333";
    document.body.style.lineHeight = "1.6";
    // document.body.style.display = "flex";
    // document.body.style.justifyContent = "center";
    // document.body.style.alignItems = "center";
    // document.body.style.minHeight = "100vh";

    const el = document.body;
    if (el) {
      el.style.setProperty("--primary-color", "#3498db");
      el.style.setProperty("--secondary-color", "#2c3e50");
      el.style.setProperty("--accent-color", "#e74c3c");
      el.style.setProperty("--light-color", "#ecf0f1");
      el.style.setProperty("--dark-color", "#34495e");
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
        el.style.removeProperty("--dark-color");
        el.style.removeProperty("--success-color");
      }
    };
  }, []);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = (): boolean => {
    if (!email.includes("@") && !/^\d+$/.test(email)) {
      setErrorCredential("Insira um email ou telefone válido");
      return false;
    }
    if (password.length < 6) {
      setErrorPassword("A senha deve ter pelo menos 6 caracteres");
      return false;
    }
    return true;
  };

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorCredential(null);
    const isValid = validateForm();
    if (!isValid) {
      return;
    }
    try {
      await login(email, password);
    } catch (error) {
      if (
        error ==
        "Error: Your account is not verified yet, please verify your account before logging in."
      ) {
        setError(
          "Sua conta ainda não foi verificada, verifique-a antes de fazer login."
        );
      } else {
        setError("Credenciais inválidas. Por favor, tente novamente.");
      }
    }
  };

  const handleClickSignUp = () => {
    navigate("/auth/signup");
  };

  return (
    <div className={`${styles["wrapper"]}`}>
      <div className={styles["login-container"]}>
        <img src={logob} alt="RED Ai" className={styles.logo} />
        <h1 className={styles.h1s}>
          Benvindo a RED Ai
          <br /> Acesse sua conta
        </h1>
        <form id="loginForm" onSubmit={handleSignIn}>
          <div className={styles["form-group"]}>
            <label className={styles.labels} htmlFor="email">
              Email ou Telefone
            </label>
            <input
              className={styles.inputs}
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errorCredential && (
              <div id="emailError" className={styles["error-message"]}>
                {errorCredential}
              </div>
            )}
          </div>

          <div className={styles["form-group"]}>
            <label className={styles.labels} htmlFor="password">
              Senha
            </label>
            <div className={styles["password-container"]}>
              <input
                className={styles.inputs}
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i
                className={`fas fa-eye ${styles["toggle-password"]}`}
                id="togglePassword"
                onClick={toggleShowPassword}
              ></i>
            </div>
            {errorPassword && (
              <div id="passwordError" className={styles["error-message"]}>
                {errorPassword}
              </div>
            )}
          </div>
          {error && <div>{error}</div>}

          <button type="submit" className={styles.btn}>
            Entrar
          </button>

          <div className={styles.links}>
            <a
              className={styles.as}
              onClick={() => navigate("/auth/forgot-password")}
              style={{ cursor: "pointer" }}
            >
              Esqueceu a senha?
            </a>
            <a
              className={styles.as}
              onClick={handleClickSignUp}
              style={{ cursor: "pointer" }}
            >
              Criar nova conta
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
