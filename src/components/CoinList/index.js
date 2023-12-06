import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import CryptoDetailsCard from '../CryptoDetailsCard';
import './CoinList.css';
import Header from '../Header';
import Footer from '../Footer';

Modal.setAppElement('#root');

const CoinList = () => {
  const [cryptoList, setCryptoList] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState('market_cap_rank');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  useEffect(() => {
    const fetchTop250Crypto = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              per_page: 250,
              page: 1,
              sparkline: true,
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
        console.error('Erro ao buscar lista das top 250 criptomoedas:', error);
      }
    };

    fetchTop250Crypto();
  }, [sortColumn, sortOrder]);

  const handleCryptoDetails = async (cryptoId) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${cryptoId}`
      );
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const totalPages = Math.ceil(cryptoList.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSort = (columnKey) => {
    if (sortColumn === columnKey) {
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(columnKey);
      setSortOrder('asc');
    }
  };

  // Definindo as colunas e rótulos
  const columns = [
    { key: 'market_cap_rank', label: 'Ranking' },
    { key: 'name', label: 'Nome' },
    { key: 'symbol', label: 'Símbolo' },
    { key: 'current_price', label: 'Preço (USD)' },
    { key: 'market_cap', label: 'Cap. de Mercado' },
    { key: 'total_volume', label: 'Volume (USDT/24hs)' },
    { key: 'ath_change_percentage', label: 'ATH (%)' },
    { key: 'atl_change_percentage', label: 'ATL (%)' },
  ];

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Cripto List</h1>
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} onClick={() => handleSort(column.key)}>
                  {column.label}{' '}
                  {sortColumn === column.key && sortOrder === 'asc' && '▲'}
                  {sortColumn === column.key && sortOrder === 'desc' && '▼'}
                </th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cryptoList.slice(startIndex, endIndex).map((crypto) => (
              <tr key={crypto.id}>
                {columns.map((column) => (
                  <td key={column.key}>
                    {column.key === 'current_price'
                      ? crypto[column.key].toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'USD',
                      })
                      : column.key === 'ath_change_percentage' || column.key === 'atl_change_percentage'
                        ? `${crypto[column.key].toFixed(2).toLocaleString('pt-BR')}%`
                        : crypto[column.key].toLocaleString('pt-BR')}
                  </td>
                ))}
                <td>
                  <button onClick={() => handleCryptoDetails(crypto.id)}>
                    Detalhes
                  </button>
                </td>
              </tr>
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

export default CoinList;
