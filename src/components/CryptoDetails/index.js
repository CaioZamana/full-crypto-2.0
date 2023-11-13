import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  if (!cryptoDetails) {
    return 
  }

  const {
    name,
    symbol,
    market_data: { current_price, market_cap, total_volume, ath, atl },
    image,
    description,
    links,
    categories,
    genesis_date,
    community_data,
    developer_data,
    public_interest_stats,
  } = cryptoDetails;

  // Calcular as variações percentuais em relação ao preço atual
  const athPercentage = ((current_price.usd - ath.usd) / ath.usd) * 100;
  const atlPercentage = ((current_price.usd - atl.usd) / atl.usd) * 100;

  return (
    <div>
      <h2>{name}</h2>
      <img src={image?.large} alt={`${name} Logo`} style={{ maxWidth: '100px' }} />
      <p>Symbol: {symbol}</p>
      <p>Current Price: ${current_price.usd}</p>
      <p>Market Cap: ${market_cap.usd}</p>
      <p>Total Volume: ${total_volume.usd}</p>
      <p>All-Time High (ATH): ${ath.usd} ({athPercentage.toFixed(2)}%)</p>
      <p>All-Time Low (ATL): ${atl.usd} ({atlPercentage.toFixed(2)}%)</p>
      <p>Genesis Date: {genesis_date}</p>
      <p>Categories: {categories.join(', ')}</p>
      <p>Description: {description.en}</p>
      <p>Links:</p>
      <ul>
        {links.homepage.map((link, index) => (
          <li key={index}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              {link}
            </a>
          </li>
        ))}
      </ul>
      <p>Community Data:</p>
      <ul>
        <li>Facebook Likes: {community_data.facebook_likes}</li>
        <li>Twitter Followers: {community_data.twitter_followers}</li>
        {/* Adicione mais dados da comunidade conforme necessário */}
      </ul>
      <p>Developer Data:</p>
      <ul>
        <li>Stars on GitHub: {developer_data.stars}</li>
        <li>Subscribers on Reddit: {developer_data.subscribers}</li>
        {/* Adicione mais dados de desenvolvedores conforme necessário */}
      </ul>
      <p>Public Interest Stats:</p>
      <ul>
        <li>Alexa Rank: {public_interest_stats.alexa_rank}</li>
        {/* Adicione mais estatísticas de interesse público conforme necessário */}
      </ul>
      {/* Adicione mais detalhes conforme necessário */}
    </div>
  );
};

export default CryptoDetails;
