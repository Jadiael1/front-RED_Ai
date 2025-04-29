import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const AccountManagementPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/assets/css/accountmanagement.css";
    link.id = "accountmanagement-page-style";
    document.head.appendChild(link);

    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href = "/assets/fontawesome/css/all.min.css";
    link2.id = "fontawesome-page-style";
    document.head.appendChild(link2);

    return () => {
      const existingLink = document.getElementById(
        "accountmanagement-page-style"
      );
      if (existingLink) {
        existingLink.remove();
      }
      const existingLink2 = document.getElementById("fontawesome-page-style");
      if (existingLink2) {
        existingLink2.remove();
      }
    };
  }, []);

  return (
    <>
      <div className="container">
        <div className="header">
          <h1>Gestão da Minha Conta</h1>
          <p>
            Gerencie suas informações pessoais e segurança <br />O fornecimento
            de dados falsos compromete o estado da sua conta.
          </p>
        </div>

        {/* <!-- Seção de Informações Pessoais --> */}
        <div className="account-section">
          <div className="section-title">
            <i className="fas fa-user-circle"></i> Informações Pessoais
          </div>

          <form id="personal-info-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="full-name">Nome Completo</label>
                <input
                  type="text"
                  id="full-name"
                  value="Nelo Designer"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Telefone</label>
                <input
                  type="tel"
                  id="phone"
                  value="+244 923 456 789"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value="nelo@email.com" required />
            </div>

            <button type="submit" className="btn">
              Salvar Alterações
            </button>
          </form>
        </div>

        {/* <!-- Seção de Conta Bancária --> */}
        <div className="account-section">
          <div className="section-title">
            <i className="fas fa-university"></i> Conta Bancária para Retiradas
          </div>

          <form id="bank-account-form">
            <div className="form-group">
              <label htmlFor="iban">IBAN (21 dígitos)</label>
              <input
                type="text"
                id="iban"
                className="iban-input"
                placeholder="AO060055000092345672101"
                maxLength={21}
                pattern="[0-9]{21}"
                required
              />
              <small>
                Somente números, sem espaços ou caracteres especiais
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="bank-name">Banco</label>
              <select id="bank-name" required>
                <option value="">Selecione seu banco</option>
                <option value="BAI" selected>
                  BAI - Banco Angolano de Investimentos
                </option>
                <option value="BPC">BPC - Banco de Poupança e Crédito</option>
                <option value="BFA">BFA - Banco de Fomento Angola</option>
                <option value="BCI">
                  BCI - Banco Comercial e de Investimentos
                </option>
                <option value="other">Outro</option>
              </select>
            </div>

            <button type="submit" className="btn">
              Atualizar Dados Bancários
            </button>
          </form>
        </div>

        {/* <!-- Seção de Segurança --> */}
        <div className="account-section">
          <div className="section-title">
            <i className="fas fa-shield-alt"></i> Segurança
          </div>

          <form id="password-form">
            <div className="form-group">
              <label htmlFor="current-password">Senha Atual</label>
              <input type="password" id="current-password" required />
            </div>

            <div className="form-group">
              <label htmlFor="new-password">Nova Senha</label>
              <input type="password" id="new-password" required />
              <div className="password-strength">
                <div className="strength-bar" id="strength-bar"></div>
              </div>
              <small>
                A senha deve ter pelo menos 8 caracteres, incluindo números e
                letras
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password">Confirmar Nova Senha</label>
              <input type="password" id="confirm-password" required />
            </div>

            <button type="submit" className="btn">
              Alterar Senha
            </button>
          </form>
        </div>

        {/* <!-- Seção de Logout --> */}
        <div className="account-section">
          <div className="section-title">
            <i className="fas fa-sign-out-alt"></i> Sessão
          </div>

          <button
            onClick={() => logout()}
            id="logout-btn"
            className="btn btn-danger"
          >
            <i className="fas fa-sign-out-alt"></i> Terminar Sessão
          </button>

          <div
            style={{ marginTop: "15px", fontSize: "14px", color: "#7f8c8d" }}
          >
            <i className="fas fa-info-circle"></i> Último login: 15/04/2025 às
            14:30
          </div>
        </div>
      </div>

      {/* <!-- Menu de navegação inferior --> */}
      <div className="footer-nav">
        <a
          onClick={() => navigate("/profile")}
          style={{ cursor: "pointer" }}
          className="nav-item"
        >
          <i className="fas fa-user"></i>
          <span>Perfil</span>
        </a>
      </div>
    </>
  );
};
export default AccountManagementPage;
