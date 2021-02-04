

import React from 'react';
import './Subscribe.scss';
import img from '../../assets/btcpic.png';

export default function Subscribe() {
    return (
        <div className="subscribe">
            <div className="inner">


                <div className="txt">
                    <p>Stay updated about all the <span>Crypto news!</span></p>
                    <h4>Get crypto news, analysis, new Blockchain technologies straight to your inbox! Sign up and don't miss a single event.</h4>
                    <div className="sub">
                        <input type="text" placeholder="Enter your email adress" />
                        <button>Subscribe Now</button>
                    </div>
                </div>

                <div>
                    <img src={img} alt="" />
                </div>


            </div>
        </div>
    )
}
