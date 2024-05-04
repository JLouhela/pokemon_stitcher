import React from 'react'
import './Header.css'
import Search from '../Search/Search'
import Logo from '../Logo/Logo'
import Settings from '../Settings/Settings'

interface Props {

}

const Header = (props: Props) => {
  return (
    <div id='header'>
      <Logo />
      <Search />
      <Settings />
    </div>
  )
}

export default Header