// TrendingCoins.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';
import CryptoDetailsCard from '../CryptoDetailsCard';
import Modal from 'react-modal';
import './trending.css';

Modal.setAppElement('#root');

const TrendingCoins = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  const handleCoinClick = async (coin) => {
    try {
      // Extrai o id da moeda
      const coinId = coin.id || coin.item.id;

      // Busca os detalhes da criptomoeda
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`);

      // Define os detalhes da criptomoeda e exibe o CryptoDetailsCard
      setSelectedCoin(response.data);
      setModalIsOpen(true);
    } catch (error) {
      console.error('Error fetching crypto details:', error);
    }
  };

  const handleCloseCryptoDetailsCard = () => {
    setSelectedCoin(null);
    setModalIsOpen(false);
  };

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
              <p>
                <li key={coin.item.id || index} className="coin-item">
                  <strong>{coin.item.name}               ({coin.item.symbol})</strong>
                  <button onClick={() => handleCoinClick(coin.item)} >Detalhar</button>
   
                </li>
              </p>
            ))}
          </ul>
        </div>
      )}
      <Footer />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseCryptoDetailsCard}
        contentLabel="Detalhes da Criptomoeda"
      >
        {selectedCoin && (
          <CryptoDetailsCard
            cryptoDetails={selectedCoin}
            closeModal={handleCloseCryptoDetailsCard}
          />
        )}
      </Modal>
    </div>
  );
};

export default TrendingCoins;
