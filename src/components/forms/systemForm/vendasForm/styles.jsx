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
    z-index: 9999;
    animation-name: faid;
    animation-duration: 0.4s;
    overflow-y: auto;

    @media (max-width: 450px) {
        padding: 20px 0px;
    }

    @keyframes faid {
        from {opacity: 0}
        to { opacity: 1}
    }

    .form-area {
        display: flex;
        justify-content: center;
        position: relative;
        margin: auto;
        animation-name: animatop;
        animation-duration: 0.4s;

        .payment-area {
            display: flex;
            flex-direction: column;
            gap: 5px;
            width: 100%;
            padding-top: 10px;

            h6 {
                
            }

            .radio-area {
                display: flex;
                gap: 36px;
            }

            .tipo-cobranca {
                gap: 10px;
            }

            div {
                display: flex;
                align-items: center;
                gap: 5px;
            }

            input {
                width: 10px;
                height: 10px;
            }

            label {
                font-size: 0.7rem;
                font-weight: 500;
                cursor: pointer;
            }
        }

        .inputs-area {
            display: flex;
            justify-content: space-between;
            gap: 60px;
            padding-top: 5px;
            padding-right: 20px;

            h6 {
                font-size: 0.7rem;
                font-weight: 500;
                padding: 4px 0;
            }

            input {
                height: 30px;
                width: 145px;
                padding: 0 5px;
                font-weight: 700;
                outline: none;
                box-shadow: inset 1px 2px 5px rgba(0, 0, 0, 0.29);
                border: none;
                border-radius: 5px;
            }

            p {
                text-align: center;
                font-size: 0.8rem;
                font-weight: 500;
            }
        }

        .date {
            display: flex;
            justify-content: space-between;
            gap: 46px;
            padding-top: 10px;
            padding-right: 10px;

            .date-area,  .Pacelament-area {
                display: flex;
                flex-direction: column;
                gap: 10px;

                label {
                    font-size: 0.8rem;
                    font-weight: 500;
                }

                input {
                    height: 30px;
                    width: 145px;
                    padding: 0 5px;
                    box-shadow: inset 1px 2px 5px rgba(0, 0, 0, 0.29);
                    border: none;
                    border-radius: 5px;
                }
            }

            .Pacelament-area {
                align-items: center;

                div {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 5px;

                    input {
                        width: 40px;
                        height: 30px;
                    }

                    p {
                        font-size: 0.8rem;
                        font-weight: 700;
                        color: rgb(255, 0, 0);
                    }
                }
                
            }
        }

        .modal-product {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: absolute;
            width: 95%;
            height: 97%;
            top: 10px;
            background-color:rgb(255, 255, 255);
            border-radius: 10px;
            

            .search-area {
                width: 100%;
                padding:20px 15px;
                background-color:rgb(255, 255, 255);
                border-radius: 10px 10px 0 0;
                margin-bottom: 10px;
            }

            .select-item-area {
                display: flex;
                flex-direction: column;
                height: 450px;
                width: 90%;
                background-color: rgb(255, 255, 255);
                border: solid 1px rgb(195, 195, 195);
                box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.21);
                border-radius: 6px;
                padding: 12px 9px;
                overflow-y: auto;

                &::-webkit-scrollbar {
                    width: 5px;
                }
                
                &::-webkit-scrollbar-track {
                    background:rgba(241, 241, 241, 0);
                }
                
                &::-webkit-scrollbar-thumb {
                    background: #FE7E01;
                }

                .item {
                    display: inline-flex;
                    height: 59px;
                    width: 100%;
                    align-items: center;
                    justify-content: space-between;
                    padding: 6px 10px;
                    background-color: rgb(255, 255, 255);
                    border-radius: 6px;
                    cursor: pointer;
                    transform: scale(0.99);
                    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.47);
                    border: solid 2px transparent;
                    transition: border 0.3s ease;
                    transform: scale(0.95);
                    margin-bottom: 10px;

                    .img-area {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }

                    .stock-area {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }

                    img {
                        width: 40px;
                        height: 40px;
                    }

                    p {
                        font-weight: 900;
                        font-size: 1rem;
                    }

                    &:hover {
                        border: solid 2px var( --color-bord-btn-hover );
                    }
                }
            }

            .btn-area {
                display: flex;
                justify-content: center;
                margin: 14px 0;
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

    .box-products {
        height: 110px;/////////////////////////////////////////////////////////////////
        width: 100%;
        // border: solid 1px rgb(180, 10, 10);

        @media (max-width: 500px) {
            height: 199px;
            // border: solid 1px rgb(180, 10, 10);
        }
    
        .header-list {
            display: flex;
            list-style: none;
            justify-content: space-between;
            background-color: #FE7E01;
            padding: 5px ;
            box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.34);

            li {
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
                font-size: 0.8rem;
                color:  #fff;
            }

            li:nth-child(1) {
                width: 80px;
            }

            li:nth-child(2) {
                width: 100px;
            }

            li:nth-child(3) {
                width: 65px;
            }

            li:nth-child(4) {
                width: 80px;
            }

            li:nth-child(5) {
                width: 20px;
            }
        }

        .body {
            height: 85px;
            overflow-y: auto;
            // border: solid 1px rgb(0, 195, 23); /////////////////////////////////////

            @media (max-width: 500px) {
                height: 170px;
                // border: solid 1px rgb(10, 180, 33);
            }

            &::-webkit-scrollbar {
                width: 4px;
            }
            
            &::-webkit-scrollbar-track {
                background:rgba(255, 255, 255, 0);
            }
            
            &::-webkit-scrollbar-thumb {
                background: #007e2a;
            }

            .body-list {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 5px;
                padding: 10px 0 10px;
                list-style: none;
                width: 100%;
                border-bottom: 2px solid #FE7E01;

                li {
                    display: flex;
                    height: 20px;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                    font-size: 0.7rem;
                }

                li:nth-child(1) {
                    width: 85px;
                    color:rgb(0, 58, 8);
                }

                li:nth-child(2) {
                    display: flex;
                    width: 100px;

                    input {
                        width: 50px;
                        height: 30px;
                        border: none;
                        outline: none;
                        text-align: center;
                        font-weight: 600;
                        font-size: 0.8rem;
                        box-shadow: inset 1px 2px 5px rgba(0, 0, 0, 0.29);
                        border: none;
                        border-radius: 5px 0 0 5px;
                    }

                    input[type=number]::-webkit-inner-spin-button, 
                    input[type=number]::-webkit-outer-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                    }

                    span {
                        display: flex;
                        height: 30px;
                        padding: 0 5px;
                        align-items: center;
                        justify-content: center;
                        font-weight: 500;
                        font-size: 0.7rem;
                        background-color: rgb(112, 112, 112);
                        color:  #fff;
                        border-radius: 0 5px 5px 0;
                    }
                }

                li:nth-child(3) {
                    width: 60px;

                    input {
                        width: 100%;
                        height: 30px;
                        border: none;
                        outline: none;
                        text-align: center;
                        font-weight: 600;
                        font-size: 0.8rem;
                        box-shadow: inset 1px 2px 5px rgba(0, 0, 0, 0.29);
                        border: none;
                        border-radius: 5px;
                    }

                    input[type=number]::-webkit-inner-spin-button, 
                    input[type=number]::-webkit-outer-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                    }
                }

                li:nth-child(4) {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 80px;
                    font-weight: 600;
                    font-size: 0.9rem;
                }

                li:nth-child(5) {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 25px;
                }

                .delete-icon {
                    width: 20px;
                    height: 20px;
                    color: red;
                    cursor: pointer;
                    box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.41);
                    border-radius: 4px;
                    padding: 2px;
                }

                .total-item {
                    color:rgb(0, 185, 15);
                }
            }
        }

    }

    .total-money {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        gap: 5px;
        padding: 5px 0px;

        .total {
            display: flex;
            width: 130px;
            height: 36px;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        p {
            font-weight: 500;
        }

        span {
            color:rgb(1, 135, 12);
            padding: 3px 4px;
            font-size: 0.9rem;
            font-weight: 600;
        }
    }

`