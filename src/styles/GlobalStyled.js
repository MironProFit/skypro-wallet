import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { primaryColor, secondaryColor } from './Mexins.style'

export const Wrapper = styled.div`
    max-width: 100%;
    width: 100vw;
    min-height: 100vh;
    overflow: hidden;
    background-color: ${secondaryColor};
`

export const Container = styled.div`
    /* position: relative; */
    /* width: 789px; */
    /* height: 618px; */
    overflow: hidden;
    border-radius: 30px;
    background: ${primaryColor};
    box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
`

export const Title = styled.h1`
    width: 269px;
    height: 48px;
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 48px;
    white-space: nowrap;
`

export const StyledLink = styled(Link)``

export const ButtonNavLink = styled.button``
