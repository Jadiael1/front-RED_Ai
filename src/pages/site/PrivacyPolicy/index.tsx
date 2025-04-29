import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/assets/css/privacypolicy.css";
    link.id = "privacypolicy-page-style";
    document.head.appendChild(link);

    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href = "/assets/fontawesome/css/all.min.css";
    link2.id = "fontawesome-page-style";
    document.head.appendChild(link2);

    return () => {
      const existingLink = document.getElementById("privacypolicy-page-style");
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
          <h1>Política de Privacidade</h1>
          <p>RED Aí Investimentos - Última atualização: 15/03/2023</p>
        </div>

        <div className="privacy-content">
          <div className="highlight-box">
            <p>
              <strong>Importante:</strong> Esta política descreve como
              coletamos, usamos e protegemos suas informações pessoais.
            </p>
          </div>

          <h2 className="section-title">1. Informações que Coletamos</h2>
          <p>Para fornecer nossos serviços, coletamos:</p>
          <ul>
            <li>
              <strong>Dados cadastrais:</strong> Nome completo, telefone e
              e-mail
            </li>
            <li>
              <strong>Dados financeiros:</strong> Informações bancárias (IBAN),
              histórico de transações
            </li>
            <li>
              <strong>Dados de acesso:</strong> Endereço IP, logs de acesso,
              cookies
            </li>
            <li>
              <strong>Documentos:</strong> Cópia do BI e comprovante de
              residência quando necessário
            </li>
          </ul>

          <h2 className="section-title">2. Como Usamos Suas Informações</h2>
          <p>Utilizamos seus dados para:</p>
          <ul>
            <li>Fornecer e melhorar nossos serviços</li>
            <li>Processar transações financeiras</li>
            <li>Verificar sua identidade e prevenir fraudes</li>
            <li>Enviar comunicações importantes sobre sua conta</li>
            <li>Cumprir obrigações legais e regulatórias</li>
          </ul>

          <h2 className="section-title">3. Compartilhamento de Dados</h2>
          <p>Seus dados podem ser compartilhados com:</p>
          <ul>
            <li>
              <strong>Parceiros financeiros:</strong> Bancos e instituições de
              pagamento para processar transações
            </li>
            <li>
              <strong>Autoridades reguladoras:</strong> Quando exigido por lei
            </li>
            <li>
              <strong>Prestadores de serviço:</strong> Empresas que nos auxiliam
              na operação (com contratos de confidencialidade)
            </li>
          </ul>
          <p>
            <strong>Não vendemos</strong> seus dados pessoais a terceiros.
          </p>

          <h2 className="section-title">4. Segurança de Dados</h2>
          <p>Implementamos medidas robustas para proteger suas informações:</p>
          <ul>
            <li>Criptografia SSL em todas as comunicações</li>
            <li>Armazenamento seguro em servidores protegidos</li>
            <li>Controle de acesso restrito aos dados</li>
            <li>Monitoramento contínuo contra ameaças</li>
          </ul>

          <h2 className="section-title">5. Seus Direitos</h2>
          <p>Você tem direito a:</p>
          <ul>
            <li>Acessar e corrigir seus dados pessoais</li>
            <li>Solicitar a exclusão de dados, quando aplicável</li>
            <li>Revogar consentimentos anteriores</li>
            <li>Obter informações sobre compartilhamento de dados</li>
          </ul>
          <p>
            Para exercer esses direitos, entre em contato pelo email{" "}
            <strong>protecaodedados@redaiinvestimentos.ao</strong>.
          </p>

          <h2 className="section-title">6. Cookies e Tecnologias Similares</h2>
          <p>Utilizamos cookies para:</p>
          <ul>
            <li>Melhorar a experiência de navegação</li>
            <li>Personalizar conteúdo</li>
            <li>Analisar tráfego e uso da plataforma</li>
          </ul>
          <p>
            Você pode gerenciar as preferências de cookies nas configurações do
            seu navegador.
          </p>

          <h2 className="section-title">7. Alterações nesta Política</h2>
          <p>
            Podemos atualizar esta política periodicamente. Alterações
            significativas serão comunicadas por email ou através de aviso em
            nossa plataforma.
          </p>

          <h2 className="section-title">8. Contato</h2>
          <p>Dúvidas sobre esta política podem ser direcionadas a:</p>
          <p>
            <strong>Encarregado de Proteção de Dados</strong>
            <br />
            Email: protecaodedados@redaiinvestimentos.ao
            <br />
            Endereço: Av. 24 de Janeiro, nº 1549-007, Benfica, Lisboa, Portugal.
          </p>

          <div className="highlight-box">
            <p>
              <strong>Versão:</strong> 1.0
              <br />
              <strong>Vigência:</strong> 15/03/2023
            </p>
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
export default PrivacyPolicyPage;
