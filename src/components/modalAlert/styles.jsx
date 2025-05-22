import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 250px;
    height: calc(100svh - 45px);
    gap: 10px;
    position: fixed;
    bottom: 0;
    transition: right 0.3s  ease;
    right: ${props => props.$showModalAlert ? "0" : "-250px" };
    background-color:rgba(0, 0, 0, 0.45);
    box-shadow: -1px 0px 5px rgb(0, 0, 0);
    z-index: 5;
    padding: 20px 10px;

    .box-alert {
        overflow: auto;
        padding: 5px 5px 10px 10px ;

        &::-webkit-scrollbar {
            width: 4px;
        }
        
        &::-webkit-scrollbar-track {
            background:rgba(241, 241, 241, 0);
        }
        
        &::-webkit-scrollbar-thumb {
            background: #FF9D00;
        }
    }

    h3 {
        width: 94%;
        font-size: 1rem;
        font-weight: 700;
        color: var( --color-text-secondary );
        background-color: #FF9D00;
        padding: 10px 20px;
        border-radius: 6px;
        text-align: center;
    }

    .alert {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        gap: 10px;
        padding: 10px;
        background-color:rgb(255, 255, 255);
        border-radius: 5px;
        box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.5);
        margin-bottom: 10px;
        
        p {
            font-size: 0.7rem;
            font-weight: 500;
        }
        
        span {
            font-size: 0.7rem;
            font-weight: 700;
            color: var( --color-text-primary );
            width: 100%;
            text-align: right;
        }
    }

`
