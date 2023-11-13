import React, { useState, useEffect } from 'react';
import { fetchCryptocurrencyPrice } from './api';

const CryptocurrencyRow = ({ cryptocurrency, onRemoveCryptocurrency, convertToBRL }) => {
  const { code, quantity } = cryptocurrency;
  const [currentPrice, setCurrentPrice] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const price = await fetchCryptocurrencyPrice(code);
        setCurrentPrice(parseFloat(price)); // Convertendo o preço para um número de ponto flutuante
      } catch (error) {
        console.error('Erro ao obter preço da criptomoeda:', error);
        setCurrentPrice(null);
      }
    };

    fetchPrice();
  }, [code]);

  const calculateTotalValue = () => {
    if (currentPrice === null || isNaN(currentPrice) || isNaN(quantity)) {
      return 'N/A';
    }
    const totalValue = quantity * currentPrice;
    return convertToBRL ? convertToBRL(totalValue) : totalValue.toFixed(2);
  };

  return (
    <tr>
      <td>{code}</td>
      <td>{quantity}</td>
      <td>${currentPrice !== null ? currentPrice : 'Carregando...'}</td>
      <td>{convertToBRL ? 'R$' : '$'}{calculateTotalValue()}</td>
      <td>
        <button onClick={() => onRemoveCryptocurrency(code)}>X</button>
      </td>
    </tr>
  );
};

export default CryptocurrencyRow;
