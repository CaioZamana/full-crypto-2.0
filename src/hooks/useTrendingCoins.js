import { useState, useEffect } from 'react';
import coingecko from '../services/coingecko';

const useTrendingCoins = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await coingecko.getTrending();
        setData(response.data.coins || []);
      } catch (err) {
        setError('Erro ao carregar moedas de tendência. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return { data, loading, error };
};

export default useTrendingCoins;
