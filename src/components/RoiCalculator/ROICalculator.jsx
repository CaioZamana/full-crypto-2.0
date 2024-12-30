import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../Footer";
import Header from "../Header";

const ROICalculator = () => {
  const [cryptoList, setCryptoList] = useState([]); // Lista de criptomoedas
  const [currentCrypto, setCurrentCrypto] = useState(null); // Criptomoeda selecionada
  const [currentPrice, setCurrentPrice] = useState(0); // Preço atual da criptomoeda
  const [marketCap, setMarketCap] = useState(0); // Market Cap atual da criptomoeda
  const [investment, setInvestment] = useState(""); // Montante em dólares da banca
  const [projections, setProjections] = useState([]); // Projeções de ROI

  // Fetch a lista de criptomoedas ao carregar o componente
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

  // Atualiza a criptomoeda selecionada e obtém o preço atual e Market Cap
  const handleCryptoSelection = async (cryptoId) => {
    setCurrentCrypto(cryptoId); // Atualiza o estado da criptomoeda selecionada
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
      setCurrentPrice(cryptoData.current_price); // Define o preço atual da criptomoeda
      setMarketCap(cryptoData.market_cap); // Define o Market Cap atual
    } catch (error) {
      console.error("Erro ao buscar dados da criptomoeda:", error);
    }
  };

  // Função para formatar os preços com decimais dinâmicos e notação exponencial
  const formatPrice = (price) => {
    if (price >= 1) {
      return `$${price.toFixed(2)}`; // Para valores maiores ou iguais a 1, exibe 2 casas decimais
    } else {
      // Para valores menores que 1, ajusta a notação exponencial com símbolo matemático
      const [mantissa, exponent] = price.toExponential(4).split("e");
      const formattedExponent = exponent.replace("-", "⁻"); // Converte o expoente para superíndice
      const decimalValue = price.toFixed(15).replace(/0+$/, ""); // Calcula o valor real do número
      return `${decimalValue} = (${mantissa} × 10${formattedExponent})`;
    }
  };
  
  // Calcula as projeções de ROI de 1x a 100x
  const calculateProjections = () => {
    if (!currentPrice || !investment || !marketCap) return;

    const price = parseFloat(currentPrice);
    const capital = parseFloat(investment);

    // Lista de projeções de 1x a 100x
    const calculatedProjections = [];
    for (let roi = 1; roi <= 100; roi++) {
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
    <div>
      <Header/>
      <h1>Calculadora de ROI</h1>

      {/* Dropdown para selecionar a criptomoeda */}
      <select
        onChange={(e) => handleCryptoSelection(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>
          Selecione uma Criptomoeda
        </option>
        {cryptoList.map((crypto) => (
          <option key={crypto.id} value={crypto.id}>
            {crypto.name}
          </option>
        ))}
      </select>

      {/* Mostra a criptomoeda selecionada */}
      {currentCrypto && (
        <div style={{ marginTop: "20px" }}>
          <h3>Criptomoeda Selecionada: {currentCrypto}</h3>
        </div>
      )}

      {/* Campo para editar o valor da banca */}
      <div style={{ margin: "20px 0" }}>
        <label>Banca (USD): </label>
        <input
          type="number"
          value={investment}
          onChange={(e) => setInvestment(e.target.value)}
        />
      </div>

      {/* Exibe o preço atual da criptomoeda */}
      {currentPrice > 0 && (
        <div style={{ marginTop: "10px" }}>
          <p>Preço Atual da Criptomoeda: {formatPrice(currentPrice)}</p>
          <p>Market Cap Atual: ${marketCap.toLocaleString("en-US")}</p>
        </div>
      )}

      {/* Botão para calcular ROI */}
      <button onClick={calculateProjections} style={{ marginTop: "10px" }}>
        Calcular ROI
      </button>

      {/* Tabela de Projeções */}
      {projections.length > 0 && (
        <table
          border="1"
          cellPadding="10"
          style={{
            marginTop: "20px",
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th>ROI</th>
              <th>Preço Projetado (USD)</th>
              <th>Capital Projetado (USD)</th>
              <th>Market Cap Projetado (USD)</th>
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
    <Footer/>
    </div>
  );
};

export default ROICalculator;
