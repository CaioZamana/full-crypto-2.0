import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CryptoDetails.module.css';

const CryptoDetails = ({ cryptoId }) => {
  const [cryptoDetails, setCryptoDetails] = useState(null);

  useEffect(() => {
    const fetchCryptoDetails = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoId}`);
        setCryptoDetails(response.data);
      } catch (error) {
        console.error('Error fetching crypto details:', error);
      }
    };

    fetchCryptoDetails();
  }, [cryptoId]);

  const closeModal = () => {
    setCryptoDetails(null);
  };

  if (!cryptoDetails) {
    return null; // or render a loading indicator
  }

  const {
    name,
    symbol,
    market_data: { current_price, market_cap, total_volume, ath, atl, high_24h, low_24h, price_change_percentage_24h, },
    image,
    description,
    links,
    categories,
    genesis_date,
    community_data,
    developer_data,
    public_interest_stats,
  } = cryptoDetails;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  const calculatePercentage = (currentPrice, historicalPrice) => {
    return ((currentPrice / historicalPrice - 1) * 100).toFixed(2);
  };

 
  return (
    <div>

      {/* Additional information from CryptoDetails component */}
      <h2>{name}</h2>
      <img src={image?.large} alt={`${name} Logo`} style={{ maxWidth: '100px' }} />
      <p>Symbol: {symbol}</p>
      <p>Preço Atual: {formatCurrency(current_price.usd)}</p>
      <p>Capitalização de Mercado: {formatCurrency(market_cap.usd)}</p>
      <p>Volume de 24h: {formatCurrency(total_volume.usd)}</p>
      <p>Variação de 24h: {price_change_percentage_24h.toFixed(2)}%</p>
      <p>Máx. de 24h: {formatCurrency(high_24h.usd)}</p>
      <p>Mín. de 24h: {formatCurrency(low_24h.usd)}</p>
      <p>All-Time High (ATH): {formatCurrency(ath?.usd || 0)} ({ath ? calculatePercentage(current_price.usd, ath.usd) : 'N/A'}%)</p>
      <p>All-Time Low (ATL): {formatCurrency(atl?.usd || 0)} ({atl ? calculatePercentage(current_price.usd, atl.usd) : 'N/A'}%)</p>
      <p>Genesis Date: {genesis_date}</p>
      <p>Fornecimento Circulante: {formatNumber(cryptoDetails.market_data.circulating_supply)} {symbol}</p>
      <p>Fornecimento Total: {formatNumber(cryptoDetails.market_data.total_supply)} {symbol}</p>
      <p>Categories: {categories.join(', ')}</p>
      <p>Description: {description.en}</p>

      <p>Community Data:</p>
      <ul>
        <li>Facebook Likes: {community_data.facebook_likes}</li>
        <li>Twitter Followers: {community_data.twitter_followers}</li>
        {/* Add more community data as needed */}
      </ul>

      <p>Developer Data:</p>
      <ul>
        <li>Stars on GitHub: {developer_data.stars}</li>
        <li>Subscribers on Reddit: {developer_data.subscribers}</li>
        {/* Add more developer data as needed */}
      </ul>

      <p>Public Interest Stats:</p>
      <ul>
        <li>Alexa Rank: {public_interest_stats.alexa_rank}</li>
        {/* Add more public interest stats as needed */}
      </ul>

           {/* Additional information from CryptoDetailsCard component */}

      {/* Additional information from CryptoDetailsCard component */}

      {/* Additional information from CryptoDetailsCard component */}

      {/* Additional information from CryptoDetailsCard component */}
      {ath && <p>Porcentagem em relação à ATH: {calculatePercentage(current_price.usd, ath.usd)}%</p>}
      {atl && <p>Porcentagem em relação à ATL: {calculatePercentage(current_price.usd, atl.usd)}%</p>}

      {/* Additional information from CryptoDetailsCard component */}
      <p>Site Oficial: <a href={links.homepage[0]} target="_blank" rel="noopener noreferrer">{links.homepage[0]}</a></p>

      {/* Additional information from CryptoDetailsCard component */}
      <button onClick={closeModal}>Fechar</button>
    </div>
  );
};

export default CryptoDetails;