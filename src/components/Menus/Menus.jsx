

import React, { useRef, useState } from 'react';
import './Menus.scss';
import { LinkIcon, LinkExternalIcon, SearchIcon, ChevronDownIcon, CodeIcon, FileIcon, PersonIcon } from '@primer/octicons-react';
import { useEffect } from 'react';

export default function Menus({ currency }) {
    const globalRef = useRef();
    var [toggleLink, setToggleLinks] = useState(false);
    var [toggleCommunity, setToggleCommunity] = useState(false);

    useEffect(() => {
        document.addEventListener("mousedown", onOutSideClick);
    }, [])

    const toggleLinks = () => {
        setToggleLinks(toggleLink = !toggleLink);
        setToggleCommunity(false)
    }
    const toggleCommunitys = () => {
        setToggleCommunity(toggleCommunity = !toggleCommunity);
        setToggleLinks(false)
    }

    const onOutSideClick = (ev) => {
        if (globalRef.current && !globalRef.current.contains(ev.target)) {
            setToggleCommunity(false);
            setToggleLinks(false);
        }
    }

    return (
        <div className="menus" ref={globalRef}>

            {currency &&
                <div className="inner">
                    <div className="link">
                        <a href={currency.links.homepage[0]}>
                            <LinkIcon size={16} className="icon" />
                            <p>www.{currency.id}.org</p>
                            <LinkExternalIcon className="icon" size={16} />
                        </a>
                    </div>
                    <div className="link exp" onClick={toggleLinks}>
                        <p><SearchIcon size={16} className="icon" /> Explorers <ChevronDownIcon size={16} className="icon" /></p>
                        {toggleLink &&
                            <div className="links-menu">
                                {currency.links.blockchain_site.map((site, idx) => {
                                    return (<div key={idx} className="site">
                                        {site !== "" ? <a href={site}>{site}</a> : null}</div>)
                                })}
                            </div>}
                    </div>
                    <div className="link exp" onClick={toggleCommunitys}>
                        <p><PersonIcon size={16} className="icon" /> Community <ChevronDownIcon size={16} className="icon" /></p>
                        {toggleCommunity &&
                            <div className="links-menu">
                                <a className="site" href={`https://www.reddit.com/r/${currency.name}/`}>www.reddit.com</a>
                                <a className="site" href={`https://bitcointalk.org/`}>www.bitcointalk.org</a>
                            </div>}
                    </div>

                    <div className="link source">
                        <a href={`https://github.com/${currency.name}/`}>
                            <CodeIcon size={16} className="icon" />
                            <p>Source Code</p>
                            <LinkExternalIcon className="icon" size={16} />
                        </a>
                    </div>

                    <div className="link source">
                        <a href={`https://www.allcryptowhitepapers.com/${currency.name}-whitepaper/`}>
                            <FileIcon size={16} className="icon" />
                            <p>Whitepaper</p>
                            <LinkExternalIcon className="icon" size={16} />
                        </a>
                    </div>


                </div>
            }



        </div>
    )
}

// https://github.com/bitcoin/
// <Badge name={ <LinkIcon size={16} /> + currency.links.homepage[0]} bgc={'#DCDCDC'} color={'#606060'}/>