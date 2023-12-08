import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";


import About from './components/About';
import MarketExplorer from './components/MarketExplorer';
import CoinList from './components/CoinList';
import ContactPage from './components/ContactPage';
import PortfolioPage from './components/PortfolioPage';
import TradingChart from './components/TradingChart';
import BTCPage from './components/btc';
import CoinMultList from './components/CoinMultList';
import PrivacyPolicy from './components/PrivacyPolicy';
import CryptoConverter from './components/CryptoConverter';
import TrendingCoins from './components/TrendingCoins';
import CoinDetails from './components/CoinDetails/CoinDetails';
import CountdownTimer from './components/CountdownTimer';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/TrendingCoins" element={<TrendingCoins/>} />
          <Route path="/coin/:id" element={<CoinDetails/>} />
          <Route path="/" element={<CoinList />} />
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