import React from 'react';
import './btc.module.css';
import piCycleTopIndicator from './Pi Cycle Top Indicator.png'
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
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

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
              BTC Realized Price
              <a href="https://www.bitcoinmagazinepro.com/charts/pi-cycle-top-indicator/" target="_blank" rel="noreferrer">
                <img src={piCycleTopIndicator} alt="Bitcoin: Pi Cycle Top Indicator" />
              </a>
            </td>
            <td>
              Bitcoin: Stock-to-Flow Model
              <a href="https://www.lookintobitcoin.com/charts/stock-to-flow-model/" target="_blank" rel="noreferrer">
                <img src={stockToFlowImage} alt="Bitcoin: Stock-to-Flow Model" />
              </a>
            </td>
            <td>
              Bitcoin Investor Tool: 2-Year MA Multiplier
              <a href="https://www.lookintobitcoin.com/charts/bitcoin-investor-tool/" target="_blank" rel="noreferrer">
                <img src={tool2YearMAImage} alt="Bitcoin Investor Tool: 2-Year MA Multiplier" />
              </a>
            </td>
          </tr>
          <tr>
            <td>
              Bitcoin Rainbow Price Chart Indicator
              <a href="https://www.lookintobitcoin.com/charts/bitcoin-rainbow-chart/" target="_blank" rel="noreferrer">
                <img src={rainbowBtcImage} alt="Bitcoin Rainbow Price Chart Indicator" />
              </a>
            </td>
            <td>
              Bitcoin relative strength index
              <a href="https://charts.bitbo.io/monthly-rsi/" target="_blank" rel="noreferrer">
                <img src={btcRsiImage} alt="Bitcoin relative strength index" />
              </a>
            </td>
            <td>
              200 Week Moving Average Heatmap
              <a href="https://www.coinglass.com/pro/i/200WMA" target="_blank" rel="noreferrer">
                <img src={movingAverageHeatmapImage} alt="200 Week Moving Average Heatmap" />
              </a>
            </td>
          </tr>
          <tr>

          <td>
                Cycle low multiple
                <a href="https://charts.bitbo.io/cycle-low-multiple/" target="_blank" rel="noreferrer">
                  <img src={cycleLowMultipleImage} alt="Produto 1" />
                </a>
              </td>
              <td>
                Mayer Multiple Indicator Chart
                <a href="https://buybitcoinworldwide.com/mayer-multiple/" target="_blank" rel="noreferrer">
                  <img src={mayerMultipleImage} alt="Produto 1" />
                </a>
              </td>
              <td>
                Your Portfolio
                <a href="../PortfolioPage" target="_blank" rel="noreferrer">
                  <img src={chartImage} alt="Produto 1" />
                </a>
              </td>
          </tr>
          <tr>
              <td>
                Bitcoin: Top Cap
                <a href="https://www.lookintobitcoin.com/charts/top-cap/" target="_blank" rel="noreferrer">
                  <img src={topCapImage} alt="Produto 1" />
                </a>
              </td>
              <td>
                Bitcoin: Balanced Price
                <a href="https://www.lookintobitcoin.com/charts/balanced-price/" target="_blank" rel="noreferrer">
                  <img src={balancedPriceImage} alt="Produto 1" />
                </a>
              </td>
              <td>
                Bitcoin: Terminal Price
                <a href="https://www.lookintobitcoin.com/charts/terminal-price/" target="_blank" rel="noreferrer">
                  <img src={terminalPriceImage} alt="Produto 1" />
                </a>
              </td>
            </tr>
        </tbody>
      </table>
      <Footer/>
    </div>
  );
}

export default BTCPage;
