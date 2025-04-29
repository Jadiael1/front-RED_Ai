import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TermsAndConditionsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/assets/css/termsandconditions.css";
    link.id = "termsandconditions-page-style";
    document.head.appendChild(link);

    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href = "/assets/fontawesome/css/all.min.css";
    link2.id = "fontawesome-page-style";
    document.head.appendChild(link2);

    return () => {
      const existingLink = document.getElementById(
        "termsandconditions-page-style"
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
          <h1>Termos e Condições de Uso</h1>
          <p>RED Ai - Última atualização: 15/03/2023</p>
        </div>

        <div className="content-section">
          <div className="highlight-box">
            <p>
              <strong>Importante:</strong> Ao utilizar nossa plataforma, você
              concorda com estes Termos e Condições. Leia atentamente antes de
              realizar qualquer investimento.
            </p>
          </div>

          <ol className="terms-list">
            <li>
              <h2 className="section-title">Aceitação dos Termos</h2>
              <p>
                Os presentes Termos e Condições ("Termos") regulam o uso dos
                serviços oferecidos pela RED Ai.
              </p>
            </li>

            <li>
              <h2 className="section-title">Definições</h2>
              <ol>
                <li>
                  "Plataforma" refere-se ao website e aplicativo da RED Ai.
                </li>
                <li>"Usuário" é a pessoa física que utiliza a Plataforma.</li>
                <li>
                  "Produto VIP" são os planos de investimento oferecidos, com
                  rendimentos provenientes transações internacionais em Trading
                  e Criptomoedas.
                </li>
              </ol>
            </li>

            <li>
              <h2 className="section-title">Cadastro</h2>
              <ol>
                <li>O cadastro é pessoal e intransferível.</li>
                <li>
                  O Usuário deve fornecer informações verdadeiras e atualizadas.
                </li>
                <li>Menores de 18 anos não podem se cadastrar.</li>
              </ol>
            </li>

            <li>
              <h2 className="section-title">Produtos de Investimento</h2>
              <ol>
                <li>
                  Cada Produto VIP possui características específicas de valor
                  inicial, rendimento diário e duração.
                </li>
                <li>
                  O limite máximo por produto é de 5 investimentos por usuário.
                </li>
                <li>
                  Os rendimentos são calculados diariamente e creditados
                  automaticamente.
                </li>
              </ol>
            </li>

            <li>
              <h2 className="section-title">Depósitos e Retiradas</h2>
              <ol>
                <li>
                  Depósitos:
                  <ol>
                    <li>Horário de processamento: 6h às 21h, diariamente.</li>
                    <li>Comprovante deve ser enviado para análise.</li>
                  </ol>
                </li>
                <li>
                  Retiradas:
                  <ol>
                    <li>Horário: 9h às 21h, de segunda a sábado.</li>
                    <li>Taxa administrativa de 10% sobre o valor sacado.</li>
                    <li>
                      Limite mínimo: 2.500 kz; máximo: 500.000 kz por dia.
                    </li>
                    <li>
                      Tanto o depósito e a retirada são processados dentro de
                      24h no máximo.
                    </li>
                  </ol>
                </li>
              </ol>
            </li>

            <li>
              <h2 className="section-title">Programa de Indicações</h2>
              <ol>
                <li>O Usuário recebe um link único para indicações.</li>
                <li>Bônus são pagos conforme o nível do indicado (1 a 3).</li>
                <li>
                  O indicado deve realizar depósito para validação do bônus.
                </li>
              </ol>
            </li>

            <li>
              <h2 className="section-title">Responsabilidades</h2>
              <ol>
                <li>
                  A RED Ai não se responsabiliza por:
                  <ol>
                    <li>
                      Erros no preenchimento de dados bancários pelo Usuário.
                    </li>
                    <li>Operações realizadas fora do horário estabelecido.</li>
                    <li>
                      Problemas em redes de terceiros (operadoras, bancos).
                    </li>
                  </ol>
                </li>
              </ol>
            </li>

            <li>
              <h2 className="section-title">Privacidade</h2>
              <p>
                Os dados pessoais são protegidos conforme nossa Política de
                Privacidade. Não compartilhamos informações com terceiros sem
                consentimento.
              </p>
            </li>

            <li>
              <h2 className="section-title">Alterações nos Termos</h2>
              <p>
                A RED Ai pode atualizar estes Termos periodicamente. Alterações
                serão comunicadas por email e no site.
              </p>
            </li>

            <li>
              <h2 className="section-title">Legislação Aplicável</h2>
              <p>
                Estes Termos são regidos pelas leis da República de Portugal.
                Eventuais disputas serão resolvidas em Lisboa.
              </p>
            </li>
          </ol>

          <div className="highlight-box">
            <p>
              <strong>Dúvidas?</strong> Entre em contato pelo email{" "}
              <strong>juridico@redai.pt</strong> ou telefone{" "}
              <strong>+351 23 456 789</strong>.
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
export default TermsAndConditionsPage;
