// CoinDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';

const CoinDetails = ({ params }) => {
  const [coinDetails, setCoinDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoinDetails = async () => {
      const coinId = params.id;
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}`
        );
        setCoinDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar detalhes da moeda:', error);
        setError('Erro ao carregar detalhes da moeda. Tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchCoinDetails();
  }, [params.id]);

  return (
    <div>
      <Header />
      <h1>Coin Details</h1>
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && coinDetails && (
        <div>
          <h2>{coinDetails.name} ({coinDetails.symbol})</h2>
          {/* Adicione aqui mais informações detalhadas sobre a moeda */}
        </div>
        
        
      )}
      <Footer />
    </div>
  );
};

export default CoinDetails;
