import React, { ChangeEvent } from 'react'
import { IoIosSearch } from "react-icons/io";
import './Search.css'

interface Props {
    onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search = (props: Props) => {
    return (
        <div id='search'>
            <form action=''>
                <input type='text' placeholder='Search' onChange={props.onSearchChange} />
                <button><IoIosSearch /></button>
            </form>
        </div>
    )
}

export default Search