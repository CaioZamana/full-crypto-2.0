import React from 'react';

const CryptoDetailsCard = ({ cryptoDetails, closeModal }) => {
  // Função auxiliar para calcular a porcentagem
  const calculatePercentage = (currentPrice, historicalPrice) => {
    return ((currentPrice / historicalPrice - 1) * 100).toFixed(2);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  return (
    <div>
      <h2>{cryptoDetails.name} ({cryptoDetails.symbol})</h2>
      <p>Preço Atual: {formatCurrency(cryptoDetails.market_data.current_price.usd)}</p>
      <p>Capitalização de Mercado: {formatCurrency(cryptoDetails.market_data.market_cap.usd)}</p>
      <p>Volume de 24h: {formatCurrency(cryptoDetails.market_data.total_volume.usd)}</p>
      <p>Variação de 24h: {cryptoDetails.market_data.price_change_percentage_24h.toFixed(2)}%</p>

      {/* Informações Adicionais */}
      <p>ATH (Máxima Histórica): {cryptoDetails.market_data.ath ? formatCurrency(cryptoDetails.market_data.ath.usd) : 'N/A'}</p>
      <p>ATL (Mínima Histórica): {cryptoDetails.market_data.atl ? formatCurrency(cryptoDetails.market_data.atl.usd) : 'N/A'}</p>
      <p>Fornecimento Circulante: {formatNumber(cryptoDetails.market_data.circulating_supply)} {cryptoDetails.symbol}</p>
      <p>Fornecimento Total: {formatNumber(cryptoDetails.market_data.total_supply)} {cryptoDetails.symbol}</p>

      {/* Informações de 24h */}
      <p>Máx. de 24h: {formatCurrency(cryptoDetails.market_data.high_24h.usd)}</p>
      <p>Mín. de 24h: {formatCurrency(cryptoDetails.market_data.low_24h.usd)}</p>
      <p>Abertura de 24h: {cryptoDetails.market_data.price_change_percentage_24h_in_currency.usd.toFixed(2)}%</p>

      {/* Porcentagens em relação às máximas históricas */}
      {cryptoDetails.market_data.ath &&
        <p>Porcentagem em relação à ATH: {calculatePercentage(cryptoDetails.market_data.current_price.usd, cryptoDetails.market_data.ath.usd)}%</p>
      }
      {cryptoDetails.market_data.atl &&
        <p>Porcentagem em relação à ATL: {calculatePercentage(cryptoDetails.market_data.current_price.usd, cryptoDetails.market_data.atl.usd)}%</p>
      }

      <p>Site Oficial: <a href={cryptoDetails.links.homepage[0]} target="_blank" rel="noopener noreferrer">{cryptoDetails.links.homepage[0]}</a></p>

      <button onClick={closeModal}>Fechar</button>
    </div>
  );
};

export default CryptoDetailsCard;
