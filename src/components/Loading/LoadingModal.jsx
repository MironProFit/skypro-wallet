import { useAppContext } from '../../contexts/AppContext'
import { LoaderOverlay, LoadingContainer, LoadingMessage, LoadingPoint, LoadingTitle, StyleLetter, StylePoints } from './LoadingModal.styles'

function LoadingModal() {
    const { isLoading, setIsLoading, loadingMessage, setLoadingMessage } = useAppContext()

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
    // const getAnimatedLetters = (text) => {
    //     return text.split('').map((char, index) => (
    //         <StyleLetter
    //             key={index}
    //             style={{ '--delay': `${index * 0.1}s` }} // задержка для каждой буквы
    //         >
    //             {char}
    //         </StyleLetter>
    //     ))
    // }

    // const getAnimatedLetters = (text) => {
    //     // Разбиваем текст на массив, где каждое слово или пробел — отдельный элемент
    //     const parts = text.split(/(\s+)/) // захватываем пробелы как отдельные элементы
    //     const animatedPoints = parts.map((part, index) => {
    //         if (/\s+/.test(part)) {
    //             // Это пробелы, возвращаем их как есть или отдельный элемент
    //             return (
    //                 <span key={index} style={{ margin: '0 5px' }}>
    //                     {' '}
    //                 </span>
    //             )
    //         } else {
    //             // Это слово, разбираем по буквам
    //             return part.split('').map((char, i) => (
    //                 <StyleLetter key={`${index}-${i}`} style={{ '--delay': `${(index + i) * 0.1}s` }}>
    //                     {char}
    //                 </StyleLetter>
    //             ))
    //         }
    //     })
    //     return animatedPoints
    // }

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
