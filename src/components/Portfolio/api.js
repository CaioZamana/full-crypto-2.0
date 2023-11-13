import axios from 'axios';

const fetchCryptocurrencyPrice = async (cryptoCode) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoCode}&vs_currencies=usd`
    );
    return response.data[cryptoCode].usd;
  } catch (error) {
    console.error('Erro ao obter preço da criptomoeda:', error);
    return null;
  }
};

const fetchBRLtoUSDConversionRate = async () => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=brl'
    );
    return response.data.usd.brl;
  } catch (error) {
    console.error('Erro ao obter taxa de conversão de BRL para USD:', error);
    return null;
  }
};

export { fetchCryptocurrencyPrice, fetchBRLtoUSDConversionRate };
