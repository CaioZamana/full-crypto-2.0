import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import styles from './PortfolioPage.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useCachedFetch } from '../../hooks/useCachedFetch';
import coingecko from '../../services/coingecko';

const PRICE_TTL = 10 * 60 * 1000;

// Stable reference — 'cryptoMarketList' is shared with SearchBar, CryptoConverter,
// ROICalculator; only one HTTP request fires per TTL window across all components.
const fetchMarketList = () =>
  coingecko.getMarkets({ per_page: 250, page: 1 }).then((r) => r.data);

const isCacheValid = (ts) => Boolean(ts) && Date.now() - ts < PRICE_TTL;

const fetchCryptocurrencyPrice = async (cryptoCode) => {
  const cachedPrices = JSON.parse(localStorage.getItem('cryptoPrices')) || {};
  const cacheTimestamp = JSON.parse(localStorage.getItem('cryptoPricesTimestamp')) || {};

  if (cachedPrices[cryptoCode] !== undefined && isCacheValid(cacheTimestamp[cryptoCode])) {
    return cachedPrices[cryptoCode];
  }

  const response = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoCode}&vs_currencies=usd`
  );
  const price = response.data[cryptoCode]?.usd ?? null;

  if (price !== null) {
    cachedPrices[cryptoCode] = price;
    cacheTimestamp[cryptoCode] = Date.now();
    localStorage.setItem('cryptoPrices', JSON.stringify(cachedPrices));
    localStorage.setItem('cryptoPricesTimestamp', JSON.stringify(cacheTimestamp));
  }

  return price;
};

const PortfolioPage = () => {
  const [cryptocurrencies, setCryptocurrencies] = useState(
    () => JSON.parse(localStorage.getItem('cryptocurrencies')) || []
  );
  const [code, setCode] = useState('');
  const [quantity, setQuantity] = useState('');

  const { data: coinList = [], loading: loadingOptions } = useCachedFetch(
    'cryptoMarketList',
    fetchMarketList
  );

  // Derived — no extra localStorage key or separate fetch needed.
  const cryptoOptions = useMemo(
    () =>
      [...coinList]
        .map((c) => ({ value: c.id, label: c.symbol.toUpperCase() }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [coinList]
  );

  useEffect(() => {
    localStorage.setItem('cryptocurrencies', JSON.stringify(cryptocurrencies));
  }, [cryptocurrencies]);

  const addCryptocurrency = (crypto) => {
    setCryptocurrencies((prev) => {
      const existing = prev.find((c) => c.code === crypto.code);
      if (existing) {
        toast.success(`${crypto.code.toUpperCase()} atualizado no portfólio`);
        return prev.map((c) =>
          c.code === crypto.code ? { ...c, quantity: c.quantity + crypto.quantity } : c
        );
      }
      toast.success(`${crypto.code.toUpperCase()} adicionado ao portfólio`);
      return [...prev, crypto];
    });
    setCode('');
    setQuantity('');
  };

  const removeCryptocurrency = (cryptoCode) => {
    setCryptocurrencies((prev) => prev.filter((c) => c.code !== cryptoCode));
    toast(`${cryptoCode.toUpperCase()} removido do portfólio`, { icon: '🗑️' });
  };

  const calculateTotalValue = () =>
    cryptocurrencies.reduce((total, c) => total + c.quantity * (c.currentPrice || 0), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code || !quantity) return;

    try {
      const currentPrice = await fetchCryptocurrencyPrice(code);
      if (currentPrice !== null) {
        addCryptocurrency({ code, quantity: parseFloat(quantity), currentPrice });
      } else {
        toast.error('Não foi possível obter o preço. Tente novamente.');
      }
    } catch {
      toast.error('Não foi possível obter o preço. Tente novamente.');
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <header className={styles.pageHeader}>
        <h1>Portfólio de Criptomoedas</h1>
      </header>
      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.addForm}>
          <label>
            Criptoativo:
            {loadingOptions && cryptoOptions.length === 0 ? (
              <select disabled>
                <option value="">Carregando opções...</option>
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
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>
          <button type="submit">Adicionar</button>
        </form>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Código</th>
                <th>Quantidade</th>
                <th>Preço Atual (USD)</th>
                <th>Valor Total (USD)</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {cryptocurrencies.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles.emptyState}>
                    Seu portfólio está vazio.
                  </td>
                </tr>
              ) : (
                cryptocurrencies.map((crypto, index) => (
                  <tr key={index}>
                    <td>{crypto.code}</td>
                    <td>{crypto.quantity}</td>
                    <td>
                      {crypto.currentPrice !== undefined
                        ? `$${crypto.currentPrice.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 8,
                          })}`
                        : '—'}
                    </td>
                    <td>
                      {crypto.currentPrice !== undefined
                        ? `$${(crypto.quantity * crypto.currentPrice).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}`
                        : '—'}
                    </td>
                    <td>
                      <button onClick={() => removeCryptocurrency(crypto.code)}>Remover</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className={styles.totalValue}>
          <h2>Valor Total do Portfólio: ${calculateTotalValue().toFixed(2)}</h2>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioPage;
