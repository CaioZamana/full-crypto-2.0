import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './PortfolioPage.module.css'; // CSS Modules
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const CACHE_EXPIRATION = 10 * 60 * 1000; // 10 minutos

const PortfolioPage = () => {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [cryptoOptions, setCryptoOptions] = useState([]);
  const [code, setCode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loadingOptions, setLoadingOptions] = useState(true);

  // Verifica se o cache é válido
  const isCacheValid = (timestamp) => {
    return Date.now() - timestamp < CACHE_EXPIRATION;
  };

  useEffect(() => {
    // Carregar portfólio salvo no `localStorage`
    const savedCryptocurrencies = JSON.parse(localStorage.getItem('cryptocurrencies')) || [];
    setCryptocurrencies(savedCryptocurrencies);

    // Buscar opções de criptoativos
    const fetchCryptoOptions = async () => {
      const cachedOptions = JSON.parse(localStorage.getItem('cryptoOptions')) || [];
      const cacheTimestamp = localStorage.getItem('cryptoOptionsTimestamp');

      // Usar cache, se disponível e válido
      if (cachedOptions.length > 0 && cacheTimestamp && isCacheValid(parseInt(cacheTimestamp))) {
        setCryptoOptions(cachedOptions);
        setLoadingOptions(false);
      }

      // Buscar dados atualizados na API
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
        setLoadingOptions(false);

        // Atualizar cache
        localStorage.setItem('cryptoOptions', JSON.stringify(sortedOptions));
        localStorage.setItem('cryptoOptionsTimestamp', Date.now());
      } catch (error) {
        console.error('Erro ao buscar criptoativos na API. Exibindo cache.', error);

        // Exibir cache se disponível
        if (cachedOptions.length > 0) {
          setCryptoOptions(cachedOptions);
        } else {
          setCryptoOptions([]);
        }
        setLoadingOptions(false);
      }
    };

    fetchCryptoOptions();
  }, []);

  const fetchCryptocurrencyPrice = async (cryptoCode) => {
    const cachedPrices = JSON.parse(localStorage.getItem('cryptoPrices')) || {};
    const cacheTimestamp = JSON.parse(localStorage.getItem('cryptoPricesTimestamp')) || {};

    // Usar cache, se válido
    if (cachedPrices[cryptoCode] && cacheTimestamp[cryptoCode] && isCacheValid(cacheTimestamp[cryptoCode])) {
      return cachedPrices[cryptoCode];
    }

    // Buscar preço atualizado na API
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoCode}&vs_currencies=usd`
      );
      const price = response.data[cryptoCode]?.usd || null;

      if (price !== null) {
        cachedPrices[cryptoCode] = price;
        cacheTimestamp[cryptoCode] = Date.now();

        // Atualizar cache
        localStorage.setItem('cryptoPrices', JSON.stringify(cachedPrices));
        localStorage.setItem('cryptoPricesTimestamp', JSON.stringify(cacheTimestamp));
      }
      return price;
    } catch (error) {
      console.error(`Erro ao buscar preço para ${cryptoCode} na API. Usando cache.`, error);
      return cachedPrices[cryptoCode] || null;
    }
  };

  const addCryptocurrency = (crypto) => {
    const existingCrypto = cryptocurrencies.find((c) => c.code === crypto.code);
    let updatedCryptocurrencies;

    if (existingCrypto) {
      updatedCryptocurrencies = cryptocurrencies.map((c) =>
        c.code === crypto.code ? { ...c, quantity: c.quantity + crypto.quantity } : c
      );
    } else {
      updatedCryptocurrencies = [...cryptocurrencies, crypto];
    }

    setCryptocurrencies(updatedCryptocurrencies);
    localStorage.setItem('cryptocurrencies', JSON.stringify(updatedCryptocurrencies)); // Salvar no localStorage
    setCode('');
    setQuantity('');
  };

  const removeCryptocurrency = (code) => {
    const updatedCryptocurrencies = cryptocurrencies.filter((crypto) => crypto.code !== code);
    setCryptocurrencies(updatedCryptocurrencies);
    localStorage.setItem('cryptocurrencies', JSON.stringify(updatedCryptocurrencies)); // Atualizar cache
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
              {cryptocurrencies.map((crypto, index) => (
                <tr key={index}>
                  <td>{crypto.code}</td>
                  <td>{crypto.quantity}</td>
                  <td>
                    {crypto.currentPrice !== undefined
                      ? `$${crypto.currentPrice.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 8,
                        })}`
                      : 'Carregando...'}
                  </td>
                  <td>
                    {crypto.currentPrice !== undefined
                      ? `$${(crypto.quantity * crypto.currentPrice).toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`
                      : 'Carregando...'}
                  </td>
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
