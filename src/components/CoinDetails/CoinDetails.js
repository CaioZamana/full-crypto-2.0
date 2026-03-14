// CoinDetails.js
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import useCoinDetails from '../../hooks/useCoinDetails';

const CoinDetails = () => {
  const { id } = useParams();
  const { data: coinDetails, loading, error, fetchDetails } = useCoinDetails();

  useEffect(() => {
    if (id) fetchDetails(id);
  }, [id, fetchDetails]);

  return (
    <div>
      <Header />
      <h1>Coin Details</h1>
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && coinDetails && (
        <div>
          <h2>{coinDetails.name} ({coinDetails.symbol})</h2>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default CoinDetails;
