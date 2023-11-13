// MarketExplorer.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, useSortBy, useFilters } from 'react-table';
import './MarketExplorer.css';
import Header from '../Header';
import Footer from '../Footer';

const CoinGeckoAPI = 'https://api.coingecko.com/api/v3';

const MarketExplorer = () => {
    const [markets, setMarkets] = useState([]);
    const [selectedMarket, setSelectedMarket] = useState(null);
    const [marketInfo, setMarketInfo] = useState({});
    const [tickers, setTickers] = useState([]);

    useEffect(() => {
        axios.get(`${CoinGeckoAPI}/exchanges`)
            .then(response => {
                const sortedMarkets = response.data.sort((a, b) => b.trade_volume_24h_btc - a.trade_volume_24h_btc);
                setMarkets(sortedMarkets);
            })
            .catch(error => console.error('Error fetching markets:', error));
    }, []);

    useEffect(() => {
        const fetchTickers = async () => {
            if (selectedMarket) {
                try {
                    const response = await axios.get(`${CoinGeckoAPI}/exchanges/${selectedMarket}/tickers`);
                    setTickers(response.data.tickers);
                } catch (error) {
                    console.error('Error fetching tickers:', error);
                }
            }
        };

        fetchTickers();
    }, [selectedMarket]);

    const handleMarketClick = async (marketId) => {
        try {
            const response = await axios.get(`${CoinGeckoAPI}/exchanges/${marketId}`);
            setMarketInfo(response.data);
            setSelectedMarket(marketId);
    
            const { status_updates, other_url_1, other_url_2, reddit_url, slack_url, has_trading_incentive, centralized, public_notice, alert_notice, tickers, ...filteredInfo } = response.data;
            setMarketInfo(filteredInfo);
    
            // Mover a página para o topo
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error('Error fetching market info:', error);
        }
    };
    // Columns for react-table
    const columns = React.useMemo(
        () => [
            {
                Header: 'Base',
                accessor: 'base',
            },
            {
                Header: 'Target',
                accessor: 'target',
            },
            {
                Header: 'Volume (BTC)',
                accessor: 'volume',
                Cell: ({ value }) => new Intl.NumberFormat('pt-BR').format(value),
            },
            {
                Header: 'Last',
                accessor: 'last',
                Cell: ({ value }) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'USD' }).format(value),
            },
            {
                Header: 'Bid/Ask Spread (%)',
                accessor: 'bid_ask_spread_percentage',
                Cell: ({ value }) => new Intl.NumberFormat('pt-BR').format(value),
            },
            {
                Header: 'Trade URL',
                accessor: 'trade_url',
                Cell: ({ value }) => <a href={value} target="_blank" rel="noopener noreferrer">{value}</a>,
            },
            {
                Header: 'Trust Score',
                accessor: 'trust_score',
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        // eslint-disable-next-line no-unused-vars
        state: { sortBy, filters },
    } = useTable(
        {
            columns,
            data: tickers,
        },
        useFilters,
        useSortBy
    );

    return (
        <div>
            <div>
                <Header />
                <main className="market-explorer">
                    <div className="market-info">
                        {Object.keys(marketInfo).length > 0 && (
                            <div>
                                <button onClick={() => window.location.reload()} style={{ cursor: 'pointer' }}>
                                    Nova Consulta
                                </button>
                                <h2>Informações do Mercado</h2>
                                {marketInfo.image && <img src={marketInfo.image} alt="Market Logo" />}
                                <p><strong>Nome:</strong> {marketInfo.name}</p>
                                {marketInfo.year_established && <p><strong>Ano de Estabelecimento:</strong> {marketInfo.year_established}</p>}
                                {marketInfo.country && <p><strong>País:</strong> {marketInfo.country}</p>}
                                {marketInfo.description && <p><strong>Descrição:</strong> {marketInfo.description}</p>}
                                {marketInfo.url && <p><strong>URL:</strong> <a href={marketInfo.url} target="_blank" rel="noopener noreferrer">{marketInfo.url}</a></p>}
                                {marketInfo.facebook_url && <p><strong>Facebook:</strong> <a href={marketInfo.facebook_url} target="_blank" rel="noopener noreferrer">{marketInfo.facebook_url}</a></p>}
                                {marketInfo.telegram_url && <p><strong>Telegram:</strong> <a href={marketInfo.telegram_url} target="_blank" rel="noopener noreferrer">{marketInfo.telegram_url}</a></p>}
                                {marketInfo.twitter_handle && <p><strong>Twitter:</strong> <a href={`https://twitter.com/${marketInfo.twitter_handle}`} target="_blank" rel="noopener noreferrer">{marketInfo.twitter_handle}</a></p>}
                                {marketInfo.trust_score && <p><strong>Trust Score:</strong> {marketInfo.trust_score}</p>}
                                {marketInfo.trust_score_rank && <p><strong>Trust Score Rank:</strong> {marketInfo.trust_score_rank}</p>}
                                {marketInfo.trade_volume_24h_btc && <p><strong>Volume de Negociação 24hs (BTC):</strong> {new Intl.NumberFormat('pt-BR').format(marketInfo.trade_volume_24h_btc)}</p>}
                                {marketInfo.trade_volume_24h_btc_normalized && <p><strong>Volume Normalizado 24hs (BTC):</strong> {new Intl.NumberFormat('pt-BR').format(marketInfo.trade_volume_24h_btc_normalized)}</p>}
                            </div>


                        )}

                        {tickers.length > 0 && (
                            <div className="list-tickers">
                                <h2>Lista de Tickers</h2>
                                <table {...getTableProps()}>
                                    <thead>
                                        {headerGroups.map(headerGroup => (
                                            <tr {...headerGroup.getHeaderGroupProps()}>
                                                {headerGroup.headers.map(column => (
                                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}</th>
                                                ))}
                                            </tr>
                                        ))}
                                    </thead>
                                    <tbody {...getTableBodyProps()}>
                                        {rows.map(row => {
                                            prepareRow(row);
                                            return (
                                                <tr {...row.getRowProps()}>
                                                    {row.cells.map(cell => (
                                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                                    ))}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    <div className="market-list">
                        <h1>Lista de Corretoras</h1>
                        <h2>Ordenada por volume de negociações<br /></h2>
                        <h2>Consulte uma Corretora:</h2>
                        <ul>
                            {markets.map(market => (
                                <li key={market.id} onClick={() => handleMarketClick(market.id)} className={selectedMarket === market.id ? 'selected' : ''}>
                                    <div>
                                        <p>{market.name}</p>
                                        <p><strong>Trust Score:</strong> {market.trust_score}</p>
                                        <p><strong>Trust Score Rank:</strong> {market.trust_score_rank}</p>
                                        <p><strong>Volume de Negociação 24hs (BTC):</strong> {new Intl.NumberFormat('pt-BR').format(market.trade_volume_24h_btc)}</p>
                                        <p><strong>Volume Normalizado 24hs (BTC):</strong> {new Intl.NumberFormat('pt-BR').format(market.trade_volume_24h_btc_normalized)}</p>
                                        {/* Adicione mais informações conforme necessário */}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default MarketExplorer;
