import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import './Markets.css';

const CoinGeckoAPI = 'https://api.coingecko.com/api/v3';

const Markets = () => {
  const [markets, setMarkets] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState('');
  const [marketInfo, setMarketInfo] = useState({});
  const [tickers, setTickers] = useState([]);
  const [ohlcData, setOhlcData] = useState([]);
  const [marketChartData, setMarketChartData] = useState([]);
  const [marketData, setMarketData] = useState({});

  useEffect(() => {
    // Fetch all markets
    axios.get(`${CoinGeckoAPI}/exchanges`)
      .then(response => setMarkets(response.data))
      .catch(error => console.error('Error fetching markets:', error));
  }, []);

  const handleMarketInfo = async () => {
    try {
      const response = await axios.get(`${CoinGeckoAPI}/exchanges/${selectedMarket}`);
      setMarketInfo(response.data);
    } catch (error) {
      console.error('Error fetching market info:', error);
    }
  };

  const handleTickers = async () => {
    try {
      const response = await axios.get(`${CoinGeckoAPI}/exchange_rates`);
      setTickers(response.data.rates);
    } catch (error) {
      console.error('Error fetching tickers:', error);
    }
  };

  const handleOhlcData = async () => {
    try {
      const response = await axios.get(`${CoinGeckoAPI}/coins/bitcoin/ohlc`);
      setOhlcData(response.data);
    } catch (error) {
      console.error('Error fetching OHLC data:', error);
    }
  };

  const handleMarketChartData = async () => {
    try {
      const response = await axios.get(`${CoinGeckoAPI}/coins/bitcoin/market_chart`);
      setMarketChartData(response.data);
    } catch (error) {
      console.error('Error fetching market chart data:', error);
    }
  };

  const handleMarketData = async () => {
    try {
      const response = await axios.get(`${CoinGeckoAPI}/coins/bitcoin`);
      setMarketData(response.data.market_data);
    } catch (error) {
      console.error('Error fetching market data:', error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>CoinGecko Markets Explorer</h1>
          <Form>
            <Form.Group controlId="marketSelect">
              <Form.Label>Select Market</Form.Label>
              <Form.Control as="select" onChange={(e) => setSelectedMarket(e.target.value)}>
                <option value="">-- Select Market --</option>
                {markets.map((market) => (
                  <option key={market.id} value={market.id}>{market.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={handleMarketInfo}>Get Market Info</Button>
            <Button variant="success" onClick={handleTickers}>Get Tickers</Button>
            <Button variant="info" onClick={handleOhlcData}>Get OHLC Data</Button>
            <Button variant="warning" onClick={handleMarketChartData}>Get Market Chart Data</Button>
            <Button variant="danger" onClick={handleMarketData}>Get Market Data</Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Market Information</h2>
          {Object.keys(marketInfo).length > 0 && (
            <Table striped bordered hover>
              <tbody>
                {Object.entries(marketInfo).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Tickers</h2>
          {tickers.length > 0 && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Currency</th>
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody>
                {tickers.map(({ currency, rate }) => (
                  <tr key={currency}>
                    <td>{currency}</td>
                    <td>{rate}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>OHLC Data</h2>
          {ohlcData.length > 0 && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Open</th>
                  <th>High</th>
                  <th>Low</th>
                  <th>Close</th>
                </tr>
              </thead>
              <tbody>
                {ohlcData.map(([timestamp, open, high, low, close]) => (
                  <tr key={timestamp}>
                    <td>{timestamp}</td>
                    <td>{open}</td>
                    <td>{high}</td>
                    <td>{low}</td>
                    <td>{close}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Market Chart Data</h2>
          {marketChartData.length > 0 && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {marketChartData.map(([timestamp, price]) => (
                  <tr key={timestamp}>
                    <td>{timestamp}</td>
                    <td>{price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Market Data</h2>
          {Object.keys(marketData).length > 0 && (
            <Table striped bordered hover>
              <tbody>
                {Object.entries(marketData).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Markets;
