import React, { useState } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./ROICalculator.module.css";
import { useCachedFetch } from "../../hooks/useCachedFetch";

const PRICE_TTL = 10 * 60 * 1000; // 10 minutes

// Stable fetcher — shared 'cryptoMarketList' cache key is also used by
// SearchBar, CryptoConverter and PortfolioPage; only one fetch per TTL window.
const fetchMarketList = () =>
  axios
    .get("https://api.coingecko.com/api/v3/coins/markets", {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 250,
        page: 1,
      },
    })
    .then((r) => r.data);

const isCacheValid = (ts) => Boolean(ts) && Date.now() - ts < PRICE_TTL;

const ROICalculator = () => {
  const { data: cryptoList = [] } = useCachedFetch("cryptoMarketList", fetchMarketList);

  const [currentCrypto, setCurrentCrypto] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [marketCap, setMarketCap] = useState(null);
  const [investment, setInvestment] = useState("");
  const [projections, setProjections] = useState([]);
  const [error, setError] = useState("");

  const handleCryptoSelection = async (cryptoId) => {
    setError("");
    setCurrentCrypto(cryptoId);
    setCurrentPrice(null);
    setMarketCap(null);
    setProjections([]);

    // cryptoMarketData stores { price, marketCap } per coin — separate from
    // the simple price cache used by CryptoConverter / PortfolioPage.
    const cachedData = JSON.parse(localStorage.getItem("cryptoMarketData")) || {};
    const cachedTs = JSON.parse(localStorage.getItem("cryptoMarketDataTimestamp")) || {};

    if (cachedData[cryptoId] && isCacheValid(cachedTs[cryptoId])) {
      setCurrentPrice(cachedData[cryptoId].price);
      setMarketCap(cachedData[cryptoId].marketCap);
      return;
    }

    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        { params: { vs_currency: "usd", ids: cryptoId } }
      );
      const cryptoData = response.data[0];

      if (!cryptoData) {
        setError("Não foram encontrados dados para a criptomoeda selecionada.");
        return;
      }

      setCurrentPrice(cryptoData.current_price);
      setMarketCap(cryptoData.market_cap);

      cachedData[cryptoId] = { price: cryptoData.current_price, marketCap: cryptoData.market_cap };
      cachedTs[cryptoId] = Date.now();
      localStorage.setItem("cryptoMarketData", JSON.stringify(cachedData));
      localStorage.setItem("cryptoMarketDataTimestamp", JSON.stringify(cachedTs));
    } catch (err) {
      console.error("Erro ao buscar dados da criptomoeda.", err);
      setError("Não foi possível buscar os dados da criptomoeda. Tente novamente mais tarde.");
    }
  };

  const formatPrice = (price) => {
    if (price >= 1) {
      return `$${price.toFixed(2)}`;
    }
    const [mantissa, exponent] = price.toExponential(4).split("e");
    const formattedExponent = exponent.replace("-", "⁻");
    return `${mantissa} × 10${formattedExponent}`;
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
            {currentCrypto && (
              <button
                className={styles.retryButton}
                onClick={() => handleCryptoSelection(currentCrypto)}
              >
                Tentar novamente
              </button>
            )}
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
