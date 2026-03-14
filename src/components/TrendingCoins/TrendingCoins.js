import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CryptoDetailsCard from '../CryptoDetailsCard/CryptoDetailsCard';
import Modal from 'react-modal';
import styles from './TrendingCoins.module.css';
import useTrendingCoins from '../../hooks/useTrendingCoins';
import useCoinDetails from '../../hooks/useCoinDetails';

Modal.setAppElement('#root');

const TrendingCoins = () => {
  const { data: trendingCoins, loading, error } = useTrendingCoins();
  const { data: selectedCoin, fetchDetails } = useCoinDetails();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleCoinClick = async (coin) => {
    const coinId = coin.id || coin.item?.id;
    if (!coinId) return;
    await fetchDetails(coinId);
    setModalIsOpen(true);
  };

  const handleClose = () => setModalIsOpen(false);

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
        onRequestClose={handleClose}
        contentLabel="Detalhes da Criptomoeda"
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
      >
        {selectedCoin ? (
          <CryptoDetailsCard cryptoDetails={selectedCoin} closeModal={handleClose} />
        ) : (
          <p>Carregando detalhes...</p>
        )}
      </Modal>
    </div>
  );
};

export default TrendingCoins;
