import React from 'react'
import './Title.css'

interface Props {
  pokemonName: string;
}

const Title = ({ pokemonName }: Props) => {
  return (
    <div id='title'>
      <h1>
        {pokemonName}
      </h1>
    </div>
  )
}

export default Title