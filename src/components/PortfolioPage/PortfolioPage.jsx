import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './PortfolioPage.module.css'; // CSS Modules
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const PortfolioPage = () => {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [cryptoOptions, setCryptoOptions] = useState(() => {
    const cachedOptions = localStorage.getItem('cryptoOptions');
    return cachedOptions ? JSON.parse(cachedOptions) : [];
  });
  const [code, setCode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loadingOptions, setLoadingOptions] = useState(cryptoOptions.length === 0);

  useEffect(() => {
    // Load saved portfolio from localStorage
    const savedCryptocurrencies = JSON.parse(localStorage.getItem('cryptocurrencies')) || [];
    setCryptocurrencies(savedCryptocurrencies);

    // Fetch cryptocurrency options with caching
    const fetchCryptoOptions = async () => {
      if (cryptoOptions.length > 0) {
        setLoadingOptions(false);
        return;
      }
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 250,
              page: 1,
            },
          }
        );
        const options = response.data.map((crypto) => ({
          value: crypto.id,
          label: crypto.symbol.toUpperCase(),
        }));
        const sortedOptions = options.sort((a, b) => a.label.localeCompare(b.label));
        setCryptoOptions(sortedOptions);
        localStorage.setItem('cryptoOptions', JSON.stringify(sortedOptions));
        setLoadingOptions(false);
      } catch (error) {
        console.error('Erro ao buscar criptoativos:', error);
      }
    };

    fetchCryptoOptions();
  }, [cryptoOptions]);

  useEffect(() => {
    // Save portfolio to localStorage whenever it changes
    localStorage.setItem('cryptocurrencies', JSON.stringify(cryptocurrencies));
  }, [cryptocurrencies]);

  const addCryptocurrency = (crypto) => {
    const existingCrypto = cryptocurrencies.find((c) => c.code === crypto.code);
    if (existingCrypto) {
      const updatedCryptocurrencies = cryptocurrencies.map((c) =>
        c.code === crypto.code ? { ...c, quantity: c.quantity + crypto.quantity } : c
      );
      setCryptocurrencies(updatedCryptocurrencies);
    } else {
      setCryptocurrencies([...cryptocurrencies, crypto]);
    }
    setCode('');
    setQuantity('');
  };

  const removeCryptocurrency = (code) => {
    setCryptocurrencies(cryptocurrencies.filter((crypto) => crypto.code !== code));
  };

  const fetchCryptocurrencyPrice = async (cryptoCode) => {
    const cachedPrices = JSON.parse(localStorage.getItem('cryptoPrices')) || {};
    if (cachedPrices[cryptoCode]) {
      return cachedPrices[cryptoCode];
    }
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoCode}&vs_currencies=usd`
      );
      const price = response.data[cryptoCode]?.usd || null;
      cachedPrices[cryptoCode] = price;
      localStorage.setItem('cryptoPrices', JSON.stringify(cachedPrices));
      return price;
    } catch (error) {
      console.error('Erro ao obter preço da criptomoeda:', error);
      return null;
    }
  };

  const calculateTotalValue = () => {
    return cryptocurrencies.reduce((total, crypto) => {
      return total + crypto.quantity * (crypto.currentPrice || 0);
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code || !quantity) return;

    const currentPrice = await fetchCryptocurrencyPrice(code);
    if (currentPrice) {
      addCryptocurrency({ code, quantity: parseFloat(quantity), currentPrice });
    } else {
      console.error('Erro ao obter preço da criptomoeda.');
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
            {loadingOptions ? (
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
              step="0.01"
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
              {cryptocurrencies.map((crypto, index) => (
                <tr key={index}>
                  <td>{crypto.code}</td>
                  <td>{crypto.quantity}</td>
                  <td>${crypto.currentPrice?.toFixed(2) || 'Carregando...'}</td>
                  <td>${(crypto.quantity * crypto.currentPrice || 0).toFixed(2)}</td>
                  <td>
                    <button onClick={() => removeCryptocurrency(crypto.code)}>Remover</button>
                  </td>
                </tr>
              ))}
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
