import { useEffect, useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import '../src/'
import AppHeader from "./components/AppHeader/AppHeader";
import StatsHeader from './components/StatsHeader/StatsHeader';
import CurrencyDetails from "./pages/CurrencyDetails/CurrencyDetails";
import HomePage from './pages/HomePage/HomePage';
import Scroll from './components/Scroll/Scroll';
import WatchList from "./pages/WatchList/WatchList";
import Exchanges from './pages/Exchanges/Exchanges';
import About from './pages/About/About';
import News from './pages/News/News';
import Calculator from './components/Calculator/Calculator';
import AppFooter from "./components/AppFooter/AppFooter";
import Contact from './pages/Contact/Contact';
import MobileNav from "./components/MobileNav/MobileNav";

function App() {
    const [searchData, setSearch] = useState();
    var [mobile, setMobile] = useState(false);


    const search = (data) => {
        setSearch(data);
    }

    const toggleMobileMenu = () => {
        setMobile(mobile = !mobile)
    }

    return (
        <div >
            <Router>
                <div className="stat-header">
                    <StatsHeader />
                </div>
                <AppHeader search={search} mobileMenu={toggleMobileMenu} />
                {mobile && <MobileNav mobileMenu={toggleMobileMenu} />}
                
                <Switch>
                    <Route path="/currency/:id" render={props => <CurrencyDetails {...props} />}></Route>
                    <Route path="/watch-list" render={props => <WatchList {...props} />}></Route>
                    <Route path="/exchanges" render={props => <Exchanges {...props} />}></Route>
                    <Route path="/calculator" render={props => <Calculator {...props} />}></Route>
                    <Route path="/about" render={props => <About {...props} />}></Route>
                    <Route path="/news" render={props => <News {...props} />}></Route>
                    <Route path="/contact" render={props => <Contact {...props} />}></Route>
                    <Route exact path="/" render={props => <HomePage {...props} searchData={searchData} search={search} />}></Route>
                </Switch>
                <AppFooter />
            </Router>
        </div>
    );
}
// <Scroll />
export default App;
