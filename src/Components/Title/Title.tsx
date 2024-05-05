import React from 'react'
import './Title.css'

interface Props {
  pokemon_name: string;
}

const Title = ({ pokemon_name }: Props) => {
  return (
    <div id='title'>
      <h1>
        {pokemon_name}
      </h1>
    </div>
  )
}

export default Title