import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import styles from './CryptoConverter.module.css';
import { useCachedFetch } from '../../hooks/useCachedFetch';
import coingecko from '../../services/coingecko';
import { formatCryptoAmount } from '../../utils/formatters';

const PRICE_TTL = 10 * 60 * 1000; // 10 minutes

const fetchMarketList = () =>
  coingecko.getMarkets({ per_page: 250, page: 1 }).then((r) => r.data);

const isCacheValid = (ts) => Boolean(ts) && Date.now() - ts < PRICE_TTL;

const fetchPrice = async (crypto) => {
  const cachedPrices = JSON.parse(localStorage.getItem('cryptoPrices')) || {};
  const cacheTimestamps = JSON.parse(localStorage.getItem('cryptoPricesTimestamp')) || {};

  if (cachedPrices[crypto] !== undefined && isCacheValid(cacheTimestamps[crypto])) {
    return cachedPrices[crypto];
  }

  const response = await coingecko.getSimplePrice(crypto);
  const price = response.data[crypto]?.usd;

  if (price !== undefined) {
    cachedPrices[crypto] = price;
    cacheTimestamps[crypto] = Date.now();
    localStorage.setItem('cryptoPrices', JSON.stringify(cachedPrices));
    localStorage.setItem('cryptoPricesTimestamp', JSON.stringify(cacheTimestamps));
  }

  return price;
};

const CryptoConverter = () => {
  const { data: cryptoList = [], loading: listLoading } = useCachedFetch(
    'cryptoMarketList',
    fetchMarketList
  );

  const [fromCrypto, setFromCrypto] = useState('');
  const [toCrypto, setToCrypto] = useState('');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(false);

  const convertCrypto = async () => {
    try {
      setLoading(true);
      const [fromPrice, toPrice] = await Promise.all([
        fetchPrice(fromCrypto),
        fetchPrice(toCrypto),
      ]);

      if (fromPrice && toPrice) {
        setConvertedAmount((amount * fromPrice) / toPrice);
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


  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Conversor de Criptomoedas</h1>
        <div className={styles.converterBox}>
          <div className={styles.inputGroup}>
            <label htmlFor="fromCrypto">De:</label>
            <select
              id="fromCrypto"
              value={fromCrypto}
              onChange={(e) => setFromCrypto(e.target.value)}
              disabled={listLoading && cryptoList.length === 0}
            >
              <option value="" disabled>
                {listLoading && cryptoList.length === 0 ? 'Carregando...' : 'Selecione...'}
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
            <select
              id="toCrypto"
              value={toCrypto}
              onChange={(e) => setToCrypto(e.target.value)}
              disabled={listLoading && cryptoList.length === 0}
            >
              <option value="" disabled>
                {listLoading && cryptoList.length === 0 ? 'Carregando...' : 'Selecione...'}
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
              {formatCryptoAmount(amount)} {fromCrypto} é igual a{' '}
              {formatCryptoAmount(convertedAmount)} {toCrypto}
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CryptoConverter;
