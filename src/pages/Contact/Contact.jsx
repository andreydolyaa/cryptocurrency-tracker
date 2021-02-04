

import React from 'react';
import './Contact.scss';
import linkedin from '../../assets/linkedin.png';
import github from '../../assets/github.png';
import gmail from '../../assets/gmail.png';

export default function Contact() {
    return (
        <div className="contact">
            <div className="inner">
                <div>
                    <img src={linkedin} />
                    <h1><a href="https://www.linkedin.com/in/andrey-dolya-250130203/">Linkedin</a></h1>
                </div>
                <div>
                    <img src={github} />
                    <h1><a href="https://github.com/andreydolyaa?tab=repositories">Github</a></h1>
                </div>
                <div>
                    <img src={gmail} />
                    <h1><a href="https://mail.google.com/mail/?view=cm&fs=1&to=dolya7kk@gmail.com&su=Hi Andrey!~">Gmail</a></h1>
                </div>
            </div>
        </div>
    )
}
