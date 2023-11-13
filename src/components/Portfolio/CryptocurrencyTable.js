  import React from 'react';
  import CryptocurrencyRow from './CryptocurrencyRow';

  const CryptocurrencyTable = ({ cryptocurrencies, onRemoveCryptocurrency, convertToBRL, conversionRate }) => {
    // Função para calcular o valor total do portfólio
    

    return (
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Quantidade</th>
            <th>Preço Atual ({convertToBRL ? 'BRL' : 'USD'})</th>
            <th>Valor Total ({convertToBRL ? 'BRL' : 'USD'})</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cryptocurrencies.map((crypto, index) => (
            <CryptocurrencyRow
              key={index}
              cryptocurrency={crypto}
              onRemoveCryptocurrency={onRemoveCryptocurrency}
              convertToBRL={convertToBRL}
              conversionRate={conversionRate}
            />
          ))}
          {/* Nova linha para exibir o valor total do portfólio */}

        </tbody>
      </table>
    );
  };

  export default CryptocurrencyTable;
