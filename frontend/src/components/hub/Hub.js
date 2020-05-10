import React from 'react'
import { Map } from '../map/Map';
import SearchBar from '../search/SearchBar';

import './Hub.css';


export default function Hub() {
    return (
        <div className="hub">
            <div className="hub-posts">

            </div>
            <div>
                <SearchBar />
                <Map />
            </div>
        </div>
    )
}
