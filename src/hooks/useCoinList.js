import { useState, useEffect, useRef } from 'react';
import coingecko from '../services/coingecko';

const CACHE_EXPIRATION = 10 * 60 * 1000;

const useCoinList = (currentPage = 1, itemsPerPage = 250) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const revalidating = useRef(false);

  useEffect(() => {
    const cacheKey = `cryptoCache_p${currentPage}`;
    const timestampKey = `cryptoCacheTimestamp_p${currentPage}`;
    const cached = localStorage.getItem(cacheKey);
    const timestamp = localStorage.getItem(timestampKey);
    const isValid = timestamp && Date.now() - parseInt(timestamp, 10) < CACHE_EXPIRATION;

    const fetchFromAPI = async (background = false) => {
      if (!background) setLoading(true);
      try {
        const response = await coingecko.getMarkets({
          per_page: itemsPerPage,
          page: currentPage,
        });
        setData(response.data);
        localStorage.setItem(cacheKey, JSON.stringify(response.data));
        localStorage.setItem(timestampKey, Date.now().toString());
        setError(null);
      } catch (err) {
        if (!background) {
          setError('Erro ao buscar lista de criptomoedas.');
          if (cached) setData(JSON.parse(cached));
        }
      } finally {
        if (!background) setLoading(false);
        revalidating.current = false;
      }
    };

    if (cached) {
      setData(JSON.parse(cached));
      if (!isValid && !revalidating.current) {
        revalidating.current = true;
        fetchFromAPI(true);
      }
    } else {
      fetchFromAPI(false);
    }
  }, [currentPage, itemsPerPage]);

  return { data, loading, error };
};

export default useCoinList;
