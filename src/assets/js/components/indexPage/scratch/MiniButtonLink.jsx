import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import ButtonLink from './ButtonLink'

function MiniButtonLink() {
  
  const MiniButtonLink = styled(Link)`
    height: 40px;
    width: 70px;
  `
  return (
    <ButtonLink to={`/bb`} >click</ButtonLink>
  )
}

export default MiniButtonLink
