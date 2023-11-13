// SearchBar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoDetails from '../CryptoDetails'; // Certifique-se de importar corretamente o componente CryptoDetails
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(true); // Estado para controlar a visibilidade da lista

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
        setShowSuggestions(true); // Garante que as sugestões sejam exibidas quando disponíveis
      } catch (error) {
        console.error('Erro ao buscar sugestões:', error);
      }
    };

    fetchSuggestions();
  }, [searchTerm]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/search`,
        {
          params: { q: searchTerm },
        }
      );

      if (onSearch) {
        onSearch(response.data);
      }
    } catch (error) {
      console.error('Erro ao pesquisar por criptomoeda:', error);
    }
  };

  const handleCryptoClick = async (cryptoId) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${cryptoId}`
      );

      setSelectedCrypto(response.data);
      setShowSuggestions(false); // Oculta as sugestões quando uma criptomoeda é clicada
    } catch (error) {
      console.error('Erro ao buscar detalhes da criptomoeda:', error);
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Buscar Criptomoeda"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>
        Buscar
      </button>
      {showSuggestions && ( // Renderiza a lista de sugestões apenas se showSuggestions for verdadeiro
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
      <CryptoDetails cryptoId={selectedCrypto?.id} />
    </div>
  );
};

export default SearchBar;
