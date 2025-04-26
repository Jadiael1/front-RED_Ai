import "./signup.css";
import logob from "../../../assets/logob.png";
import "../../../assets/fontawesome/css/all.min.css";
import { useEffect, useState, useTransition } from "react";
import { signUp } from "../../../api/endpoints/signUp";
import { useAuth } from "../../../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";
import { inviteRequired } from "../../../api/endpoints/inviteRequired.js";

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
    if (user && !isLoading) {
      navigate("/profile");
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
    const numbers = phone.replace(/\D/g, "");
    return numbers.length >= 10 && numbers.length <= 11;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    const isValid = validatePhone(numbers);
    if (!isValid) {
      setError((prev) => ({
        ...prev,
        phone: "Por favor, insira um telefone válido",
      }));
    } else {
      setError((prev) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { phone, ...rest } = prev;
        return rest;
      });
    }

    return numbers.replace(
      /^(\d{0,2})(\d{0,5})(\d{0,4}).*/,
      (_, g1, g2, g3) => {
        if (!g2) return g1;
        if (!g3) return `(${g1}) ${g2}`;
        return `(${g1}) ${g2}-${g3}`;
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setFormData({
        ...formData,
        [name]: formatPhone(value),
      });
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
      <img src={logob} alt="RED Aí Investimentos" className="logo" />
      <h1>Crie sua conta</h1>

      <form id="registerForm" onSubmit={handleRegister} method="POST">
        <div className="form-group">
          <label htmlFor="nome">Nome Completo</label>
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
          <label htmlFor="telefone">Telefone</label>
          <input
            type="tel"
            id="telefone"
            name="phone"
            required
            maxLength={15}
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
          <label htmlFor="email">Email</label>
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
          <label htmlFor="password">Senha</label>
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
          <label htmlFor="confirmPassword">Confirmar Senha</label>
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
            <label htmlFor="indicacao">Código de Indicação</label>
            <input
              type="text"
              id="indicacao"
              name="invite_code"
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
        <div className="form-group">
          <label htmlFor="iban">Iban</label>
          <input
            type="text"
            id="iban"
            name="iban"
            value={formData.iban}
            onChange={handleChange}
          />
          {error.iban && (
            <div id="ibanError" className="error-message">
              {error.iban}
            </div>
          )}
        </div>

        <button
          type="submit"
          className={`btn ${isPending ? "loading" : ""}`}
          disabled={isPending}
        >
          Cadastrar
        </button>

        {success && (
          <div id="successMessage" className="success-message">
            Cadastro realizado com sucesso! Verifique seu e-mail para ativar sua
            conta, e em seguida acesse a pagina de{" "}
            <b>
              <a
                onClick={() => {
                  navigate("/auth/signin");
                }}
                style={{ cursor: "pointer" }}
              >
                Login
              </a>
            </b>
          </div>
        )}

        {error.submit && (
          <div id="submitError" className="error-message">
            {error.submit}
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
