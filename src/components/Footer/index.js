
import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h2>Sobre Nós</h2>
          <p>Somos uma empresa dedicada a fornecer informações relevantes sobre o mundo financeiro de criptoativos. Explore nossos recursos e mantenha-se atualizado.</p>
        </div>

        <div className="footer-section">
          <h2>Categorias</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/TradingChart">Gráficos</Link></li>
            <li><Link to="/btc">Indicadores Bitcoin</Link></li>
            <li><Link to="/PrivacyPolicy">Política de Privacidade</Link></li>

          </ul>
        </div>

        <div className="footer-section">
          <h2>Contato</h2>
          <p>Entre em contato conosco para parcerias, anúncios ou dúvidas:</p>
          <p><a href="mailto:caiobzm@gmail.com">caiobzm@gmail.com</a></p>
        </div>
        
      </div>

      <div className="footer-bottom">
        <p>&copy; 2023 Crypto World. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
