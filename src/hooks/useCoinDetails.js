import { useState, useCallback } from 'react';
import coingecko from '../services/coingecko';

const useCoinDetails = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDetails = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await coingecko.getCoinDetails(id);
      setData(response.data);
    } catch (err) {
      setError('Erro ao buscar detalhes da criptomoeda.');
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return { data, loading, error, fetchDetails, clear };
};

export default useCoinDetails;
