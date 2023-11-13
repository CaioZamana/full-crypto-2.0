// MarketInfo.js

import React, { useState } from 'react';
import axios from 'axios';
import './MarketInfo.css';

const CoinGeckoAPI = 'https://api.coingecko.com/api/v3';

const MarketInfo = ({ marketId }) => {
  const [marketInfo, setMarketInfo] = useState({});

  const handleMarketInfo = async () => {
    try {
      const response = await axios.get(`${CoinGeckoAPI}/exchanges/${marketId}`);
      setMarketInfo(response.data);
    } catch (error) {
      console.error('Error fetching market info:', error);
    }
  };

  return (
    <div className="market-info">
      <h2>Informações do Mercado</h2>
      <button onClick={handleMarketInfo}>Obter Informações</button>
      {Object.keys(marketInfo).length > 0 && (
        <div>
          {Object.entries(marketInfo).map(([key, value]) => (
            <p key={key}><strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : value}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketInfo;
