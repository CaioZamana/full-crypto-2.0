import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./ROICalculator.module.css";

const ROICalculator = () => {
  const [cryptoList, setCryptoList] = useState([]);
  const [currentCrypto, setCurrentCrypto] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [marketCap, setMarketCap] = useState(0);
  const [investment, setInvestment] = useState("");
  const [projections, setProjections] = useState([]);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 200,
              page: 1,
            },
          }
        );
        setCryptoList(response.data);
      } catch (error) {
        console.error("Erro ao buscar lista de criptomoedas:", error);
      }
    };

    fetchCryptos();
  }, []);

  const handleCryptoSelection = async (cryptoId) => {
    setCurrentCrypto(cryptoId);
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets`,
        {
          params: {
            vs_currency: "usd",
            ids: cryptoId,
          },
        }
      );
      const cryptoData = response.data[0];
      setCurrentPrice(cryptoData.current_price);
      setMarketCap(cryptoData.market_cap);
    } catch (error) {
      console.error("Erro ao buscar dados da criptomoeda:", error);
    }
  };

  const formatPrice = (price) => {
    if (price >= 1) {
      return `$${price.toFixed(2)}`;
    } else {
      const [mantissa, exponent] = price.toExponential(4).split("e");
      const formattedExponent = exponent.replace("-", "⁻");
      const decimalValue = price.toFixed(15).replace(/0+$/, "");
      return `${decimalValue} = (${mantissa} × 10${formattedExponent})`;
    }
  };

  const calculateProjections = () => {
    if (!currentPrice || !investment || !marketCap) return;

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

        {currentPrice > 0 && (
          <div className={styles.cryptoDetails}>
            <p>Preço Atual: {formatPrice(currentPrice)}</p>
            <p>Market Cap: ${marketCap.toLocaleString("en-US")}</p>
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
