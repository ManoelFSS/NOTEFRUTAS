import styled from "styled-components";

export const Input = styled.input`
    height: 35px;
    width: 100%;
    background-color: var( --color-bg-input );
    padding-left: 10px;
    border-radius: 5px;
    border: none;
    color: var( --color-text-primary );
    box-shadow: inset 1px 2px 5px rgba(0, 0, 0, 0.47);
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    outline: none;
    trasition: background-color 0.3s ease;

    &:focus ~ .info-balloon {
        display: flex;
    }

    &:hover {
        background-color: var( --color-bg-input-hover );
    }

    @media (min-width: 1920px) {
        font-size: 2vh;
        padding: 1vh;
        height: 5vh;
    }
    
`
export const Container = styled.div`
    width: 100%;
    position: relative;
    
    .icon {
        position: absolute;
        top: 9px;
        right: 10px;
        cursor: pointer;
        trasition: color 0.3s ease;
        font-size: 1.2rem;

        @media (min-width: 1920px) {
            top: 1.4vh;
            right: 1.4vh;
            font-size: 2.5vh;
        }

        &:hover {
            color: var( --color-icon-hover );
        }
    }

    .icon-info {
        position: absolute;
        top: -22px;
        left: 60px;
        cursor: pointer;
        trasition: color 0.3s ease;
        font-size: 1.2rem;
        color: var( --color-icon-hover );
        border-radius: 50%;

        &:hover {
            color: #000;
        }

        @media (min-width: 1920px) {
            top: -2vh;
            left: 6vh;
            font-size: 2.5vh;
        }
    }

    .info-balloon {
        display: none;
        width: 280px;
        flex-direction: column;
        position: absolute;
        bottom: 68px;
        left: 0px;
        cursor: pointer;
        trasition: color 0.5s ease;
        color: #000;
        background-color:rgb(255, 255, 255);
        border-radius: 6px;
        padding: 20px 20px;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.38);

        h4 {
            text-align: center;
            color: var( --color-icon-hover );
            padding-bottom: 5px;
            font-size: 1rem;
            font-weight: 900;
        }

        span {
            display: flex;
            align-items: center;
            height: 20px;
            width: 100%;
            gap: 10px;
            font-weight: 600;
            font-size: 0.7rem;
            color: #000;
            word-spacing: 4px;
            text-transform: capitalize;

            .check-required {
                color:  rgb(0, 0, 0);
                background-color: rgb(0, 255, 68);
                font-weight: 900;
                font-size: 0.9rem;
                border-radius: 50%;
                padding: 2px;
            }

            @media (min-width: 1920px) {
                font-size: 1.5vh;
            }
        }

        &::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 25%;
            margin-left: -10px;
            border-width: 10px;
            border-style: solid;
            border-color: rgb(255, 255, 255) transparent transparent transparent;
        }


        @media (min-width: 1920px) {
            top: -2vh;
            left: 6vh;
            font-size: 2.5vh;
        }

    }  

    .icon-info:hover + .info-balloon {
        display: flex;
    }
`