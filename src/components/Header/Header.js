import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'; // Usando CSS Modules
import SearchBar from '../SearchBar/SearchBar';
import IniciarSessao from '../IniciarSessao/IniciarSessao';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src="../favicon.ico" alt="Logo" />
                <br/>
                <br/>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li><Link to="/">Início</Link></li>
                    <li><Link to="/RoiCalculator">Simulador de Retorno</Link></li>
                    <li><Link to="/TrendingCoins">Tendências</Link></li>
                    <li><Link to="/TradingChart">Gráficos</Link></li>
                    <li><Link to="/PortfolioPage">Portfólio</Link></li>
                    <li><Link to="/MarketExplorer">Corretoras</Link></li>
                    <li><Link to="/btc">Indicadores</Link></li>
                    <li><Link to="/CoinMultList">Listas</Link></li>
                    <li><Link to="/CryptoConverter">Conversor</Link></li>
                    <li><Link to="/About">Sobre Nós</Link></li>
                    <li><Link to="/ContactPage">Contato</Link></li>
                </ul>
            </nav>
            <div className={styles.searchBarContainer}>
                <SearchBar />
            </div>
            <div className={styles.login}>
                <IniciarSessao />
            </div>
        </header>
    );
};

export default Header;
