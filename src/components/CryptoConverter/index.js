import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../Footer';
import Header from '../Header';
import './CryptoConverter.css';

const CryptoConverter = () => {
  const [cryptoList, setCryptoList] = useState([]);
  const [fromCrypto, setFromCrypto] = useState('');
  const [toCrypto, setToCrypto] = useState('');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCryptoList = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 250,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCryptoList(response.data);
      } catch (error) {
        console.error('Erro ao buscar lista de criptomoedas:', error);
      }
    };

    fetchCryptoList();
  }, []);

  const convertCrypto = async () => {
    try {
      setLoading(true);

      const responseFrom = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${fromCrypto}&vs_currencies=usd`
      );
      const responseTo = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${toCrypto}&vs_currencies=usd`
      );

      const fromCryptoPrice = responseFrom.data[fromCrypto]?.usd;
      const toCryptoPrice = responseTo.data[toCrypto]?.usd;

      if (fromCryptoPrice !== undefined && toCryptoPrice !== undefined) {
        setConvertedAmount((amount * fromCryptoPrice) / toCryptoPrice);
      } else {
        console.error('Erro ao obter informações de preço para a conversão.');
        setConvertedAmount(null);
      }
    } catch (error) {
      console.error('Erro ao converter criptomoeda:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFromCryptoChange = (event) => {
    setFromCrypto(event.target.value);
  };

  const handleToCryptoChange = (event) => {
    setToCrypto(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleConvert = () => {
    convertCrypto();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount).replace('R$', ''); // Remove o "R$"
  };

  return (
    <div className="">
      <Header />
      <h1>Crypto Converter</h1>
      <div>
        <label>
          De:
          <select value={fromCrypto} onChange={handleFromCryptoChange}>
            <option value="" disabled>
              Selecione...
            </option>
            {cryptoList.map((crypto) => (
              <option key={crypto.id} value={crypto.id}>
                {crypto.name} ({crypto.symbol})
              </option>
            ))}
          </select>
        </label>
        <label>
          Para:
          <select value={toCrypto} onChange={handleToCryptoChange}>
            <option value="" disabled>
              Selecione...
            </option>
            {cryptoList.map((crypto) => (
              <option key={crypto.id} value={crypto.id}>
                {crypto.name} ({crypto.symbol})
              </option>
            ))}
          </select>
        </label>
        <label>
          Quantidade:
          <input type="number" value={amount} onChange={handleAmountChange} />
        </label>
        <button onClick={handleConvert} disabled={loading}>
          {loading ? 'Convertendo...' : 'Converter'}
        </button>
        {convertedAmount !== null && !loading ? (
          <div className="result-container">
            <p>
              Resultado: {formatCurrency(amount)} de {fromCrypto} é igual a{' '}
              {formatCurrency(Number.isInteger(convertedAmount)
                ? convertedAmount
                : convertedAmount.toFixed(8))} {toCrypto}
            </p>
          </div>
        ) : (
          <p></p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CryptoConverter;
