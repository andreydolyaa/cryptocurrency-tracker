


import './CurrencyDetails.scss';
import React, { useEffect, useRef, useState } from 'react';
import { cryptoService } from './../../services/cryptoService';
import Badge from '../../components/Badge/Badge';
import Dropdown from './../../components/Dropdown/Dropdown';
import RoutesBar from './../../components/RoutesBar/RoutesBar';
import { Route, Switch } from 'react-router-dom';
import HistoricalData from './../HistoricalData/HistoricalData';
import Graphs from './../Graphs/Graphs';
import loading from '../../assets/icons/loading.gif';
import Description from './../../components/Description/Description';
import Links from './../../components/Links/Links';
import Trade from './../../components/Trade/Trade';
import Menus from '../../components/Menus/Menus';
import MarketCap from '../../components/MarketCap/MarketCap';
import Scroll from '../../components/Scroll/Scroll';


export default function CurrencyDetails(props) {
    const daysRef = useRef();
    const [currency, setCurrency] = useState([]);
    const [price, setPrice] = useState();
    const [coin, setCoin] = useState(props.match.params.id);
    const [last24h, setLast24h] = useState();
    const [days, setDays] = useState(1);


    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    useEffect(() => {
        const fetchData = async () => {
            const currencyData = await cryptoService.loadCurrency(props.match.params.id);
            const priceData = await cryptoService.loadCurrencyVsSupported(props.match.params.id, 'USD');
            setCurrency(currencyData);
            setPrice(priceData);
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const data = await cryptoService.rateLast24h(props.match.params.id, days)
            setLast24h(data);
        }
        fetchData();
    }, [days])

    const handleHistoryDays = () => {
        setDays(daysRef.current.value);
    }

    if (!currency.name) return <div className="loading"><p>Loading...</p><img src={loading} /></div>
    else return (
        <div className="det">
            <div className="currency-details-main">
                {currency.name && price && coin && last24h &&
                    <div className="details-container">


                        <div className="currency-name">
                            <div className="title">
                                <img src={currency.image.small}></img>
                                <h1>{currency.name}</h1>
                            </div>
                            <div className="badges">
                                <Badge name={"Rank #" + currency.market_cap_rank} bgc={'#7A7A7A'} color={'#fff'} />
                                <Badge name={currency.symbol.toUpperCase()} bgc={'#DCDCDC'} color={'#606060'} />
                                <Badge name={currency.categories[0]} bgc={'#DCDCDC'} color={'#606060'} />
                            </div>
                        </div>


                        <div className="currency-price">
                            <p className="text-sm">{coin} price ({currency.symbol.toUpperCase()})</p>

                            <div className="price">
                                <h1>{formatter.format(price[coin].usd)}</h1>
                                <h3 style={{ background: price[coin].usd_24h_change < 0 ? '#FF4343' : '#00BD1F' }}>
                                    {price[coin].usd_24h_change.toFixed(2)}%</h3>
                            </div>

                            <div className="diff">
                                <p className="text-sm-2">{currency.tickers[0].converted_last.btc} BTC</p>
                                <p className="text-sm-2">{currency.tickers[0].converted_last.eth} ETH</p>
                            </div>

                            <div className="high-low">
                                <p>Low: <span>{formatter.format(last24h.low.toFixed(2))}</span></p>
                                <p>High: <span>{formatter.format(last24h.high.toFixed(2))}</span></p>
                                <select name="days" onChange={handleHistoryDays} ref={daysRef}>
                                    <option className="option" value="1">24h</option>
                                    <option className="option" value="30">1m</option>
                                    <option className="option" value="365">1y</option>
                                </select>
                            </div>

                        </div>
                        <Dropdown {...props} />
                    </div>
                }
                <div className="info">
                    <Menus {...props} currency={currency} />
                    <MarketCap {...props} />
                </div>
            </div>
            <RoutesBar {...props} />
            <Switch>
                <Route path="/currency/:id/historical-data" component={HistoricalData}></Route>
                <Route path="/currency/:id/description" render={props => <Description {...props} />}></Route>
                <Route path="/currency/:id/links" render={props => <Links {...props} />}></Route>
                <Route path="/currency/:id/trade" render={props => <Trade {...props} />}></Route>
                <Route path="/currency/:id" render={props => <Graphs {...props} priceData={price} currencyData={currency}/>}></Route>
            </Switch>
        </div>
    )
}
