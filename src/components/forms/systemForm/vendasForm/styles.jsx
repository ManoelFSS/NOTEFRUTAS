import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100svh;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 9999;
    animation-name: faid;
    animation-duration: 0.4s;

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
            padding-top: 5px;

            .radio-area {
                display: flex;
                gap: 36px;
            }

            div {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            input {
                width: 16px;
                height: 16px;
            }

            label {
                font-size: 0.8rem;
                font-weight: 500;
                cursor: pointer;
            }
        }

        .inputs-area {
            display: flex;
            gap: 60px;
            padding-top: 5px;

            h4 {
                font-size: 0.8rem;
                font-weight: 500;
                padding-bottom: 5px;
            }

            input {
                height: 25px;
                width: 145px;
                padding: 0 5px;
            }

            p {
                text-align: center;
            }
        }

        .date {
            display: flex;
            flex-direction: column;
            gap: 5px;
            padding-top: 10px;

            label {
                font-size: 0.8rem;
                font-weight: 500;
            }

            input {
                height: 25px;
                width: 145px;
                padding: 0 5px;
            }
        }

        .modal-product {
            display: flex;
            flex-direction: column;
            position: absolute;
            width: 95%;
            height: 95%;
            background-color:rgb(255, 255, 255);

            .search-area {
                padding:20px 15px;
                background-color: rgb(255, 255, 255);
                border-radius: 10px 10px 0 0;
                margin-bottom: 10px;
            }

            .select-item-area {
                display: flex;
                flex-direction: column;
                height: 390px;
                width: 95%;
                background-color: rgb(235, 235, 235);
                padding: 12px 9px;
                overflow-y: auto;

                &::-webkit-scrollbar {
                    width: 3px;
                }
                
                &::-webkit-scrollbar-track {
                    background:rgba(241, 241, 241, 0);
                }
                
                &::-webkit-scrollbar-thumb {
                    background: #FF9D00;
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
                    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.22);
                    border: solid 2px transparent;
                    transition: border 0.3s ease;
                    transform: scale(0.95);
                    margin-bottom: 2px;

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
        height: 170px;
        width: 100%;
    
        .header-list {
            display: flex;
            list-style: none;
            justify-content: space-between;
            background-color: #FF9D00;
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
                width: 50px;
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
            height: 140px;
            overflow-y: auto;

            &::-webkit-scrollbar {
                width: 4px;
            }
            
            &::-webkit-scrollbar-track {
                background:rgba(255, 255, 255, 0);
            }
            
            &::-webkit-scrollbar-thumb {
                background:rgb(43, 42, 42);
            }

            .body-list {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 5px;
                padding: 10px 0 10px;
                list-style: none;
                width: 100%;
                border-bottom: 2px solid rgb(255, 166, 0);

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
                    width: 45px;

                    input {
                        width: 100%;
                        height: 100%;
                        border: none;
                        outline: none;
                        text-align: center;
                        font-weight: 600;
                        font-size: 0.8rem;
                        border: solid 1px rgba(0, 0, 0, 0.55);
                    }

                    input[type=number]::-webkit-inner-spin-button, 
                    input[type=number]::-webkit-outer-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                    }
                }

                li:nth-child(3) {
                    width: 60px;

                    input {
                        width: 100%;
                        height: 100%;
                        border: none;
                        outline: none;
                        text-align: center;
                        font-weight: 600;
                        font-size: 0.8rem;
                        border: solid 1px rgba(0, 0, 0, 0.55);
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
                    width: 20px;
                }

                .delete-icon {
                    font-size: 1.3rem;
                    color: red;
                    cursor: pointer;
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
        justify-content: flex-end;
        align-items: center;
        gap: 20px;
        padding: 5px 10px ;

        p {
            font-weight: 00;
        }

        span {
            color:rgb(1, 135, 12);
            padding: 3px 4px;
            font-size: 1rem;
            font-weight: 600;
        }
    }

`