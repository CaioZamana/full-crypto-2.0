import React from 'react';
import './CryptoDetailsCard.css';

const CryptoInfoBox = ({ title, content }) => (
  <div className="info-box">
    <h3>{title}</h3>
    {content}
  </div>
);

const CryptoDetailsCard = ({ cryptoDetails, closeModal }) => {
  if (!cryptoDetails) {
    return (
      <div className="crypto-details-container">
        <button onClick={closeModal}>Voltar</button>
        <p>Detalhes da criptomoeda não disponíveis.</p>
      </div>
    );
  }

  const calculatePercentage = (currentPrice, historicalPrice) => {
    return ((currentPrice / historicalPrice - 1) * 100).toFixed(2);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  return (
    <div className="xparadireita">
      <button onClick={closeModal}>X</button>
      <div className="additional-info">

      </div>


      <div className="header">
        <h2>{cryptoDetails.name} ({cryptoDetails.symbol})</h2>
        <img src={cryptoDetails.image?.large} alt={`${cryptoDetails.name} Logo`} />
        <h4>Site Oficial: <a href={cryptoDetails.links?.homepage?.[0]} target="_blank" rel="noopener noreferrer">{cryptoDetails.links?.homepage?.[0]}</a></h4>
      </div>
      <div className="daily-info">
        <CryptoInfoBox title="Preço Atual" content={formatCurrency(cryptoDetails.market_data?.current_price?.usd)} />
        <CryptoInfoBox title="Posição no Rank" content={cryptoDetails.market_cap_rank} />
        <CryptoInfoBox title="Variação de 24h" content={`${cryptoDetails.market_data?.price_change_percentage_24h?.toFixed(2)}%`} />
        <CryptoInfoBox title="Máx. de 24h" content={formatCurrency(cryptoDetails.market_data?.high_24h?.usd)} />
        <CryptoInfoBox title="Mín. de 24h" content={formatCurrency(cryptoDetails.market_data?.low_24h?.usd)} />
        <CryptoInfoBox title="Volume de 24h" content={formatCurrency(cryptoDetails.market_data?.total_volume?.usd)} />
        <CryptoInfoBox title="Genesis Date" content={cryptoDetails.genesis_date} />
      </div>

      <div className="daily-info">
        <CryptoInfoBox title="Capitalização de Mercado" content={formatCurrency(cryptoDetails.market_data?.market_cap?.usd)} />
        <CryptoInfoBox title="All-Time High (ATH)" content={`${formatCurrency(cryptoDetails.market_data?.ath?.usd || 0)} (${cryptoDetails.market_data?.ath ? calculatePercentage(cryptoDetails.market_data?.current_price?.usd, cryptoDetails.market_data?.ath?.usd) : 'N/A'}%)`} />
        <CryptoInfoBox title="All-Time Low (ATL)" content={`${formatCurrency(cryptoDetails.market_data?.atl?.usd || 0)} (${cryptoDetails.market_data?.atl ? calculatePercentage(cryptoDetails.market_data?.current_price?.usd, cryptoDetails.market_data?.atl?.usd) : 'N/A'}%)`} />
        <CryptoInfoBox title="Fornecimento Circulante" content={`${formatNumber(cryptoDetails.market_data?.circulating_supply)} ${cryptoDetails.symbol}`} />
        <CryptoInfoBox title="Fornecimento Total" content={`${formatNumber(cryptoDetails.market_data?.total_supply)} ${cryptoDetails.symbol}`} />
      </div>

      <CryptoInfoBox title="Categories" content={cryptoDetails.categories?.join(', ')} />
      <CryptoInfoBox title="Description" content={cryptoDetails.description?.en} />
      <CryptoInfoBox title="Public Notice" content={cryptoDetails.public_notice} />

      <div className="additional-info">
      </div>

      <div className='daily-info'>
        <div className="community-info">
          <CryptoInfoBox title="Community Data" content={
            <ul>
              <li>Facebook Likes: {cryptoDetails.community_data?.facebook_likes}</li>
              <li>Twitter Followers: {cryptoDetails.community_data?.twitter_followers}</li>

            </ul>
          } />
        </div>

        <div className="developer-info">
          <CryptoInfoBox title="Developer Data" content={
            <ul>
              <li>Stars on GitHub: {cryptoDetails.developer_data?.stars}</li>
              <li>Subscribers on Reddit: {cryptoDetails.developer_data?.subscribers}</li>
            </ul>
          } />
        </div>

        <div className="public-interest-info">
          <CryptoInfoBox title="Public Interest Stats" content={
            <ul>
              <li>Alexa Rank: {cryptoDetails.public_interest_stats?.alexa_rank}</li>
            </ul>

          } />
        </div>

      </div>
      <p>Site Oficial:</p> <a href={cryptoDetails.links?.homepage?.[0]} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }} >{cryptoDetails.links?.homepage?.[0]}</a>

      <p>Subreddit:</p>
      <a href={cryptoDetails.links?.subreddit_url} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>{cryptoDetails.links?.subreddit_url}</a>
      <p>Blockchain Site:</p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {cryptoDetails.links?.blockchain_site
          .filter(site => site.trim() !== '') // Remove links vazios
          .map((site, index) => (
            <li key={index} style={{ marginBottom: 0 }}>
              <a href={site} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>{site}</a>
            </li>
          ))}
      </ul>

    </div>
  );
};

export default CryptoDetailsCard;
