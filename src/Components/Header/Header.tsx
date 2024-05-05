import React, { ChangeEvent } from 'react'
import './Header.css'
import Search from '../Search/Search'
import Logo from '../Logo/Logo'
import Settings from '../Settings/Settings'

interface Props {
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Header = ({ onSearchChange }: Props) => {
  return (
    <div id='header'>
      <Logo />
      <Search onSearchChange={onSearchChange} />
      <Settings />
    </div>
  )
}

export default Header