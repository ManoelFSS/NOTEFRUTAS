import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 290px;
    height: calc(100vh - 45px);
    gap: 10px;
    position: fixed;
    top: 45px;
    transition: right 0.3s  ease;
    right: ${props => props.$showModalAlert ? "0" : "-290px" };
    background-color:rgba(0, 0, 0, 0.67);
    box-shadow: -1px 0px 5px rgb(0, 0, 0);
    z-index: 9999;
    padding: 20px 10px;

    @media (max-width: 450px) {
        width: 100%;
        right: ${props => props.$showModalAlert ? "0" : "-100%" };
    }

    .box-alert {
        Display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        width: 100%;
        height: 100%;
        padding: 5px 5px 10px 10px;

        &::-webkit-scrollbar {
            width: 4px;
        }
        
        &::-webkit-scrollbar-track {
            background:rgba(241, 241, 241, 0);
        }
        
        &::-webkit-scrollbar-thumb {
            background: #FE7E01;
        }
    }

    h3 {
        width: 94%;
        font-size: 1rem;
        font-weight: 700;
        color: var( --color-text-secondary );
        background-color: #FE7E01;
        padding: 10px 20px;
        border-radius: 6px;
        text-align: center;
    }

    .alert {
        display: flex;
        flex-direction: column;
        width: 98%;
        gap: 5px;
        padding: 10px 0 0;
        background-color:rgb(255, 255, 255);
        border-radius: 5px;
        box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.5);
        margin-bottom: 10px;

        h4 {
            font-size: 1rem;
            font-weight: 900;
            padding: 0px 10px;
        }
        
        p {
            font-size: 0.7rem;
            font-weight: 500;
            padding: 0px 10px;
            line-height: 16px;
        }

        .date-area{
            display: flex;
            flex-direction: column;
            gap: 5px;
            align-items: center;
            width: 100%;
            border-top: solid 4px #FE7E01;
            background-color:rgb(238, 237, 237);
            padding-bottom: 10px;
            border-radius: 0px 0px 5px 5px;

            h5 {
                font-size: 0.8rem;
                font-weight: 500;
                padding: 10px 0px 0px;
            }


            .date {
                display: flex;
                width: 100%;
                flex-direction: column;
                align-items: center;

                p {
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: #FE7E01;
                }

                span {
                    font-size: 0.7rem;
                    font-weight: 600;
                }
            }
        }
    }

`
