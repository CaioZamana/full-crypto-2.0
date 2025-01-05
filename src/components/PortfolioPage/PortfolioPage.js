import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './PortfolioPage.module.css'; // CSS Modules
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const PortfolioPage = () => {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [cryptoOptions, setCryptoOptions] = useState([]);
  const [conversionRate, setConversionRate] = useState(1);
  const [code, setCode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    // Load saved portfolio from localStorage
    const savedCryptocurrencies = JSON.parse(localStorage.getItem('cryptocurrencies')) || [];
    setCryptocurrencies(savedCryptocurrencies);

    // Fetch BRL to USD conversion rate
    const fetchConversionRate = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=brl'
        );
        setConversionRate(response.data.usd.brl || 1);
      } catch (error) {
        console.error('Erro ao obter taxa de conversão de BRL para USD:', error);
      }
    };

    fetchConversionRate();

    // Fetch cryptocurrency options
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
        setCryptoOptions(options.sort((a, b) => a.label.localeCompare(b.label)));
        setLoadingOptions(false);
      } catch (error) {
        console.error('Erro ao buscar criptoativos:', error);
      }
    };

    fetchCryptoOptions();
  }, []);

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
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoCode}&vs_currencies=usd`
      );
      return response.data[cryptoCode]?.usd || null;
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
      <Header/>
      <header className={styles.header}>
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
      <Footer/>
    </div>
  );
};

export default PortfolioPage;
