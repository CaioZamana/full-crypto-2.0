import React, { useState, useMemo } from 'react';
import Modal from 'react-modal';
import CryptoDetailsCard from '../CryptoDetailsCard/CryptoDetailsCard';
import styles from './CoinList.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import useCoinList from '../../hooks/useCoinList';
import useCoinDetails from '../../hooks/useCoinDetails';

Modal.setAppElement('#root');

const ITEMS_PER_PAGE = 250;
const TOTAL_PAGES = 10;

const CoinList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState('market_cap_rank');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { data: rawData, loading } = useCoinList(currentPage, ITEMS_PER_PAGE);
  const { data: selectedCrypto, fetchDetails } = useCoinDetails();

  const cryptoList = useMemo(() => {
    return [...rawData].sort((a, b) => {
      if (a[sortColumn] == null) return 1;
      if (b[sortColumn] == null) return -1;
      return sortOrder === 'asc'
        ? a[sortColumn] > b[sortColumn] ? 1 : -1
        : a[sortColumn] < b[sortColumn] ? 1 : -1;
    });
  }, [rawData, sortColumn, sortOrder]);

  const handleCryptoDetails = async (cryptoId) => {
    await fetchDetails(cryptoId);
    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= TOTAL_PAGES) setCurrentPage(newPage);
  };

  const handleSort = (columnKey) => {
    if (sortColumn === columnKey) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
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
    <div className={styles.container}>
      <Header />
      <h1 className={styles.header}>Lista de Criptomoedas</h1>
      <div className={styles.tableWrapper}>
        {loading ? (
          <p>Carregando dados...</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key} onClick={() => handleSort(column.key)}>
                    {column.label}{' '}
                    {sortColumn === column.key && (sortOrder === 'asc' ? '▲' : '▼')}
                  </th>
                ))}
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {cryptoList.length > 0 ? (
                cryptoList.map((crypto) => (
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
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 1}>Nenhum dado disponível.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
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
          Página {currentPage} de {TOTAL_PAGES}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === TOTAL_PAGES}
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
          <CryptoDetailsCard cryptoDetails={selectedCrypto} closeModal={closeModal} />
        )}
      </Modal>
      <Footer />
    </div>
  );
};

export default CoinList;
