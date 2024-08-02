import './TradingChart.css'
import React from "react";
//https://www.npmjs.com/package/react-tradingview-embed/v/3.0.6
import { AdvancedChart } from "react-tradingview-embed";
import Header from "../Header";
import Footer from '../Footer';

//https://k-128.github.io/react-tradingview-embed/?path=/story/widgets--advanced-chart-story
//https://www.tradingview.com/widget/advanced-chart/
const TradingChart = () => {
  return (
    <div>
      <div>
        <Header/>
      </div>
      <AdvancedChart widgetProps={{
        "symbol": "BABYDOGEWBNB_C736CA.USD",
        "interval": "D",
        "timezone": "America/Sao_Paulo",
        "theme": "dark",
        "style": "1",
        "save_image": true,
        "hide_side_toolbar": false,
        "allow_symbol_change": true,
        "withdateranges": true,
        "hide_legend": false,
        "hotlist": true,
        "calendar": true,
        "enable_publishing": false,
        "range": "YTD",
        "locale": "br",

        "watchlist": [
          "AMEX:SPY",
          "BINANCE:BTCUSDT",
          "CRYPTOCAP:TOTAL",
          "CRYPTOCAP:BTC.D",
          "CRYPTOCAP:TOTALDEFI",
          "BABYDOGEWBNB_C736CA.USD",
          "BINANCE:ETHUSDT",
          "BINANCE:BNBUSDT",
          "BINANCE:USDCUSDT",
          "BINANCE:XRPUSDT",
          "BINANCE:LUNAUSDT",
          "BINANCE:ADAUSDT",
          "BINANCE:SOLUSDT",
          "BINANCE:AVAXUSDT",
          "BINANCE:DOGEUSDT",
          "BINANCE:DOTUSDT",
          "BINANCE:SHIBUSDT",
          "BINANCE:NEARUSDT",
          "BINANCE:ATOMUSDT",
          "BINANCE:GRTUSDT",
          "BINANCE:MATICUSDT",
          "BINANCE:RUNEUSDT",
          "BINANCE:FTMUSDT",
          "BINANCE:APEUSDT",
          "BINANCE:DYDXUSD",
          "BINANCE:UNIUSDT",
          "BINANCE:AVAXUSDT",
          "BINANCE:DOGEUSDT",
          "BINANCE:MATICUSDT",
          "BINANCE:SHIBUSDT",
          "BINANCE:NEARUSDT",
          "BINANCE:ATOMUSDT",
          "BINANCE:GRTUSDT",
          "BINANCE:MATICUSDT",
          "BINANCE:RUNEUSDT",
          "BINANCE:FTMUSDT",
          "BINANCE:APEUSDT",
          "BINANCE:TRXUSDT",
          "BINANCE:LTCUSDT",
          "BINANCE:XLMUSDT",
          "BINANCE:LINKUSDT",
          "BINANCE:VETUSDT",
          "BINANCE:ALGOUSDT",
          "BINANCE:MANAUSDT",
          "BINANCE:THETAUSDT",
          "BINANCE:AVAXUSDT",
          "BINANCE:DOGEUSDT",
          "BINANCE:MATICUSDT",
          "BINANCE:SHIBUSDT",
          "BINANCE:NEARUSDT",
          "BINANCE:ATOMUSDT",
          "BINANCE:GRTUSDT",
          "BINANCE:MATICUSDT",
          "BINANCE:RUNEUSDT",
          "BINANCE:FTMUSDT",
          "BINANCE:APEUSDT"
        ],
        "studies": [
          "STD;MA%1Cross"
        ],

      }} />

      <Footer/>
    </div>
  );
};

export default TradingChart;
