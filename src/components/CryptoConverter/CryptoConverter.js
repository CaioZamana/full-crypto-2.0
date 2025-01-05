import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import styles from './CryptoConverter.module.css';

const CACHE_EXPIRATION = 10 * 60 * 1000; // 10 minutos em milissegundos

const CryptoConverter = () => {
  const [cryptoList, setCryptoList] = useState([]);
  const [fromCrypto, setFromCrypto] = useState('');
  const [toCrypto, setToCrypto] = useState('');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(false);

  // Função para verificar se o cache expirou
  const isCacheValid = (timestamp) => {
    return Date.now() - timestamp < CACHE_EXPIRATION;
  };

  useEffect(() => {
    const fetchCryptoList = async () => {
      const cachedList = JSON.parse(localStorage.getItem('cryptoList')) || [];
      const cacheTimestamp = localStorage.getItem('cryptoListTimestamp');

      // Usar cache se disponível e válido
      if (cachedList.length > 0 && cacheTimestamp && isCacheValid(cacheTimestamp)) {
        setCryptoList(cachedList);
      }

      // Tentar buscar dados atualizados da API
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 250,
            page: 1,
            sparkline: false,
          },
        });
        setCryptoList(response.data);
        localStorage.setItem('cryptoList', JSON.stringify(response.data));
        localStorage.setItem('cryptoListTimestamp', Date.now());
      } catch (error) {
        console.error('Erro ao buscar lista de criptomoedas. Usando apenas o cache.', error);
      }
    };

    fetchCryptoList();
  }, []);

  const fetchPrice = async (crypto) => {
    const cachedPrices = JSON.parse(localStorage.getItem('cryptoPrices')) || {};
    const cacheTimestamp = JSON.parse(localStorage.getItem('cryptoPricesTimestamp')) || {};

    // Retornar preço do cache se válido
    if (cachedPrices[crypto] && cacheTimestamp[crypto] && isCacheValid(cacheTimestamp[crypto])) {
      return cachedPrices[crypto];
    }

    // Buscar preço atualizado da API
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`
      );
      const price = response.data[crypto]?.usd;

      if (price !== undefined) {
        cachedPrices[crypto] = price;
        cacheTimestamp[crypto] = Date.now();
        localStorage.setItem('cryptoPrices', JSON.stringify(cachedPrices));
        localStorage.setItem('cryptoPricesTimestamp', JSON.stringify(cacheTimestamp));
      }

      return price;
    } catch (error) {
      console.error(`Erro ao buscar preço para ${crypto}. Usando apenas o cache.`, error);
      return cachedPrices[crypto] || null;
    }
  };

  const convertCrypto = async () => {
    try {
      setLoading(true);

      const fromCryptoPrice = await fetchPrice(fromCrypto);
      const toCryptoPrice = await fetchPrice(toCrypto);

      if (fromCryptoPrice && toCryptoPrice) {
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

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: value < 1 ? 8 : 2,
      maximumFractionDigits: 8,
    });
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Conversor de Criptomoedas</h1>
        <div className={styles.converterBox}>
          <div className={styles.inputGroup}>
            <label htmlFor="fromCrypto">De:</label>
            <select id="fromCrypto" value={fromCrypto} onChange={(e) => setFromCrypto(e.target.value)}>
              <option value="" disabled>
                Selecione...
              </option>
              {cryptoList.map((crypto) => (
                <option key={crypto.id} value={crypto.id}>
                  {crypto.name} ({crypto.symbol.toUpperCase()})
                </option>
              ))}
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="toCrypto">Para:</label>
            <select id="toCrypto" value={toCrypto} onChange={(e) => setToCrypto(e.target.value)}>
              <option value="" disabled>
                Selecione...
              </option>
              {cryptoList.map((crypto) => (
                <option key={crypto.id} value={crypto.id}>
                  {crypto.name} ({crypto.symbol.toUpperCase()})
                </option>
              ))}
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="amount">Quantidade:</label>
            <input
              id="amount"
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button
            className={styles.convertButton}
            onClick={convertCrypto}
            disabled={loading || !fromCrypto || !toCrypto}
          >
            {loading ? 'Convertendo...' : 'Converter'}
          </button>
        </div>
        {convertedAmount !== null && !loading && (
          <div className={styles.resultBox}>
            <p>
              {formatCurrency(amount)} {fromCrypto} é igual a{' '}
              {formatCurrency(convertedAmount)} {toCrypto}
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CryptoConverter;
