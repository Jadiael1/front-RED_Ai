import logoc from "../../../assets/images/logoc.png";
import { useEffect, useState, useTransition } from "react";
import { signUp } from "../../../api/endpoints/signUp";
import { useAuth } from "../../../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";
import { inviteRequired } from "../../../api/endpoints/inviteRequired.js";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import styles from "./assets/css/SignUp.module.css";

type TError = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  submit: string;
  phone?: string | null;
  invite_code: string;
};

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] =
    useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    invite_code: "",
  });
  const [error, setError] = useState<TError>({} as TError);
  const [success, setSuccess] = useState<boolean>(false);
  const [referralCode, setReferralCode] = useState<boolean>(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    document.title = "Cadastro - RED Ai";
  }, []);

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

  useEffect(() => {
    if (user && !isLoading) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    startTransition(async () => {
      try {
        await inviteRequired();
        setReferralCode(false);
      } catch {
        setReferralCode(true);
      }
    });
  }, [shouldRefresh]);

  const validatePhone = (phone: string) => {
    // const numbers = phone.replace(/\D/g, "");
    // return numbers.length >= 10 && numbers.length <= 11;
    const parsedPhone = parsePhoneNumberFromString(phone, "AO");
    return parsedPhone
      ? parsedPhone.isValid() && parsedPhone.country === "AO"
      : false;
  };

  const formatPhone = (value: string) => {
    const phoneNumber = parsePhoneNumberFromString(value, "AO");
    if (phoneNumber && phoneNumber.isValid()) {
      return phoneNumber.formatInternational(); // Ex: +244 929 815 143
    }
    return value;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const formattedPhone = formatPhone(value);
      const isValid = validatePhone(formattedPhone);
      setFormData({
        ...formData,
        [name]: formattedPhone,
      });
      if (!isValid) {
        setError((prev) => ({
          ...prev,
          phone: "Por favor, insira um telefone válido de Angola (+244)",
        }));
      } else {
        setError((prev) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { phone, ...rest } = prev;
          return rest;
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const passwordsMatch = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError({} as TError);
    setSuccess(false);

    const formDataToSend = {
      ...formData,
      phone: formData.phone.replace(/\D/g, ""),
    };

    // Validate email and password
    if (!isValidEmail(formData.email)) {
      setError((prev) => ({
        ...prev,
        email: "Por favor, insira um e-mail válido",
      }));
      return;
    }

    if (!passwordsMatch(formData.password, formData.password_confirmation)) {
      setError((prev) => ({
        ...prev,
        password_confirmation: "As senhas não conferem",
      }));
      return;
    }

    startTransition(async () => {
      try {
        const data = await signUp(formDataToSend);
        // setLoading(false);
        if (data.status_code === 201 && data.status === "success") {
          setSuccess(true);
        } else {
          setError((prev) => ({
            ...prev,
            submit: data.message,
          }));
        }
        setShouldRefresh((prev) => !prev);
      } catch {
        setError((prev) => ({
          ...prev,
          submit: "Falha ao registrar",
        }));
      } finally {
        setFormData({
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
          phone: "",
          invite_code: "",
        });
      }
    });
  };

  return (
    <div className={styles["register-container"]}>
      <img src={logoc} alt="RED Ai" className={styles.logo} />
      <h1 className={styles.h1s}>Crie sua conta</h1>

      <form id="registerForm" onSubmit={handleRegister} method="POST">
        <div className={styles["form-group"]}>
          <label className={styles.labels} htmlFor="nome">
            Nome Completo*
          </label>
          <input
            className={styles.inputs}
            type="text"
            id="nome"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
          {error.name && (
            <div id="nomeError" className={styles["error-message"]}>
              {error.name}
            </div>
          )}
        </div>

        <div className={styles["form-group"]}>
          <label className={styles.labels} htmlFor="telefone">
            Telefone*
          </label>
          <input
            className={styles.inputs}
            type="tel"
            id="telefone"
            name="phone"
            maxLength={16}
            required
            value={formData.phone}
            onChange={handleChange}
          />
          {error.phone && (
            <div id="telefoneError" className={styles["error-message"]}>
              {error.phone}
            </div>
          )}
        </div>

        <div className={styles["form-group"]}>
          <label className={styles.labels} htmlFor="email">
            Email*
          </label>
          <input
            className={styles.inputs}
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          {error.email && (
            <div id="emailError" className={styles["error-message"]}>
              {error.email}
            </div>
          )}
        </div>

        <div className={styles["form-group"]}>
          <label className={styles.labels} htmlFor="password">
            Senha*
          </label>
          <div className={styles["password-container"]}>
            <input
              className={styles.inputs}
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <i
              className={`fas fa-eye ${styles["toggle-password"]}`}
              id="togglePassword"
              onClick={toggleShowPassword}
            ></i>
          </div>
          {error.password && (
            <div id="passwordError" className={styles["error-message"]}>
              {error.password}
            </div>
          )}
        </div>

        <div className={styles["form-group"]}>
          <label className={styles.labels} htmlFor="confirmPassword">
            Confirmar Senha*
          </label>
          <div className={styles["password-container"]}>
            <input
              className={styles.inputs}
              type={showPasswordConfirm ? "text" : "password"}
              id="confirmPassword"
              name="password_confirmation"
              required
              value={formData.password_confirmation}
              onChange={handleChange}
            />
            <i
              className={`fas fa-eye ${styles["toggle-password"]}`}
              id="togglePassword"
              onClick={toggleShowPasswordConfirm}
            ></i>
          </div>
          {error.password_confirmation && (
            <div id="confirmError" className={styles["error-message"]}>
              {error.password_confirmation}
            </div>
          )}
        </div>

        {referralCode && (
          <div className={styles["form-group"]}>
            <label className={styles.labels} htmlFor="indicacao">
              Código de Indicação*
            </label>
            <input
              className={styles.inputs}
              type="text"
              id="indicacao"
              name="invite_code"
              required
              value={formData.invite_code}
              onChange={handleChange}
            />
            {error.invite_code && (
              <div id="inviteCodeError" className={styles["error-message"]}>
                {error.invite_code}
              </div>
            )}
          </div>
        )}

        <span className={styles.spans}>
          {" "}
          Todos os pontos (*) são obrigatórios para o cadastro.
        </span>

        <button
          type="submit"
          className={`${styles.btn} ${isPending ? styles.loading : ""}`}
          disabled={isPending}
        >
          Cadastrar
        </button>

        {success && (
          <div id="successMessage" className={styles["success-message"]}>
            Cadastro realizado com sucesso! Verifique seu e-mail/telefone para
            ativar sua conta.
          </div>
        )}

        <div className={styles["login-link"]}>
          Já tem uma conta?{" "}
          <a
            className={styles.as}
            onClick={() => {
              navigate("/auth/signin");
            }}
            style={{ cursor: "pointer" }}
          >
            Faça login
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
