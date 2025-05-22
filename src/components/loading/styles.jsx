import styled, { keyframes } from 'styled-components';

// Animação de aparecimento e desaparecimento (fade-in e fade-out)
const fade = keyframes`
    0%, 100% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
`;

// Container para alinhar as bolinhas em linha
export const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
    position: relative;
    top: 20px;
    padding: 0 0 5px;
`;

// Estilos das bolinhas com a animação de fade-in/fade-out
export const Dot = styled.div`
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    animation: ${fade} 1.4s linear infinite;
    animation-delay: ${(props) => props.$delay}; 

`;
