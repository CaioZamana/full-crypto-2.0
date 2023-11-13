import React from 'react';

const TotalPortfolioValue = ({ cryptocurrencies }) => {
  // Função para calcular o valor total do portfólio em dólares
  const calculateTotalValue = () => {
    return cryptocurrencies.reduce((acc, crypto) => {
      if (
        crypto.currentPrice !== null &&
        !isNaN(crypto.currentPrice) &&
        !isNaN(crypto.quantity)
      ) {
        return acc + crypto.quantity * crypto.currentPrice;
      } else {
        return acc;
      }
    }, 0);
  };

  // Aguardar até que todos os preços estejam carregados antes de exibir o valor total
  if (cryptocurrencies.some((crypto) => crypto.currentPrice === null)) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>Valor Total do Portfólio (USD): ${calculateTotalValue().toFixed(2)}</h2>
    </div>
  );
};

export default TotalPortfolioValue;
