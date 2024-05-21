import React from 'react'
import "./Logo.css"
import logo from "./logo.png"

interface Props {

}

const Logo = (props: Props) => {
  return (
    <div id="logo">
      <img src={logo} alt={"pokeball-logo"} />
    </div>
  )
}

export default Logo