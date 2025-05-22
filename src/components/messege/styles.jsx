import styled from "styled-components";

export const Container_messege = styled.div`
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.59);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;

    .messege-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;    
        gap: 15px;
        min-width: 290px;
        max-width: 420px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 5px;
        padding: 20px 20px;
        box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
        background-color: rgb(255, 255, 255);

        h3 {
            width: 100%;
            font-size: 0.9rem;
            text-transform: uppercase;
            font-weight: 900;
            text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.4);
            color: #000;
            text-align: center;
        }

        p {
            width: 100%;
            font-size: 0.8rem;
            font-weight: 700;
            color:rgb(99, 99, 99);
            width: 100%;
            text-align: center;
            white-space: pre-line;
        }

        @media (max-width: 500px) {
            min-width: 90%;
            max-width: 90%;
        }
    }

    button {
        width: 50%;
    }
    
`