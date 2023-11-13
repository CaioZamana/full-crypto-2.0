// TrendingCoins.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';
import './trending.css';

const TrendingCoins = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/search/trending'
        );
        setTrendingCoins(response.data.coins);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar moedas de tendência:', error);
        setError('Erro ao carregar moedas de tendência. Tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchTrendingCoins();
  }, []);

  return (
    <div>
      <Header />
      <h1>Trending Coins</h1>
      {loading && <p>Carregando...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <div className="trending-coins-container">
          <ul className="coin-list">
            {trendingCoins.map((coin, index) => (
              <li key={coin.item.id || index} className="coin-item">
                <strong>{coin.item.name}</strong> ({coin.item.symbol}) - Ranking: {coin.item.id || 'N/A'}
              </li>
            ))}
          </ul>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default TrendingCoins;