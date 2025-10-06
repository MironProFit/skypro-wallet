import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { accentColor, borderColor, primaryColor, secondaryColor, textColor } from './Mexins.style'

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
    border-radius: 30px;
`
export const ContainerGroup = styled.div`
    display: flex;
    flex-direction: row;
    gap: 34px;
    & > * {
        flex: 1;
    }
`

export const PageText = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    white-space: nowrap;
    text-align: center;
    align-items: center;
`

export const PageTitle = styled.h1`
    /* width: 269px;
    height: 48px; */
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
    flex: ${({ $flex }) => $flex};
`

export const SectionTitle = styled.h2`
    display: flex;
    /* height: 30px; */
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
    cursor: pointer;
    background-color: ${accentColor};
    width: 100%;
    height: 39px;
    box-sizing: border-box;
    border: 1px solid ${accentColor};
    border-radius: 6px;
    color: #ffffff;
    &:disabled {
        cursor: unset;
        background-color: ${borderColor};
        border: 1px solid ${borderColor};
    }
    &:active {
        background-color: ${accentColor};
        opacity: 0.8;
    }
`

//Form
export const FormWrapper = styled.div``
export const FormGroup = styled.div`
    /* margin-bottom: 24px; */
    display: flex;
    flex-direction: column;
`
export const FormLabel = styled.label`
    margin-bottom: 16px;
`
export const FormInput = styled.input`
    position: relative;
    color: ${textColor};
    max-width: 313px;
    height: 39px;
    padding: 12px;
    border-radius: 6px;
    background: ${primaryColor};
    border: 1px solid ${borderColor};
    transition: 0.3s;

    &:focus {
        outline: none;
        border: 1px solid ${accentColor};
    }

    &::placeholder {
        color: ${borderColor};
    }
    ${({ $before }) =>
        $before &&
        css`
            -moz-appearance: textfield; /* Firefox */
            &::-webkit-inner-spin-button,
            &::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        `}
`
export const FormBtn = styled.div``
