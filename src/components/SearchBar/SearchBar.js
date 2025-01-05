// SearchBar.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchBar.module.css';
import CryptoDetailsCardModalSearch from '../CryptoDetailsCardModalSearch';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        if (searchTerm.trim() === '') {
          setSuggestions([]);
          return;
        }

        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets`,
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 250,
              page: 1,
              sparkline: false,
            },
          }
        );

        const filteredSuggestions = response.data.filter(
          (coin) =>
            coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setSuggestions(filteredSuggestions.slice(0, 5));
        setShowSuggestions(true);
      } catch (error) {
        console.error('Erro ao buscar sugestões:', error);
      }
    };

    fetchSuggestions();
  }, [searchTerm]);



  const handleCryptoClick = async (cryptoId) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${cryptoId}`
      );

      setSelectedCrypto(response.data);
      setShowSuggestions(false); // Oculta a lista de sugestões ao clicar em uma moeda
    } catch (error) {
      console.error('Erro ao buscar detalhes da criptomoeda:', error);
    }
  };

  const handleBackButtonClick = () => {
    setSelectedCrypto(null);
    setShowSuggestions(true);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Buscar Criptomoeda"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {showSuggestions && (
        <ul className="suggestions-list">
          {suggestions.map((coin) => (
            <li
              key={coin.id}
              className="suggestions-list-item"
              onClick={() => handleCryptoClick(coin.id)}
            >
              {coin.name} ({coin.symbol})
            </li>
          ))}
        </ul>
      )}
      <CryptoDetailsCardModalSearch
        cryptoDetails={selectedCrypto}
        closeModal={handleBackButtonClick}
      />
    </div>
  );
};

export default SearchBar;
