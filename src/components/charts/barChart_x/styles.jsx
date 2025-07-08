import styled from "styled-components";

export const Container_bar_x = styled.div`
    width: 100%;

    h3 {
        font-size: 0.7rem;
        font-weight: 700;
        color: var( --color-text-primary );
    }

    .bar-area {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        position: relative;
        cursor: pointer;

        .bar {
            width:140px;
            height: 5px;
            background-color: var( --color-bg-secondary-element);
            border-radius: 5px;
            margin-right: 10px;
            cursor: pointer;
            

            .bar-fill {
                width: 140px;
                height: 100%;
                border-radius: 5px;
                background-color: #f2f2f2;
                transition: width 0.3s  ease;
                box-shadow: inset 1px 2px 5px rgba(0, 0, 0, 0.3);
                position: relative;
                
                
            }
        }

        .value {
            opacity: 0;
            font-size: 0.8rem;
            font-weight: 900;
            color: var( --color-text-primary );
            animation: animateValue 0.8s linear forwards;
            overflow: hidden;
            text-align: right;
        }

        @keyframes animateValue {
            0%, 30%{ 
                opacity: 0;
                width: 0;
            }
            100% {
                opacity: 1;
                width: 70px;
            }
        }

        .value-hover {
            display: none;
            position: absolute;
            background-color: var( --color-bg-secondary-element);
            padding: 8px 10px;
            border-radius: 5px;
            box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
            color: var( --color-text-secondary );
            font-size: 0.8rem;
            font-weight: 700;
            z-index: 3;
            top: -8px;
            left: 240px;
            transition: display 1s ease;
            animation: animatebefore 0.2s linear ;

            @keyframes animatebefore {
                0%{ 
                    opacity: 0;
                    top: -20px;
                }
                100% {
                    opacity: 1;
                    top: -8px;
                }
            }

            p {
                font-size: 0.8rem;
                font-weight: 700;
                color: var( --color-text-secondary );
                text-align: right;
                line-height: 1.1rem;

            }

            &::before {
                content: "";
                position: absolute;
                top: 50%;
                left: -10px;
                transform: translateY(-50%);
                border-top: 5px solid transparent;
                border-bottom: 5px solid transparent;
                border-right: 10px solid var( --color-bg-secondary-element);
                z-index: 3;     
                
                @media (max-width: 460px) {
                    left: -10px;
                }
            }

            @media (max-width: 460px) {
                top: -8px;
                left: 170px;
            }

            @media (max-width: 330px) {
                top: -8px;
                left: 140px;
            }
        }

        &:hover  .value-hover {
            display: flex;
        }
        
    }

`

export const BarActive = styled.div` 
    opacity: 0;
    height: 100%;
    border-radius: 5px;
    background-color: #FE7E01;
    position: absolute;
    z-index: 2;
    animation: animate 0.3s   linear forwards;
    animation-delay: ${props => props.$delay }s;

    @keyframes animate {
        0%, 10%{
            width: 0%;
        }
        100%{
            opacity: 1;
        }
    }

`