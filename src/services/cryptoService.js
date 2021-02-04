
import axios from 'axios';
import { localStorageService } from './localStorageService';


export const cryptoService = {
    loadCurrencies,
    loadCurrency,
    loadCurrencyVsSupported,
    rateLast24h,
    getExchanges,
    historicalData,
    globalStats,
    loadWatchList,
    getCryptoNews,
    loadVsPrice
}



async function loadCurrency(name) {
    var newName = name.replace(/\s/g, "-")
    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${newName}`);
    return res.data;
}


async function loadCurrencyVsSupported(c, s) {
    var currency = c.replace(/\s/g, "-");
    var supported = s.replace(/\s/g, "-");
    var res = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${currency}&vs_currencies=${supported}&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`);
    return res.data;
}

async function loadVsPrice(name,to){
    var res = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${name}&vs_currencies=${to}`);
    return res.data;
}


async function rateLast24h(name, days) {
    var currency = name.replace(/\s/g, "-");

    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${currency}/market_chart?vs_currency=usd&days=${days}`);

    var sortedData = res.data.prices.map(el => el[1]);
    var result = { high: Math.max(...sortedData), low: Math.min(...sortedData) };
    return result;
}


async function getExchanges(num = 5) {
    const res = await axios.get(`https://api.coingecko.com/api/v3/exchanges?per_page=${num}`);
    return res.data;
}


async function historicalData(name, days) {
    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${name}/market_chart?vs_currency=usd&days=${days}`);
    return res.data;
}


async function globalStats() {
    var res = await axios.get('https://api.coingecko.com/api/v3/global');
    return res.data;
}


async function getCryptoNews() {
    var res = await axios.get(`https://data.messari.io/api/v1/news`);
    return res.data;
}

async function loadCurrencies(num = 20, search = '', sortPhrase = '', startSort = false) {
    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${num}&page=1&sparkline=true`);
    if (search !== '') {
        return res.data.filter(currency => currency.name.toLowerCase().includes(search) || currency.id.toLowerCase().includes(search.toLowerCase()))
    }
    else if (sortPhrase === 'name') {
        if (startSort) return res.data.sort((a, b) => a.name.localeCompare(b.name));
        else return res.data.sort((a, b) => b.name.localeCompare(a.name));
    }
    else if (sortPhrase === 'price') {
        if (startSort) return res.data.sort((a, b) => a.current_price - b.current_price);
        else return res.data.sort((a, b) => b.current_price - a.current_price);
    }
    else if (sortPhrase === '24h') {
        if (startSort) return res.data.sort((a, b) => a.price_change_24h - b.price_change_24h);
        else return res.data.sort((a, b) => b.price_change_24h - a.price_change_24h);
    }
    else if (sortPhrase === 'marketCap') {
        if (startSort) return res.data.sort((a, b) => a.market_cap - b.market_cap);
        else return res.data.sort((a, b) => b.market_cap - a.market_cap);
    }
    else if (sortPhrase === 'volume') {
        if (startSort) return res.data.sort((a, b) => a.total_volume - b.total_volume);
        else return res.data.sort((a, b) => b.total_volume - a.total_volume);
    }
    else return res.data;
}

async function loadWatchList() {
    var data = localStorageService.load('watchList');
    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true`);
    var watchlist = res.data.filter(currency => data.includes(currency.name));
    return watchlist;
}