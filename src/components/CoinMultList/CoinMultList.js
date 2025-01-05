import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import CryptoDetailsCard from '../CryptoDetailsCard/CryptoDetailsCard';
import './CoinMultList.module.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

Modal.setAppElement('#root');

const CoinMultList = () => {
  const [cryptoList, setCryptoList] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState('market_cap_rank');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  const totalPages = 10; // 250 items / 25 itemsPerPage

  useEffect(() => {
    const fetchCryptoByCategory = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              per_page: itemsPerPage,
              page: currentPage,
              sparkline: true,
              category: selectedCategory,
            },
          }
        );

        const sortedCryptoList = response.data.sort((a, b) => {
          if (sortOrder === 'asc') {
            return a[sortColumn] - b[sortColumn];
          } else {
            return b[sortColumn] - a[sortColumn];
          }
        });

        setCryptoList(sortedCryptoList);
      } catch (error) {
        console.error('Erro ao buscar lista das top 250 criptomoedas:', error);
      }
    };

    fetchCryptoByCategory();
  }, [sortColumn, sortOrder, selectedCategory, currentPage, itemsPerPage]);

  const handleCryptoDetails = async (cryptoId) => {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoId}`);
      const cryptoDetails = response.data;
      setSelectedCrypto(cryptoDetails);
      setModalIsOpen(true);
    } catch (error) {
      console.error('Erro ao buscar detalhes da criptomoeda:', error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSort = (column) => {
    setSortOrder((prevOrder) => (column === sortColumn ? (prevOrder === 'desc' ? 'asc' : 'desc') : 'desc'));
    setSortColumn(column);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset para a primeira página ao mudar a categoria
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const getColumnLabel = (column) => {
    // Função auxiliar para obter rótulos dinâmicos
    const columnLabels = {
      market_cap_rank: 'Ranking',
      name: 'Nome',
      symbol: 'Símbolo',
      current_price: 'Preço (USD)',
      market_cap: 'Cap. de Mercado',
      total_volume: 'Volume Total',
      ath_change_percentage: 'ATH (%)',
      atl_change_percentage: 'ATL (%)',
    };
    return columnLabels[column];
  };

  const getColumnValue = (crypto, column) => {
    // Função auxiliar para obter valores de coluna dinâmicos
    const value = crypto[column];
    return value ? value.toLocaleString('pt-BR') : 'N/A';
  };

  return (
    <div>
      <Header />

      <div>
        <h1>Crypto Lists</h1>
        {/* Botões de filtro por categoria */}
        <div className="category-buttons">
          {['stablecoins', 'cryptocurrency', 'gaming', 'decentralized-finance-defi', 'non-fungible-tokens-nft', 'decentralized-exchange', 'decentralized-derivatives', 'meme-token', 'metaverse', 'artificial-intelligence', 'wallets'].map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tabela de criptomoedas */}
        <table className="crypto-table">
          <thead>
            <tr>
              {['market_cap_rank', 'name', 'symbol', 'current_price', 'market_cap', 'total_volume', 'ath_change_percentage', 'atl_change_percentage'].map((column) => (
                <th key={column} onClick={() => handleSort(column)}>
                  {getColumnLabel(column)}
                  {sortColumn === column && (sortOrder === 'desc' ? '▼' : '▲')}
                </th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cryptoList.map((crypto) => (
              // Adicione a verificação para market_cap não vazio
              crypto.market_cap && (
                <tr key={crypto.id}>
                  {['market_cap_rank', 'name', 'symbol', 'current_price', 'market_cap', 'total_volume', 'ath_change_percentage', 'atl_change_percentage'].map((column) => (
                    <td key={column}>
                      {getColumnValue(crypto, column) !== 'N/A' && getColumnValue(crypto, column)}
                    </td>
                  ))}
                  <td>
                    <button onClick={() => handleCryptoDetails(crypto.id)}>Detalhes</button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span>{`Página ${currentPage} de ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próxima
          </button>
        </div>

        {/* Modal de detalhes da criptomoeda */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Detalhes da Criptomoeda"
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

export default CoinMultList;
