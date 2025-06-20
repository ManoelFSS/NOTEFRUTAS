import styled from "styled-components";

export const Container = styled.div`
    min-width: 350px;
    padding: 20px 20px 30px 20px;
    background-color: rgba(255, 255, 255, 0.69);
    box-shadow: 1px 2px 7px rgba(0, 0, 0, 0.6);
    border-radius: 6px;
    position: relative;
    margin: auto;

    @media (max-width: 340px) {
        min-width: 250px;
    }
    @media (max-width: 330px) {
        min-width: 250px;
        transform: scale(0.9);
    }

    .image {
        display: flex;
        flex-direction: column;

        img {
            width: 150px;
            height: 150px;
            border-radius: 6px;
        }
    }

    .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0px;

        .icon {
            width: 30px;
            height: 30px;
            position: absolute;
            top: 15px;
            left: 20px;
        }
    }

    .box {
        display: flex;
        flex-direction: column;
        padding: 2px 0;

        @media (min-width: 1920px) {
            gap: 0.5vh;
            padding: 0.4vh 0;
        }
    }

    .box-check {
        display: flex;
        align-items: center;

        .checkd {
            width: 20px;
            height: 20px;
            border: none;
            box-shadow: none;      
            
            @media (min-width: 1920px) {
                width: 4vh;
                height: 4vh;
            }
        }

        .text-check {
            display: flex;
            width: 100%;
            flex-direction: column;
            gap: 5px;
            align-items: center;
            justify-content: center;
            padding: 10px 3px;
            
            span {
                width: 245px;
                font-weight: 800;
                font-size: 0.9rem;
                text-align: center;
                
                @media (min-width: 1920px) {
                    font-size: 2vh;
                    width: 360px;
                }
            }
        }

    }

    .forgot-password {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30px;
        gap: 10px;
        color: var(--color-text-primary);
        font-weight: 600;
        cursor: pointer;
        font-size: 1rem;
        trasition: color 0.3s ease;
        border-radius: 4px;
        margin-top: 8px;
        padding: 0 5px;

        .icon {
            color: var( --color-primary );
            font-size: 1.2rem;
        }

        &:hover {
            color: var( --color-text-hover );
            text-decoration: underline;
        }

        @media (min-width: 1920px) {
            font-size: 1.8vh;
            padding: 1vh 0 0;
        }
    }

    .text {
        width: 280px;
        text-align: center;
        font-size: 1rem;
        font-weight: 700;

        &:hover {
            text-decoration:none;
            cursor: default;
            color: var( --color-text-primary );
        }

        @media (min-width: 1920px) {
            font-size: 1.8vh;
            width: 100%;
        }
    }

    .btns {
        display: flex;
        flex-direction: column;
        padding-top: 1.5vh;
        gap: 10px;

        @media (min-width: 1920px) {
            gap: 1.8vh;
        }
    }

    @media (min-width: 500px) and (max-width: 768px) {
        width: 250px;
    }

    @media (min-width: 1920px) {
        width: 40vh;
        padding: 4vh 3vh 5vh 3vh;
    }

`;