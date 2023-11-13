// src/components/AddCryptocurrencyForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddCryptocurrencyForm = ({ onAddCryptocurrency }) => {
  const [code, setCode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [cryptoOptions, setCryptoOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoOptions = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 200,
              page: 1,
            },
          }
        );
        const options = response.data.map((crypto) => ({
          value: crypto.id,
          label: crypto.symbol.toUpperCase(),
        }));
        const sortedOptions = options.sort((a, b) => a.label.localeCompare(b.label)); // Sort options alphabetically
        setCryptoOptions(sortedOptions);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar criptoativos:', error);
      }
    };

    fetchCryptoOptions();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCryptocurrency({ code, quantity: parseFloat(quantity) });
    setCode('');
    setQuantity('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Criptoativo:
        {loading ? (
          <select disabled>
            <option value="">Carregando...</option>
          </select>
        ) : (
          <select value={code} onChange={(e) => setCode(e.target.value)}>
            <option value="">Selecione um criptoativo</option>
            {cryptoOptions.map((crypto) => (
              <option key={crypto.value} value={crypto.value}>
                {crypto.label}
              </option>
            ))}
          </select>
        )}
      </label>
      <label>
        Quantidade:
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </label>
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default AddCryptocurrencyForm;
