import { useAppContext } from '../../contexts/AppContext'
import { LoaderOverlay, LoadingContainer, LoadingPoint, LoadingTitle, StyleLetter, StylePoints } from './LoadingModal.styles'

function LoadingModal() {
    const { isLoading, loadingMessage } = useAppContext()

    const getAnimatedPoints = (text) => {
        return text.split('').map((char, index) => (
            <StylePoints
                key={index}
                style={{ '--delay': `${index * 0.1}s`, margin: ' 0 5px' }} // задержка для каждой буквы
            >
                {char}
            </StylePoints>
        ))
    }

    const getAnimatedLetters = (text) => {
        const characters = Array.from(text) // разбиваем строку на символы, учитывая любые символы
        return characters.map((char, index) => {
            if (char === ' ') {
                // Обработка пробела
                return (
                    <span
                        key={index}
                        style={{
                            display: 'inline-block',
                            width: '0.5em', // или другой размер, чтобы пробел был заметен
                            margin: '0 2px', // немного пространства
                            visibility: 'visible',
                        }}
                    >
                        {' '}
                    </span>
                )
            } else {
                // Обработка буквы
                return (
                    <StyleLetter key={index} style={{ '--delay': `${index * 0.1}s` }}>
                        {char}
                    </StyleLetter>
                )
            }
        })
    }

    return (
        <LoaderOverlay $isLoading={isLoading}>
            <LoadingContainer $isLoading={isLoading}>
                <LoadingTitle style={{ margin: '0' }}>{getAnimatedLetters(loadingMessage)}</LoadingTitle>
                <LoadingPoint>{getAnimatedPoints('...')}</LoadingPoint>
            </LoadingContainer>
        </LoaderOverlay>
    )
}

export default LoadingModal
