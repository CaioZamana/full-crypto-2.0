import React from 'react';

const CryptoDetailsCard = ({ cryptoDetails, closeModal }) => {
  // Função auxiliar para calcular a porcentagem
  const calculatePercentage = (currentPrice, historicalPrice) => {
    return ((currentPrice / historicalPrice - 1) * 100).toFixed(2);
  };
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  const formatNumber = (value) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };
  
  return (
    <div>
    <button onClick={closeModal}>Fechar</button>
      {/* Additional information from CryptoDetails component */}
      <h2>{cryptoDetails.name} ({cryptoDetails.symbol})</h2>
      <img src={cryptoDetails.image?.large} alt={`${cryptoDetails.name} Logo`} style={{ maxWidth: '100px' }} />
    <p>Site Oficial: <a href={cryptoDetails.links.homepage[0]} target="_blank" rel="noopener noreferrer">{cryptoDetails.links.homepage[0]}</a></p>
      <p>Preço Atual: {formatCurrency(cryptoDetails.market_data.current_price.usd)}</p>
      <p>Capitalização de Mercado: {formatCurrency(cryptoDetails.market_data.market_cap.usd)}</p>
      <p>Volume de 24h: {formatCurrency(cryptoDetails.market_data.total_volume.usd)}</p>

      <p>All-Time High (ATH): {formatCurrency(cryptoDetails.market_data.ath?.usd || 0)} ({cryptoDetails.market_data.ath ? calculatePercentage(cryptoDetails.market_data.current_price.usd, cryptoDetails.market_data.ath.usd) : 'N/A'}%)</p>
      <p>All-Time Low (ATL): {formatCurrency(cryptoDetails.market_data.atl?.usd || 0)} ({cryptoDetails.market_data.atl ? calculatePercentage(cryptoDetails.market_data.current_price.usd, cryptoDetails.market_data.atl.usd) : 'N/A'}%)</p>

      {/* Informações Adicionais */}
      <p>Fornecimento Circulante: {formatNumber(cryptoDetails.market_data.circulating_supply)} {cryptoDetails.symbol}</p>
      <p>Fornecimento Total: {formatNumber(cryptoDetails.market_data.total_supply)} {cryptoDetails.symbol}</p>

      {/* Informações de 24h */}
      <p>Variação de 24h: {cryptoDetails.market_data.price_change_percentage_24h.toFixed(2)}%</p>
      <p>Máx. de 24h: {formatCurrency(cryptoDetails.market_data.high_24h.usd)}</p>
      <p>Mín. de 24h: {formatCurrency(cryptoDetails.market_data.low_24h.usd)}</p>



      <p>Genesis Date: {cryptoDetails.genesis_date}</p>
      <p>Categories: {cryptoDetails.categories.join(', ')}</p>
      <p>Description: {cryptoDetails.description.en}</p>

      <p>Community Data:</p>
      <ul>
        <li>Facebook Likes: {cryptoDetails.community_data.facebook_likes}</li>
        <li>Twitter Followers: {cryptoDetails.community_data.twitter_followers}</li>
        {/* Add more community data as needed */}
      </ul>

      <p>Developer Data:</p>
      <ul>
        <li>Stars on GitHub: {cryptoDetails.developer_data.stars}</li>
        <li>Subscribers on Reddit: {cryptoDetails.developer_data.subscribers}</li>
        {/* Add more developer data as needed */}
      </ul>

      <p>Public Interest Stats:</p>
      <ul>
        <li>Alexa Rank: {cryptoDetails.public_interest_stats.alexa_rank}</li>
        {/* Add more public interest stats as needed */}
      </ul>

      {/* Additional information from CryptoDetails component */}
    </div>
  );
};

export default CryptoDetailsCard;
