import React, { ChangeEvent, FormEvent } from 'react'
import './Header.css'
import Search from '../Search/Search'
import Logo from '../Logo/Logo'
import Settings from '../Settings/Settings'

interface Props {
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const Header = ({ onSearchChange, onSearchSubmit }: Props) => {
  return (
    <div id='header'>
      <Logo />
      <Search onSearchChange={onSearchChange} onSearchSubmit={onSearchSubmit} />
      <Settings />
    </div>
  )
}

export default Header