import React, { useState, useMemo } from 'react';
import './SearchBar.module.css';
import CryptoDetailsCardModalSearch from '../CryptoDetailsCardModalSearch';
import coingecko from '../../services/coingecko';
import { useDebounce } from '../../hooks/useDebounce';
import { useCachedFetch } from '../../hooks/useCachedFetch';
import useCoinDetails from '../../hooks/useCoinDetails';

// Stable reference — same cache key used by CryptoConverter, ROICalculator, PortfolioPage.
// Only one HTTP request per TTL window across all components.
const fetchMarketList = () =>
  coingecko.getMarkets({ per_page: 250, page: 1 }).then((r) => r.data);

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);

  // 400 ms debounce — eliminates per-keystroke API calls.
  const debouncedSearch = useDebounce(searchTerm, 400);

  // Cached 250-coin list; zero extra fetches when the cache is fresh.
  const { data: coinList } = useCachedFetch('cryptoMarketList', fetchMarketList);

  const { data: selectedCrypto, fetchDetails } = useCoinDetails();

  // Pure client-side filter — no network involved.
  const suggestions = useMemo(() => {
    if (!debouncedSearch.trim() || !coinList) return [];
    const term = debouncedSearch.toLowerCase();
    return coinList
      .filter(
        (coin) =>
          coin.name.toLowerCase().includes(term) ||
          coin.symbol.toLowerCase().includes(term)
      )
      .slice(0, 5);
  }, [debouncedSearch, coinList]);

  const handleCryptoClick = async (cryptoId) => {
    await fetchDetails(cryptoId);
    setShowSuggestions(false);
  };

  const handleBackButtonClick = () => {
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

      {showSuggestions && suggestions.length > 0 && (
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
