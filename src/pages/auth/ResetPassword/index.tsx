import { useState, useTransition, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logob from "../../../assets/logob.png";
import { passwordReset } from "../../../api/endpoints/passwordReset";

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
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/public/assets/css/resetPassword.css";
    link.id = "resetpassword-page-style";
    document.head.appendChild(link);

    return () => {
      const existingLink = document.getElementById("resetpassword-page-style");
      if (existingLink) {
        existingLink.remove();
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
    <div className="recover-container">
      <img src={logob} alt="RED Ai" className="logo" />
      <h1>Criar Nova Senha</h1>

      <div className="steps">
        <div className="step">
          <div className="step-number">1</div>
          <div className="step-text">Identificação</div>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <div className="step-text">Código</div>
        </div>
        <div className="step active">
          <div className="step-number">3</div>
          <div className="step-text">Nova Senha</div>
        </div>
      </div>

      <form id="newPasswordForm" onSubmit={handleResetPassword}>
        <div className="form-group">
          <label htmlFor="password">Nova Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div id="passwordError" className="error-message"></div>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Nova Senha</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && (
            <div id="confirmError" className="error-message">
              {error}
            </div>
          )}
        </div>

        <button
          type="submit"
          className={`btn ${isPending ? "loading" : ""}`}
          disabled={isPending}
        >
          Atualizar Senha
        </button>

        {message && (
          <div id="successMessage" className="success-message">
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
