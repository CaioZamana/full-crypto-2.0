import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./ROICalculator.module.css";

const CACHE_EXPIRATION = 10 * 60 * 1000; // 10 minutos

const ROICalculator = () => {
  const [cryptoList, setCryptoList] = useState([]);
  const [currentCrypto, setCurrentCrypto] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [marketCap, setMarketCap] = useState(null);
  const [investment, setInvestment] = useState("");
  const [projections, setProjections] = useState([]);
  const [error, setError] = useState("");

  const isCacheValid = (timestamp) => Date.now() - timestamp < CACHE_EXPIRATION;

  // Fetch lista de criptomoedas com SWR
  useEffect(() => {
    const fetchCryptos = async () => {
      const cachedList = JSON.parse(localStorage.getItem("cryptoList")) || [];
      const cacheTimestamp = localStorage.getItem("cryptoListTimestamp");

      // Usar cache se válido
      if (cachedList.length > 0 && cacheTimestamp && isCacheValid(cacheTimestamp)) {
        setCryptoList(cachedList);
      }

      // Buscar dados atualizados da API (Revalidate)
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 500,
              page: 1,
            },
          }
        );
        setCryptoList(response.data);
        localStorage.setItem("cryptoList", JSON.stringify(response.data));
        localStorage.setItem("cryptoListTimestamp", Date.now());
      } catch (error) {
        console.error("Erro ao buscar lista de criptomoedas.", error);
        setError("Não foi possível carregar a lista de criptomoedas. Tente novamente mais tarde.");
      }
    };

    fetchCryptos();
  }, []);

  // Fetch dados de uma criptomoeda selecionada com SWR
  const handleCryptoSelection = async (cryptoId) => {
    setError("");
    setCurrentCrypto(cryptoId);
    setCurrentPrice(null);
    setMarketCap(null);
    setProjections([]);

    const cachedPrices = JSON.parse(localStorage.getItem("cryptoPrices")) || {};
    const cacheTimestamp = JSON.parse(localStorage.getItem("cryptoPricesTimestamp")) || {};

    // Usar cache se válido
    if (cachedPrices[cryptoId] && cacheTimestamp[cryptoId] && isCacheValid(cacheTimestamp[cryptoId])) {
      setCurrentPrice(cachedPrices[cryptoId].price);
      setMarketCap(cachedPrices[cryptoId].marketCap);
    }

    // Buscar dados atualizados da API (Revalidate)
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            ids: cryptoId,
          },
        }
      );
      const cryptoData = response.data[0];

      if (!cryptoData) {
        setError("Não foram encontrados dados para a criptomoeda selecionada.");
        return;
      }

      setCurrentPrice(cryptoData.current_price);
      setMarketCap(cryptoData.market_cap);

      // Atualizar cache
      cachedPrices[cryptoId] = {
        price: cryptoData.current_price,
        marketCap: cryptoData.market_cap,
      };
      cacheTimestamp[cryptoId] = Date.now();

      localStorage.setItem("cryptoPrices", JSON.stringify(cachedPrices));
      localStorage.setItem("cryptoPricesTimestamp", JSON.stringify(cacheTimestamp));
    } catch (error) {
      console.error("Erro ao buscar dados da criptomoeda.", error);
      setError("Não foi possível buscar os dados da criptomoeda. Tente novamente mais tarde.");
    }
  };

  const formatPrice = (price) => {
    if (price >= 1) {
      return `$${price.toFixed(2)}`;
    } else {
      const [mantissa, exponent] = price.toExponential(4).split("e");
      const formattedExponent = exponent.replace("-", "⁻");
      return `${mantissa} × 10${formattedExponent}`;
    }
  };

  const calculateProjections = () => {
    if (!currentPrice || !investment || !marketCap) {
      setError("Selecione uma criptomoeda válida antes de calcular o ROI.");
      return;
    }

    const price = parseFloat(currentPrice);
    const capital = parseFloat(investment);

    const calculatedProjections = [];
    for (let roi = 1; roi <= 369; roi++) {
      calculatedProjections.push({
        roi: `${roi}x`,
        price: price * roi,
        potential: (capital * roi).toFixed(2),
        marketCap: Number((marketCap * roi).toFixed(0)).toLocaleString("en-US"),
      });
    }

    setProjections(calculatedProjections);
  };

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.header}>Calculadora de ROI</h1>

      <div className={styles.form}>
        <label htmlFor="cryptoSelect" className={styles.label}>
          Selecione uma Criptomoeda:
        </label>
        <select
          id="cryptoSelect"
          className={styles.select}
          onChange={(e) => handleCryptoSelection(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            Selecione
          </option>
          {cryptoList.map((crypto) => (
            <option key={crypto.id} value={crypto.id}>
              {crypto.name}
            </option>
          ))}
        </select>

        {error && (
          <div className={styles.errorContainer}>
            <p className={styles.error}>{error}</p>
          </div>
        )}

        {currentCrypto && (
          <div className={styles.selectedCrypto}>
            <h3>Criptomoeda Selecionada: {currentCrypto}</h3>
          </div>
        )}

        <label htmlFor="investment" className={styles.label}>
          Capital Inicial (USD):
        </label>
        <input
          id="investment"
          type="number"
          className={styles.input}
          value={investment}
          onChange={(e) => setInvestment(e.target.value)}
        />

        {currentPrice && marketCap && (
          <div className={styles.cryptoDetails}>
            <p>
              Preço Atual: <span>{formatPrice(currentPrice)}</span>
            </p>
            <p>
              Market Cap: <span>${marketCap.toLocaleString("en-US")}</span>
            </p>
          </div>
        )}

        <button className={styles.button} onClick={calculateProjections}>
          Calcular ROI
        </button>
      </div>

      {projections.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ROI</th>
              <th>Preço (USD)</th>
              <th>Capital (USD)</th>
              <th>Market Cap (USD)</th>
            </tr>
          </thead>
          <tbody>
            {projections.map((proj, index) => (
              <tr key={index}>
                <td>{proj.roi}</td>
                <td>{formatPrice(proj.price)}</td>
                <td>${proj.potential}</td>
                <td>${proj.marketCap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Footer />
    </div>
  );
};

export default ROICalculator;
