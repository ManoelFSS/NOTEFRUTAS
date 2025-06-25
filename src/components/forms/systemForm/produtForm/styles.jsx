import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 99999;
    animation-name: faid;
    animation-duration: 0.4s;
    padding: 20px 5px;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 5px;
    }
    
    &::-webkit-scrollbar-track {
        background:rgba(241, 241, 241, 0);
    }
    
    &::-webkit-scrollbar-thumb {
        background: #FF9D00;
    }

    @keyframes faid {
        from {opacity: 0}
        to { opacity: 1}
    }

    .form-area {
        position: relative;
        margin: auto;
        animation-name: animatop;
        animation-duration: 0.4s;

        .tipo-venda-area {
            display: flex;
            height: 35px;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            border-radius: 5px;
            padding: 5px 10px;
            box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.29);

            .tipo-venda {
                display: flex;
                gap: 4px;
                padding: 2px 0px;

                input {
                    cursor: pointer;
                }

                label {
                    font-size: 0.8rem;
                    font-weight: 500;
                }
            }
        }

        .peso-medio {
            .peso {
                display: flex;
                align-items: center;
            }

            input {
                height: 35px;
                width: 80px;
                padding: 0 10px;
                border-radius: 5px;
                border: none;
                outline: none;
                box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.26);
                font-size: 1rem;
                font-weight: 500;
                transition: background-color 0.3s ease;
            }

            span {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 35px;
                border-radius: 0 5px 5px 0;
                background-color:rgb(126, 126, 126);
                outline: none;
                color: #fff;
                width: 40px;
            }
        }
    }

    @keyframes animatop {
        from {top: -50px; opacity: 0}
        to { top: 0; opacity: 1}
    }

    .close {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;

        .close-icon {
            font-size: 1.2rem;
            color: var( --color-bord-btn-primary );
            cursor: pointer;

            &:hover {
                color: var(  --color-bg-btn-hover );
            }
        }
    }

    .select {
        aparence: none;
        background-color: var( --color-bg-input );
        width: 100%;
        height: 35px;
        border-radius: 5px;
        border: none;
        color: var( --color-text-primary );
        box-shadow: inset 1px 2px 5px rgba(0, 0, 0, 0.47);
        cursor: pointer;
        font-size: 1rem;
        font-weight: 500;
        outline: none;
        padding: 0 10px;
        transition: background-color 0.3s ease;
    }
`