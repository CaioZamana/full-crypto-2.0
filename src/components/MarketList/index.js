
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MarketList.css';

const CoinGeckoAPI = 'https://api.coingecko.com/api/v3';

const MarketList = () => {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    axios.get(`${CoinGeckoAPI}/exchanges`)
      .then(response => setMarkets(response.data))
      .catch(error => console.error('Error fetching markets:', error));
  }, []);

  return (
    <div className="market-list">
      <h2>Lista de Mercados</h2>
      <ul>
        {markets.map(market => (
          <li key={market.id}>{market.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MarketList;
