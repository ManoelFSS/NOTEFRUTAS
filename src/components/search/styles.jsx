import styled from "styled-components";

export const Container_search = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 200px;
    height: 35px;
    padding-right: 3px;
    box-shadow: inset 1px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    cursor: pointer;
    background-color:rgb(255, 255, 255);
    border: 1px solid #ccc;

    @media (max-width: 610px) {
        min-width: 120px;
    }

    input {
        border: none;
        outline: none;
        width: 100%;
        height: 100%;
        font-size: 1rem;
        cursor: pointer;
        padding: 0 10px;
        color: #000;
        box-shadow: inset 1px 2px 4px rgba(0, 0, 0, 0.24);
        border-radius: 4px;
        background-color:rgb(255, 255, 255);
    }

    input::placeholder {
        color: #000;
    }

    .icon {
        width: 20px;
        height: 20px;
        cursor: pointer;
        color: #000;
        box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.24);
        border-radius: 5px;
        background-color:rgb(255, 255, 255);
        padding: 4px 5px;
        transform: scale(0.9);

        &:hover {
            color: #FF9D00;
        }
    }
    
`