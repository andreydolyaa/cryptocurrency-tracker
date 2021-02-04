

import React, { useRef } from 'react';
import './DisplayNum.scss';

export default function DisplayNum(props) {
    const numRef = useRef();

    const handleNumOfCurrencies = () => {
        props.numOfCurrencies(numRef.current.value);
    }

    return (
        <div className="display-num">
            <p>Display Currencies: </p>
            <select name="numOfCurrencies" onChange={handleNumOfCurrencies} ref={numRef}>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </div>
    )
}
