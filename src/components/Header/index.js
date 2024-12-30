import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import SearchBar from '../SearchBar';
import IniciarSessao from '../IniciarSessao';

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
                        <li><Link to="/RoiCalculator">Simulador de Retorno</Link></li>
                        <li><Link to="/TrendingCoins">Tendências</Link></li>
                        <li><Link to="/TradingChart">Gráficos</Link></li>
                        <li><Link to="/PortfolioPage">Portfólio</Link></li>
                        <li><Link to="/MarketExplorer">Corretoras</Link></li>
                        <li><Link to="/btc">Indicadores</Link></li>
                        <li><Link to="/CoinMultList">Listas</Link></li>
                        <li><Link to="/CryptoConverter">Conversor</Link></li>
                        <li><Link to="/About">Sobre</Link></li>
                        <li><Link to="/ContactPage">Contato</Link></li>

                    </ul>
                </div>
            </nav>
            <div className="login">
                {/* Seu conteúdo de login aqui */}
            </div>
            <div className='search-bar-container'><SearchBar/></div>
            <div className='iniciarsessao'><IniciarSessao/></div>
        </header>
    );
};

export default Header;
