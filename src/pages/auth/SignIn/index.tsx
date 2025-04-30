import logob from "../../../assets/logob.png";
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
      console.log(error);
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
    <div className={styles["login-container"]}>
      <img src={logob} alt="RED Ai" className={styles.logo} />
      <h1>
        Benvindo a RED Ai
        <br /> Acesse sua conta
      </h1>
      <form id="loginForm" onSubmit={handleSignIn}>
        <div className={styles["form-group"]}>
          <label htmlFor="email">Email ou Telefone</label>
          <input
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
          <label htmlFor="password">Senha</label>
          <div className={styles["password-container"]}>
            <input
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
            onClick={() => navigate("/auth/forgot-password")}
            style={{ cursor: "pointer" }}
          >
            Esqueceu a senha?
          </a>
          <a onClick={handleClickSignUp} style={{ cursor: "pointer" }}>
            Criar nova conta
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
