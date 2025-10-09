import { useLocation } from 'react-router-dom'
import { Container, ContainerGroup, Section, SectionTitle, Wrapper } from '../../../styles/GlobalStyled'
import { ModalWrapper } from '../../Auth/AuthModal.styles'

function ConfirmExit() {
    return (
        <ModalWrapper>
            <Section>
                <SectionTitle>Подтверждение выхода</SectionTitle>
                <ContainerGroup>
                    <button>Да</button>
                    <button>Нет</button>
                </ContainerGroup>
            </Section>
        </ModalWrapper>
    )
}

export default ConfirmExit
