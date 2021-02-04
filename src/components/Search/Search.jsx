

import React, { useRef } from 'react';
import './Search.scss';
import { SearchIcon } from '@primer/octicons-react';

export default function Search(props) {
    const searchRef = useRef();

    const handleSearch = (ev) => {
        ev.preventDefault();
        props.search(searchRef.current.value);
    }

    return (
        <form onChange={handleSearch}>
        <input type="text" placeholder="Search Currencies..." ref={searchRef} />
        <SearchIcon size={16} className="icon"/>
        </form>
    )
}
