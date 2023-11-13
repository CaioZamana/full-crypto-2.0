import React from 'react';
import './style.css';
import realizedPriceImage from './realized-price.png';
import stockToFlowImage from './Stock-Flow.PNG';
import tool2YearMAImage from './Tool2-YearMAMultiplier.PNG';
import rainbowBtcImage from './RainbowBtc.PNG';
import btcRsiImage from './btc-rsi.PNG';
import movingAverageHeatmapImage from './200 Week Moving Average Heatmap.PNG';
import cycleLowMultipleImage from './Cycle-low-multiple.PNG';
import mayerMultipleImage from './Mayer-Multiple.PNG';
import chartImage from './chart.PNG';
import topCapImage from './TopCAp.PNG';
import balancedPriceImage from './Balanced Price.PNG';
import terminalPriceImage from './Bitcoin Terminal Price.PNG';
import Footer from '../Footer';
import Header from '../Header';

function BTCPage() {
  return (
    <div>
      <Header/>
      <h1>Bem-vindos ao Bitcoin Study</h1>
      <p>Para cotações atualizadas, clique nos gráficos</p>
      <table>
        <tbody>
          <tr>
            <td>
              <a href="https://www.lookintobitcoin.com/charts/realized-price/" target="_blank" rel="noreferrer">
                <img src={realizedPriceImage} alt="BTC Realized Price" />
              </a>
              BTC Realized Price
            </td>
            <td>
              <a href="https://www.lookintobitcoin.com/charts/stock-to-flow-model/" target="_blank" rel="noreferrer">
                <img src={stockToFlowImage} alt="Bitcoin: Stock-to-Flow Model" />
              </a>
              Bitcoin: Stock-to-Flow Model
            </td>
            <td>
              <a href="https://www.lookintobitcoin.com/charts/bitcoin-investor-tool/" target="_blank" rel="noreferrer">
                <img src={tool2YearMAImage} alt="Bitcoin Investor Tool: 2-Year MA Multiplier" />
              </a>
              Bitcoin Investor Tool: 2-Year MA Multiplier
            </td>
          </tr>
          <tr>
            <td>
              <a href="https://www.lookintobitcoin.com/charts/bitcoin-rainbow-chart/" target="_blank" rel="noreferrer">
                <img src={rainbowBtcImage} alt="Bitcoin Rainbow Price Chart Indicator" />
              </a>
              Bitcoin Rainbow Price Chart Indicator
            </td>
            <td>
              <a href="https://charts.bitbo.io/monthly-rsi/" target="_blank" rel="noreferrer">
                <img src={btcRsiImage} alt="Bitcoin relative strength index" />
              </a>
              Bitcoin relative strength index
            </td>
            <td>
              <a href="https://www.coinglass.com/pro/i/200WMA" target="_blank" rel="noreferrer">
                <img src={movingAverageHeatmapImage} alt="200 Week Moving Average Heatmap" />
              </a>
              200 Week Moving Average Heatmap
            </td>
          </tr>
          <tr>

          <td>
                <a href="https://charts.bitbo.io/cycle-low-multiple/" target="_blank" rel="noreferrer">
                  <img src={cycleLowMultipleImage} alt="Produto 1" />
                </a>
                Cycle low multiple
              </td>
              <td>
                <a href="https://buybitcoinworldwide.com/mayer-multiple/" target="_blank" rel="noreferrer">
                  <img src={mayerMultipleImage} alt="Produto 1" />
                </a>
                Mayer Multiple Indicator Chart
              </td>
              <td>
                <a href="https://react-portfolio-ranking-chart.vercel.app/" target="_blank" rel="noreferrer">
                  <img src={chartImage} alt="Produto 1" />
                </a>
                Your Portfolio, Chart, and Ranking
              </td>
          </tr>
          <tr>
              <td>
                <a href="https://www.lookintobitcoin.com/charts/top-cap/" target="_blank" rel="noreferrer">
                  <img src={topCapImage} alt="Produto 1" />
                </a>
                Bitcoin: Top Cap
              </td>
              <td>
                <a href="https://www.lookintobitcoin.com/charts/balanced-price/" target="_blank" rel="noreferrer">
                  <img src={balancedPriceImage} alt="Produto 1" />
                </a>
                Bitcoin: Balanced Price
              </td>
              <td>
                <a href="https://www.lookintobitcoin.com/charts/terminal-price/" target="_blank" rel="noreferrer">
                  <img src={terminalPriceImage} alt="Produto 1" />
                </a>
                Bitcoin: Terminal Price
              </td>
            </tr>
        </tbody>
      </table>
      <Footer/>
    </div>
  );
}

export default BTCPage;
