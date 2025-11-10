import styled, { css, keyframes } from 'styled-components'
import { ContainerTitle, Section, SectionTitle } from '../../styles/GlobalStyled'
import { accentColor, secondaryColor, shadowColor, textColor } from '../../styles/Mexins.style'

export const LoaderOverlay = styled.div`
    transition: 0.3s;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #00000030;

    /* background-color: ${secondaryColor}; */

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
    border: 1px solid #00000026;
    box-shadow: -11px 3px 67px -12px rgb(1 1 1 / 59%);
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

export const LoadingPoint = styled.div`
    transform: scale(2);
    color: ${accentColor};
    padding-bottom: 10px;
`

export const LoadingMessage = styled(SectionTitle)`
    margin: 0;
    margin-top: 32px;
`
export const jumpPoints = keyframes`
  0%, 100% {
    transform: translateY(0) scale(3) ;
    
  }
  50% {
    transform: translateY(0px) ;
    color: ${shadowColor}
  }
`
export const jumpLetters = keyframes`
  0%{
    /* transform: translateY(0)  ; */
    color: ${textColor}
  }
  25% {
    /* transform: translateY(0px) ; */
    color: ${accentColor}
  }
  50% {
    /* transform: translateY(0px) ; */
    color: ${textColor}
  }
  75% {
    transform: translateY(0px) ;
    /* color: ${shadowColor} */
    color: ${accentColor}
  }
  100% {
    transform: translateY(0px) ;
    /* color: ${shadowColor} */
    color: ${shadowColor}
  }
`

export const StyleLetter = styled.div`
    display: inline-block;
    animation: ${jumpLetters} 8s infinite;
    animation-delay: var(--delay);

    /* gap: 50px; */
    /* Можно добавить свойство, чтобы анимация шла по очереди */
`
export const StylePoints = styled.div`
    display: inline-block;
    animation: ${jumpPoints} 1.2s infinite;
    animation-delay: var(--delay);

    /* gap: 50px; */
    /* Можно добавить свойство, чтобы анимация шла по очереди */
`
