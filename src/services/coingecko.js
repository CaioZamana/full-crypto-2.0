import axios from 'axios';

const BASE_URL = process.env.REACT_APP_COINGECKO_URL;

const coingecko = {
  getMarkets: (params = {}) =>
    axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        sparkline: false,
        ...params,
      },
    }),

  getCoinDetails: (id) =>
    axios.get(`${BASE_URL}/coins/${id}`),

  getTrending: () =>
    axios.get(`${BASE_URL}/search/trending`),

  getSimplePrice: (ids) =>
    axios.get(`${BASE_URL}/simple/price`, {
      params: { ids, vs_currencies: 'usd' },
    }),

  getExchanges: () =>
    axios.get(`${BASE_URL}/exchanges`),

  getExchangeDetails: (id) =>
    axios.get(`${BASE_URL}/exchanges/${id}`),

  getExchangeTickers: (id) =>
    axios.get(`${BASE_URL}/exchanges/${id}/tickers`),
};

export default coingecko;
