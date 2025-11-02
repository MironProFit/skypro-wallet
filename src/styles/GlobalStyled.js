import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { accentColor, accentColorHover, borderColor, primaryColor, textColor } from './Mexins.style'

export const Wrapper = styled.div`
    /* max-width: 100%; */
    width: 100vw;
    height: 100vh;
    overflow: auto;
    background-color: ${primaryColor};
    transition: 0.3s;
    display: flex;
    flex-direction: column;
`

export const Container = styled.div`
    display: flex;

    flex-direction: column;
    max-width: 1260px;
    width: 100%;
    margin: 0 auto;
    padding: 0 30px;
    border-radius: 30px;

    ${({ $isMobile }) =>
        $isMobile &&
        css`
            background-color: ${primaryColor};
            border-radius: 0;
            padding: 0 16px;
            height: calc(100% - 180px);

            /* padding-bottom: 10px; */
        `}
`
export const ContainerGroup = styled.div`
    display: flex;
    max-height: 100%;
    flex-direction: row;
    gap: 34px;
    & > * {
        flex: 1;
    }

    ${({ $isMobile }) =>
        $isMobile &&
        css`
            flex-direction: column;
        `}
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
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 48px;
    white-space: nowrap;
    margin-top: 36px;
    margin-bottom: 32px;
    order: none;

    ${({ $isMobile }) =>
        $isMobile &&
        css`
            font-size: 24px;
            padding: 0;
            margin-top: 24px;
            margin-bottom: 23px;
            padding-left: 27px;

            /* margin: 0; */
        `}
`

export const Section = styled.section`
    /* overflow: hidden; */
    border-radius: 30px;
    background: #ffffff;
    box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
    padding: 32px;
    flex: ${({ $flex }) => $flex};

    ${({ $isMobile }) =>
        $isMobile &&
        css`
            background: inherit;
            box-shadow: none;
            padding: 0;
            border-radius: 0;
        `};

    ${({ $isLoading }) =>
        $isLoading &&
        css`
            border-radius: 30px;
            background: #ffffff;
            box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
            padding: 32px;
        `};
`

export const SectionTitle = styled.h2`
    display: flex;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 29px;
    white-space: nowrap;
    text-align: center;
    align-items: center;
    margin-bottom: 32px;

    ${({ $isMobile }) =>
        $isMobile &&
        css`
            /* margin-left: 27px; */
            font-size: 20px;
        `}
`
export const ContainerTitle = styled.h3`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;

    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;

    ${({ $isMobile }) =>
        $isMobile &&
        css`
            font-size: 10px;
            line-height: 12px;
        `}
`

export const SectionSubTitle = styled.h4`
    display: flex;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    white-space: pre-wrap;
    text-align: center;
    align-items: center;
    text-overflow: ellipsis;
    color: ${borderColor};
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
    transition: 0.3s;

    &:active {
        background-color: ${accentColor};
        opacity: 0.8;
    }

    &:hover {
        background: ${accentColorHover};
        border: 1px solid ${accentColorHover};
        /* color: ${textColor}; */
    }

    &:disabled {
        cursor: unset;
        background-color: ${borderColor};
        border: 1px solid ${borderColor};
    }
`

//Form
export const FormWrapper = styled.form``
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
    ${({ $icon }) =>
        $icon &&
        css`
            &::-webkit-calendar-picker-indicator {
                filter: invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%);
            }
            &::-moz-calendar-picker-indicator {
                background-color: black;
            }
        `}
   
        ${({ $isMobile }) =>
        $isMobile &&
        css`
            max-width: none;
        `}
`
export const FormBtn = styled.div``

export const FlexContainer = styled.div`
    width: 100%;
    bottom: 0;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${primaryColor};
    padding: 24px 16px;
    box-shadow: 0px -20px 20px 20px #f5f2f287;
`
