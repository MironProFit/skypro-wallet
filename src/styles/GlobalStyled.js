import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { accentColor, primaryColor, secondaryColor } from './Mexins.style'

export const Wrapper = styled.div`
    max-width: 100%;
    width: 100vw;
    min-height: 100vh;
    overflow: hidden;
    background-color: ${secondaryColor};
`

export const Container = styled.div`
    max-width: 1260px;
    width: 100%;
    margin: 0 auto;
    padding: 0 30px;

    overflow: hidden;
    border-radius: 30px;
    /* background: ${primaryColor}; */
    /* box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13); */
`
export const ContainerGroup = styled.div`
    display: flex;
    flex-direction: row;
    gap: 34px;
    & > * {
        flex: 1;
    }
`

export const PageTitle = styled.h1`
    width: 269px;
    height: 48px;
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 48px;
    white-space: nowrap;
    margin-top: 36px;
    margin-bottom: 32px;
`

export const Section = styled.section`
    overflow: hidden;
    border-radius: 30px;
    background: #ffffff;
    box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
    padding: 32px;
`

export const SectionTitle = styled.h2`
    width: 217px;
    height: 30px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 29px;
    white-space: nowrap;
    text-align: center;
    align-items: center;
    margin-bottom: 32px;
`

export const StyledLink = styled(Link)``

export const ButtonNavLink = styled.button``

export const PrimaryButton = styled.button`
    background-color: ${accentColor};
    width: 100%;
    height: 39px;
    box-sizing: border-box;
    border: 1px solid ${accentColor};
    border-radius: 6px;
    color: #ffffff;
    & disabled {
        color: red;
    }
`
