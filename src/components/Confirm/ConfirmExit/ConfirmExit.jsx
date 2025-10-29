import { useLocation, useNavigate } from 'react-router-dom'
import { Container, ContainerGroup, PrimaryButton, Section, SectionTitle, Wrapper } from '../../../styles/GlobalStyled'
import { ModalButtons, ModalContent, ModalOverlay } from '../../Auth/AuthModal.styles'
import { useAppContext } from '../../../contexts/AppContext'

function ConfirmExit({ onClose, onConfirm, $showConfirmExit }) {
    const { isMobile } = useAppContext()

    return (
        <ModalOverlay $isMobile={isMobile}>
            <ModalContent $showConfirmExit={$showConfirmExit}>
                <SectionTitle>Подтверждение выхода</SectionTitle>
                <ModalButtons>
                    <PrimaryButton onClick={onConfirm}>Да</PrimaryButton>
                    <PrimaryButton onClick={onClose}>Нет</PrimaryButton>
                </ModalButtons>
            </ModalContent>
        </ModalOverlay>
    )
}

export default ConfirmExit
