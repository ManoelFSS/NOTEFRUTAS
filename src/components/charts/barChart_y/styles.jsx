// components/BarCard.styles.js
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 10px;
`;

export const Card = styled.div`
    flex: 1;
    background: white;
    padding: 0px 0px 0px 20px;
    position: relative;
    min-width: 40px;
    border: solid 1px #ccc;
`;

export const Label = styled.div`
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    font-weight: bold;
    white-space: nowrap;
    font-size: 0.7rem;
    position: absolute;
    bottom: 2px;
    left: 2px;
`;

export const BarWrapper = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
`;

export const Value = styled.div`
    font-weight: bold;
    font-size: 0.8rem;
    margin-bottom: 4px;
`;

export const Bar = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 100%;
    height: 80px;
    border-radius: 4px;
    background-color: #f2f2f2;
    box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.3);


    div {
        background-color: #000;
        height: 90%;
    }
`;
