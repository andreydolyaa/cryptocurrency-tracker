

import React from 'react';
import './Graphs.scss';
import Charts from './../../components/Chart/Charts';
import Sidebar from '../../components/Sidebar/Sidebar';
import loading from '../../assets/icons/loading.gif';

export default function Graphs(props) {

    if (!props.currencyData) return <div className="loading"><p>Loading...</p><img src={loading} /></div>
    else return (
        <div className="graphs">
            <Charts {...props} />
            <Sidebar currencyData={props.currencyData} priceData={props.priceData} {...props}/>
        </div>
    )
}


// <Chart {...props} />