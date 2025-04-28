import logoc from "../../../assets/logoc.png";
import { useEffect, useState, useTransition } from "react";
import { signUp } from "../../../api/endpoints/signUp";
import { useAuth } from "../../../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";
import { inviteRequired } from "../../../api/endpoints/inviteRequired.js";
import { parsePhoneNumberFromString } from "libphonenumber-js";

type TError = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  submit: string;
  phone?: string | null;
  invite_code: string;
  iban: string;
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
    iban: "",
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
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/assets/css/signup.css";
    link.id = "signup-page-style";
    document.head.appendChild(link);

    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href = "/assets/fontawesome/css/all.min.css";
    link2.id = "fontawesome-page-style";
    document.head.appendChild(link2);

    return () => {
      const existingLink = document.getElementById("signup-page-style");
      if (existingLink) {
        existingLink.remove();
      }
      const existingLink2 = document.getElementById("fontawesome-page-style");
      if (existingLink2) {
        existingLink2.remove();
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
      } catch {
        setError((prev) => ({
          ...prev,
          submit: "Falha ao registrar",
        }));
      } finally {
        setShouldRefresh((prev) => !prev);
      }
    });
  };

  return (
    <div className="register-container">
      <img src={logoc} alt="RED Ai" className="logo" />
      <h1>Crie sua conta</h1>

      <form id="registerForm" onSubmit={handleRegister} method="POST">
        <div className="form-group">
          <label htmlFor="nome">Nome Completo*</label>
          <input
            type="text"
            id="nome"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
          {error.name && (
            <div id="nomeError" className="error-message">
              {error.name}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="telefone">Telefone*</label>
          <input
            type="tel"
            id="telefone"
            name="phone"
            maxLength={16}
            required
            value={formData.phone}
            onChange={handleChange}
          />
          {error.phone && (
            <div id="telefoneError" className="error-message">
              {error.phone}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          {error.email && (
            <div id="emailError" className="error-message">
              {error.email}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha*</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <i
              className="fas fa-eye toggle-password"
              id="togglePassword"
              onClick={toggleShowPassword}
            ></i>
          </div>
          {error.password && (
            <div id="passwordError" className="error-message">
              {error.password}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Senha*</label>
          <div className="password-container">
            <input
              type={showPasswordConfirm ? "text" : "password"}
              id="confirmPassword"
              name="password_confirmation"
              required
              value={formData.password_confirmation}
              onChange={handleChange}
            />
            <i
              className="fas fa-eye toggle-password"
              id="togglePassword"
              onClick={toggleShowPasswordConfirm}
            ></i>
          </div>
          {error.password_confirmation && (
            <div id="confirmError" className="error-message">
              {error.password_confirmation}
            </div>
          )}
        </div>
        {referralCode && (
          <div className="form-group">
            <label htmlFor="indicacao">Código de Indicação*</label>
            <input
              type="text"
              id="indicacao"
              name="invite_code"
              required
              value={formData.invite_code}
              onChange={handleChange}
            />
            {error.invite_code && (
              <div id="inviteCodeError" className="error-message">
                {error.invite_code}
              </div>
            )}
          </div>
        )}
        <span> Todos os pontos (*) são obrigatórios para o cadastro.</span>
        <button
          type="submit"
          className={`btn ${isPending ? "loading" : ""}`}
          disabled={isPending}
        >
          Cadastrar
        </button>

        {success && (
          <div id="successMessage" className="success-message">
            Cadastro realizado com sucesso! Verifique seu e-mail/telefone para
            ativar sua conta.
          </div>
        )}

        <div className="login-link">
          Já tem uma conta?{" "}
          <a
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
