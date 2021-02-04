


import React, { useEffect } from 'react';
import './RoutesBar.scss';
import { Link, NavLink } from 'react-router-dom';

export default function RoutesBar(props) {
    return (
        <div className="routes-bar">
            <div className="internal">
                <nav>
                    <NavLink activeClassName='is-active' to={"/currency/" + props.match.params.id} exact={true}>Charts</NavLink>
                    <NavLink activeClassName='is-active' to={"/currency/" + props.match.params.id + "/trade"} exact={true}>Trade</NavLink>
                    <NavLink activeClassName='is-active' to={"/currency/" + props.match.params.id + "/historical-data"} exact={true}>Historical Data</NavLink>
                    <NavLink activeClassName='is-active' to={"/currency/" + props.match.params.id + "/description"} exact={true}>Description</NavLink>
                    <NavLink activeClassName='is-active' to={"/currency/" + props.match.params.id + "/links"} exact={true}>Links</NavLink>
                </nav>
            </div>
        </div>
    )
}
