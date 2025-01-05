import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";


import About from './components/About/About.js';
import MarketExplorer from './components/MarketExplorer/MarketExplorer.js';
import CoinList from './components/CoinList/CoinList.jsx';
import ContactPage from './components/ContactPage/ContactPage.js';
import PortfolioPage from './components/PortfolioPage/PortfolioPage.js';
import TradingChart from './components/TradingChart/TradingChart.js';
import BTCPage from './components/btc/btc.js';
import CoinMultList from './components/CoinMultList/CoinMultList.js';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy.js';
import CryptoConverter from './components/CryptoConverter/CryptoConverter.js';
import TrendingCoins from './components/TrendingCoins/TrendingCoins.js';
import CoinDetails from './components/CoinDetails/CoinDetails';
import CountdownTimer from './components/CountdownTimer/CountdownTimer.js';
import ROICalculator from './components/RoiCalculator/ROICalculator';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/TrendingCoins" element={<TrendingCoins/>} />
          <Route path="/coin/:id" element={<CoinDetails/>} />
          <Route path="/" element={<CoinList />} />
          <Route path="/RoiCalculator" element={<ROICalculator/>} />
          <Route path="/CoinMultList" element={<CoinMultList />} />
          <Route path="/About" element={<About />} />
          <Route path="/MarketExplorer" element={<MarketExplorer />} />
          <Route path="/CoinList" element={<CoinList />} />
          <Route path="/ContactPage" element={<ContactPage />} />
          <Route path="/PortfolioPage" element={<PortfolioPage />} />
          <Route path="/TradingChart" element={<TradingChart />} />
          <Route path="/btc" element={<BTCPage />} />
          <Route path='/PrivacyPolicy' element={<PrivacyPolicy />} />
          <Route path='/CryptoConverter' element={<CryptoConverter />} />
          <Route path="/CountdownTimer" element={<CountdownTimer/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;