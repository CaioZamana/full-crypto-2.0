
import React, { useState, useEffect } from 'react';
import AddCryptocurrencyForm from '../../components/Portfolio/AddCryptocurrencyForm';
import CryptocurrencyTable from '../../components/Portfolio/CryptocurrencyTable';
import { fetchBRLtoUSDConversionRate } from '../../components/Portfolio/api';
import './style.css';
import Footer from '../Footer';
import Header from '../Header';


const PortfolioPage = () => {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [conversionRate, setConversionRate] = useState(1);

  useEffect(() => {
    // Recuperar valores do localStorage ao carregar a página
    const savedCryptocurrencies = JSON.parse(localStorage.getItem('cryptocurrencies'));
    if (savedCryptocurrencies) {
      setCryptocurrencies(savedCryptocurrencies);
    }

    // Buscar a taxa de conversão da API
    fetchBRLtoUSDConversionRate()
      .then(rate => {
        if (rate) {
          setConversionRate(rate);
        }
      })
      .catch(error => {
        console.error('Erro ao obter taxa de conversão de BRL para USD:', error);
      });
  }, []);

  useEffect(() => {
    // Salvar valores no localStorage sempre que cryptocurrencies for atualizado
    localStorage.setItem('cryptocurrencies', JSON.stringify(cryptocurrencies));
  }, [cryptocurrencies]);

  const addCryptocurrency = (crypto) => {
    const existingCrypto = cryptocurrencies.find((c) => c.code === crypto.code);
    if (existingCrypto) {
      // Se a criptomoeda já existir no portfólio, atualiza a quantidade
      const updatedCryptocurrencies = cryptocurrencies.map((c) =>
        c.code === crypto.code ? { ...c, quantity: c.quantity + crypto.quantity } : c
      );
      setCryptocurrencies(updatedCryptocurrencies);
    } else {
      // Se a criptomoeda não existir no portfólio, adiciona como novo item
      setCryptocurrencies([...cryptocurrencies, crypto]);
    }
  };

  const removeCryptocurrency = (code) => {
    setCryptocurrencies(cryptocurrencies.filter((crypto) => crypto.code !== code));
  };

  return (
    <div>
      <Header/>
    <h1>Portfolio de Criptomoedas</h1>

      <AddCryptocurrencyForm onAddCryptocurrency={addCryptocurrency} />
      <br/>
      <CryptocurrencyTable
        cryptocurrencies={cryptocurrencies}
        onRemoveCryptocurrency={removeCryptocurrency}
        conversionRate={conversionRate}
      />
      <Footer/>
    </div>
  );
};

export default PortfolioPage ;
