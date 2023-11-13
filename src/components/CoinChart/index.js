import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const CoinChart = ({ coinId }) => {
    const [chartData, setChartData] = useState({});
    const [marketData, setMarketData] = useState({});

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                // Obtém dados de mercado para a moeda
                const marketDataResponse = await axios.get(
                    `https://api.coingecko.com/api/v3/coins/${coinId}/market_data`
                );
                setMarketData(marketDataResponse.data);

                // Obtém dados de gráfico de preços para a moeda
                const chartDataResponse = await axios.get(
                    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
                    {
                        params: {
                            vs_currency: 'usd', // Pode ser ajustado para outras moedas
                            days: 30, // Pode ser ajustado para diferentes intervalos de tempo
                            interval: 'daily', // Pode ser ajustado para 'hourly', 'daily', 'weekly', 'monthly'
                        },
                    }
                );

                // Formata os dados para serem usados no gráfico
                const formattedChartData = {
                    labels: chartDataResponse.data.prices.map((data) => new Date(data[0]).toLocaleDateString()),
                    datasets: [
                        {
                            label: 'Price (USD)',
                            data: chartDataResponse.data.prices.map((data) => data[1]),
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1,
                        },
                    ],
                };

                setChartData(formattedChartData);
            } catch (error) {
                console.error('Erro ao buscar dados de mercado e gráfico de preços:', error);
            }
        };

        fetchChartData();
    }, [coinId]);

    return (
        <div>
            <h2>{marketData.name} - {marketData.symbol}</h2>
            <Line data={chartData} />
        </div>
    );
};

export default CoinChart;
