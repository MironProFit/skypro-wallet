import { useAppContext } from '../../contexts/AppContext'
import { LoaderOverlay, LoadingContainer, LoadingMessage, LoadingSpinner, LoadingTitle } from './LoadingModal.styles'

function LoadingModal() {
    const { isLoading, setIsLoading, loadingMessage, setLoadingMessage } = useAppContext()

    return (
        <LoaderOverlay $isLoading={isLoading}>
            <LoadingContainer $isLoading={isLoading}>
                <LoadingTitle>Загрузка {loadingMessage}...</LoadingTitle>
                <LoadingSpinner></LoadingSpinner>
            </LoadingContainer>
        </LoaderOverlay>
    )
}

export default LoadingModal
