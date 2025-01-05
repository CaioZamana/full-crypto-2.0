import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CryptoDetailsCard from '../CryptoDetailsCard/CryptoDetailsCard';
import Modal from 'react-modal';
import styles from './TrendingCoins.module.css';

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
        setTrendingCoins(response.data.coins || []);
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
      const coinId = coin.id || coin.item.id;
      if (!coinId) {
        console.error('ID da moeda não encontrado:', coin);
        return;
      }

      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}`
      );

      setSelectedCoin(response.data);
      setModalIsOpen(true);
    } catch (error) {
      console.error('Erro ao buscar detalhes da criptomoeda:', error);
    }
  };

  const handleCloseCryptoDetailsCard = () => {
    setSelectedCoin(null);
    setModalIsOpen(false);
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.header}>Tendências em Criptomoedas</h1>

        {loading && <p className={styles.loadingMessage}>Carregando...</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}
        {!loading && !error && trendingCoins.length > 0 && (
          <div className={styles.gridContainer}>
            {trendingCoins.map((coin) => (
              <div key={coin.item.id} className={styles.gridItem}>
                <div className={styles.coinDetails}>
                  <img
                    src={coin.item.large}
                    alt={coin.item.name}
                    className={styles.coinImage}
                  />
                  <div className={styles.coinInfo}>
                    <h3 className={styles.coinName}>{coin.item.name}</h3>
                    <p className={styles.coinSymbol}>
                      ({coin.item.symbol.toUpperCase()})
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleCoinClick(coin.item)}
                  className={styles.detailsButton}
                >
                  Detalhes
                </button>
              </div>
            ))}
          </div>
        )}
        {!loading && !error && trendingCoins.length === 0 && (
          <p className={styles.noDataMessage}>Nenhuma moeda de tendência encontrada.</p>
        )}
      </div>
      <Footer />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseCryptoDetailsCard}
        contentLabel="Detalhes da Criptomoeda"
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
      >
        {selectedCoin ? (
          <CryptoDetailsCard
            cryptoDetails={selectedCoin}
            closeModal={handleCloseCryptoDetailsCard}
          />
        ) : (
          <p>Carregando detalhes...</p>
        )}
      </Modal>
    </div>
  );
};

export default TrendingCoins;
