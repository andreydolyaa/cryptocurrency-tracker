

import React, { useState } from 'react';
import './News.scss';
import { useEffect } from 'react';
import { cryptoService } from '../../services/cryptoService';
import parse from 'html-react-parser';
import loading from '../../assets/icons/loading.gif';

export default function News() {
    const [news, setNews] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const newsData = await cryptoService.getCryptoNews();
            setNews(newsData.data);
            console.log(newsData.data);
        }
        fetchData();
    }, [])

    if (!news) return <div className="loading"><p>Loading...</p><img src={loading} /></div>
    else return (
        <div className="news">
            {news &&
                <div className="inner">
                    {news.map(n => {
                        return (
                            <div key={n.id} className="content">
                                <h1>{n.title}</h1>
                                <p className="author">By {n.author.name} Published {n.published_at.toLocaleString()}</p>
                                {n.content &&
                                    parse(`<p>${n.content}</p>`)
                                }
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}
