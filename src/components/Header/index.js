import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import SearchBar from '../SearchBar';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <img src="../favicon.ico" alt="Logo" />
            </div>
            <nav className="nav">
                <div className="links-container">
                    <ul>
                        <li><Link to="/">Início</Link></li>
                        <li><Link to="/TrendingCoins">Tendências</Link></li>
                        <li><Link to="/TradingChart">Gráficos</Link></li>
                        <li><Link to="/PortfolioPage">Portfólio</Link></li>
                        <li><Link to="/MarketExplorer">Corretoras Cripto</Link></li>
                        <li><Link to="/btc">Indicadores Bitcoin</Link></li>
                        <li><Link to="/CoinMultList">Listas Cripto</Link></li>
                        <li><Link to="/CryptoConverter">Conversor Cripto</Link></li>
                        <li><Link to="/About">Sobre Nós</Link></li>
                        <li><Link to="/ContactPage">Contato</Link></li>

                    </ul>
                </div>
            </nav>
            <div className="login">
                {/* Seu conteúdo de login aqui */}
            </div>
            <div className='search-bar-container'><SearchBar/></div>
        </header>
    );
};

export default Header;
