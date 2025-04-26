import { useState, useTransition } from "react";
import logob from "../../../assets/logob.png";
import "./forgotPassword.css";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../api/endpoints/forgotPassword";

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
      <div className="recover-container">
        <img src={logob} alt="RED Ai" className="logo" />
        <h1>Recuperação de Senha</h1>

        <div className="steps">
          <div className="step active">
            <div className="step-number">1</div>
            <div className="step-text">Identificação</div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-text">Código</div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-text">Nova Senha</div>
          </div>
        </div>

        <form id="recoverForm" onSubmit={handleForgotPassword} method="POST">
          <div className="form-group">
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
              <div id="emailError" className="error-message">
                {error}
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`btn ${isPending ? "loading" : ""}`}
            disabled={isPending}
          >
            Continuar
          </button>
          {message && (
            <div id="successMessage" className="success-message">
              Enviamos um código de verificação para seu email/telefone.
              Verifuqie seu e-mail/telefone
            </div>
          )}

          <div className="login-link">
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
