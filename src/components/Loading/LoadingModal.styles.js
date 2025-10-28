import styled, { css, keyframes } from 'styled-components'
import { ContainerTitle, Section, SectionTitle } from '../../styles/GlobalStyled'

export const LoaderOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;

    ${({ $isLoading }) =>
        !$isLoading &&
        css`
            display: none;
        `}
`

export const LoadingContainer = styled(Section)`
    display: ${({ $isLoading }) => ($isLoading ? 'flex' : 'none')};
    flex-direction: column;
    align-items: center;
    /* border: 2px solid #000; */
`

const spinnerFrames = keyframes`
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    `
export const LoadingTitle = styled(SectionTitle)``

export const LoadingSpinner = styled.div`
    width: 48px;
    height: 48px;
    border: 4px solid #e0e0e0;
    border-top: 4px solid #4a6cf7;
    border-radius: 50%;
    animation: ${spinnerFrames} 1s linear infinite;
`

export const LoadingMessage = styled(SectionTitle)`
    margin: 0;
    margin-top: 32px;
`
