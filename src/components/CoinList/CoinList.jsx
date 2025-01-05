import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import CryptoDetailsCard from '../CryptoDetailsCard/CryptoDetailsCard';
import styles from './CoinList.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

Modal.setAppElement('#root');

const CoinList = () => {
  const [cryptoList, setCryptoList] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState('market_cap_rank');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  const totalPages = 10;

  useEffect(() => {
    const fetchCryptoPage = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              per_page: itemsPerPage,
              page: currentPage,
              sparkline: false,
            },
          }
        );

        const sortedCryptoList = response.data.sort((a, b) => {
          return sortOrder === 'asc'
            ? a[sortColumn] - b[sortColumn]
            : b[sortColumn] - a[sortColumn];
        });

        setCryptoList(sortedCryptoList);
      } catch (error) {
        console.error('Erro ao buscar lista das criptomoedas:', error);
      }
    };

    fetchCryptoPage();
  }, [currentPage, sortColumn, sortOrder]);

  const handleCryptoDetails = async (cryptoId) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${cryptoId}`
      );
      setSelectedCrypto(response.data);
      setModalIsOpen(true);
    } catch (error) {
      console.error('Erro ao buscar detalhes da criptomoeda:', error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSort = (columnKey) => {
    if (sortColumn === columnKey) {
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(columnKey);
      setSortOrder('asc');
    }
  };

  const columns = [
    { key: 'market_cap_rank', label: 'Ranking' },
    { key: 'name', label: 'Nome' },
    { key: 'symbol', label: 'Símbolo' },
    { key: 'current_price', label: 'Preço (USD)' },
    { key: 'market_cap', label: 'Cap. de Mercado' },
    { key: 'total_volume', label: 'Volume (24h)' },
    { key: 'ath_change_percentage', label: 'ATH (%)' },
    { key: 'atl_change_percentage', label: 'ATL (%)' },
  ];

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1>Lista de Criptomoedas</h1>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key} onClick={() => handleSort(column.key)}>
                    {column.label}{' '}
                    {sortColumn === column.key &&
                      (sortOrder === 'asc' ? '▲' : '▼')}
                  </th>
                ))}
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {cryptoList.map((crypto) => (
                <tr key={crypto.id}>
                  {columns.map((column) => (
                    <td key={column.key}>
                      {column.key === 'current_price' ||
                      column.key === 'market_cap' ||
                      column.key === 'total_volume'
                        ? crypto[column.key]?.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'USD',
                          })
                        : column.key === 'ath_change_percentage' ||
                          column.key === 'atl_change_percentage'
                        ? `${crypto[column.key]?.toFixed(2)}%`
                        : crypto[column.key]?.toLocaleString('pt-BR')}
                    </td>
                  ))}
                  <td>
                    <button
                      className={styles.detailsButton}
                      onClick={() => handleCryptoDetails(crypto.id)}
                    >
                      Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.paginationButton}
          >
            Anterior
          </button>
          <span className={styles.pageInfo}>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles.paginationButton}
          >
            Próxima
          </button>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Detalhes da Criptomoeda"
          className={styles.modal}
        >
          {selectedCrypto && (
            <CryptoDetailsCard
              cryptoDetails={selectedCrypto}
              closeModal={closeModal}
            />
          )}
        </Modal>
      </div>
      <Footer />
    </div>
  );
};

export default CoinList;
