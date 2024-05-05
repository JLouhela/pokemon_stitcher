import React, { ChangeEvent, FormEvent } from 'react'
import { IoIosSearch } from "react-icons/io";
import './Search.css'

interface Props {
    onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSearchSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const Search = ({ onSearchChange, onSearchSubmit }: Props) => {
    return (
        <div id='search'>
            <form onSubmit={onSearchSubmit}>
                <input type='text' placeholder='Search' onChange={onSearchChange} />
                <button type='submit'><IoIosSearch /></button>
            </form>
        </div>
    )
}

export default Search