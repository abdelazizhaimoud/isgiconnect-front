import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

function Button({children}) {
    const Btn = styled(Link)`
        background-color: #50B5FF;
        transition: 0.3s;
        border: none;
        
        &:hover{
            background-color: #2AA3FB;
        }
        &:hover{
            background-color: #199af7;
        }
    `
  return (
    <Btn className='btn btn-primary float-right'>{children}</Btn>
  )
}

export default Button
