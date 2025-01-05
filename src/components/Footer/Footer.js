import React from 'react';
import styles from './Footer.module.css'; // Usando CSS Modules
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h2>Sobre Nós</h2>
          <p>
            Somos uma empresa dedicada a fornecer informações relevantes sobre o
            mundo financeiro de criptoativos. Explore nossos recursos e mantenha-se
            atualizado.
          </p>
        </div>

        <div className={styles.footerSection}>
          <h2>Categorias</h2>
          <ul>
            <li>
              <Link to="/" aria-label="Página Inicial">
                Home
              </Link>
            </li>
            <li>
              <Link to="/TradingChart" aria-label="Gráficos">
                Gráficos
              </Link>
            </li>
            <li>
              <Link to="/btc" aria-label="Indicadores Bitcoin">
                Indicadores Bitcoin
              </Link>
            </li>
            <li>
              <Link to="/PrivacyPolicy" aria-label="Política de Privacidade">
                Política de Privacidade
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h2>Contato</h2>
          <p>Entre em contato conosco para parcerias, anúncios ou dúvidas:</p>
          <p>
            <a href="mailto:caiobzm@gmail.com" aria-label="E-mail">
              caiobzm@gmail.com
            </a>
          </p>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; 2023 Crypto World. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
