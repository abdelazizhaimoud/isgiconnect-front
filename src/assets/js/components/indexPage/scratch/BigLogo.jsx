import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


function BigLogo() {
  const Img = styled.img`
    height: 100%;
    width: 100%;
  `
  const Div = styled.div`
    height: 150px;
    width: 220px;
    /* border: solid; */
  `
  return (
    <Link to='/accueil'>
      <Div>
        <Img src='/images/Logo.svg'></Img>
      </Div>
    </Link>
    
  )
}

export default BigLogo
