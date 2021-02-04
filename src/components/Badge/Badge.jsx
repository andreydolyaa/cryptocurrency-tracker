

import React from 'react';
import './Badge.scss';
import { useEffect } from 'react';

export default function Badge(props) {
    return (
        <div className="badge" style={{background:props.bgc}}>
            <p style={{color:props.color}}>{props.name}</p>
        </div>
    )
}
