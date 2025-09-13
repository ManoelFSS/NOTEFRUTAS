import styled from "styled-components";

export const Container_company = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: calc(100vh - 45px);
    overflow: auto;
    padding: 0px 10px 15px;
    
    &::-webkit-scrollbar {
        width: 8px;
        height: 3px;
    }
    
    &::-webkit-scrollbar-track {
        background:rgba(241, 241, 241, 0);
    }
    
    &::-webkit-scrollbar-thumb {
        background: #FE7E01;
    }



    .container-company {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        width:90%;
        background-color: #f2f2f2f2;
        margin-top: 15px;
        border-radius: 4px;
        box-shadow: 1px 2px 6px 0 rgba(0, 0, 0, 0.24);
        padding: 10px;

        @media (max-width: 760px) {
            flex-direction: column;
            
        }

        .logo-company {
            width: 90px;
            height: 90px;

            img {
                width: 100%;
                height: 100%;
            }
            
        }

        .info-company {
            flex: 1;

            h1 {
                font-size: 1rem;
                font-weight: 900;
                margin-bottom: 10px;
                margin-left: 5px;
                color: #FE7E01;
            }

            .company {
                display: flex;
                width: 100%;
                flex-wrap: wrap;
                justify-content: center;
                gap: 20px;
                padding: 5px;

                div {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    height: 50px;
                    padding: 10px;
                    gap: 3px;
                    color: #000;
                    background-color: #ffffffc0;
                    border-radius: 4px;
                    box-shadow: 1px 1px 5px rgba(48, 47, 47, 0.14);

                    @media (max-width: 740px) {
                        min-width: 100%;
                    }

                    h3 {
                        font-size: 0.8rem;
                        font-weight: 900; 
                    }

                    p {
                        font-size: 0.7rem;
                        font-weight: 400;
                    }
                }
            }
        }
    }

    .title {
        width: 90%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0px 10px;
    }

    .container {
        display: flex;
        width: 90%;
        gap: 20px;
        justify-content: space-between;

        
        .colaboradores{
            padding: 10px;
            background-color: #f2f2f2f2;
            box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.4);

            h3 {
                font-size: 1rem;
                font-weight: 900;
                margin-bottom: 10px;
                padding-left: 5px;
            }


            
            .header {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                border-radius: 6px;
                
                .header-list {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 10px;
                    list-style: none;
                    width: 99%;
                    
                    
                    li {
                        display: flex;
                        height: 40px;
                        justify-content: space-between;
                        align-items: center;
                        padding: 0 10px;
                        gap: 10px;
                        font-weight: 600;
                        font-size: 0.8rem;
                        color: #000;
                        background-color: #FE7E01;
                        border-radius: 4px;
                        color: var( --color-text-secondary );
                        box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.4);
                        
                        .icon  {
                            width: 20px;
                            height: 20px;
                        }
                    }
                    
                    li:nth-child(1) {  /////////////////////////////////////////
                        width: 50px;
                        justify-content: center;
                    }

                    li:nth-child(2) {
                        width: 170px;
                    }
                    
                    li:nth-child(3) {
                        width: 130px;
                        .icon{
                            width: 18px;
                            height: 18px;
                        }
                    }

                    li:nth-child(4){
                        width: 200px;
                    }

                    li:nth-child(5) {
                        width: 100px;
                        text-align: center;

                        .icon  {
                            width: 30px;
                            height: 30px;
                        }
                    }

                    li:nth-child(6){
                        width: 100px;
                    }
                    
                }
            }

            .body {
                display: flex;
                align-items: center;
                justify-content: ;
                flex-direction: column;
                gap: 16px;
                list-style: none;
                width: 100%;
                padding: 10px 0;
                overflow: auto;
                height: calc(100vh - 192px);
                
                &::-webkit-scrollbar {
                    width: 8px;
                }
                
                &::-webkit-scrollbar-track {
                    background:rgba(241, 241, 241, 0);
                }
                
                &::-webkit-scrollbar-thumb {
                    background: #FE7E01;
                }

                .body-list {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 10px;
                    list-style: none;
                    width: 99%;
                    background-color: #f2f2f2f2;     
                    border-radius: 6px;    
                    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.19);
                    padding: 5px 0;

                    &:nth-child(even) {
                        background-color: #E5E5E5;
                    }

                    li {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 0 10px;
                        font-weight: 500;
                        font-size: 0.8rem;
                        color: #000;
                        color: var( --color-text-primary );
                        border: solid 1px red;
                    }
                    
                    li:nth-child(1) {
                        display: flex;
                        align-items: center;
                        width: 50px;
                        padding: 0;
                        
                        img {
                            width: 40px;
                            height: 40px;
                            border-radius:50%;
                            background-color: #fff;
                        }
                    }
                    
                    li:nth-child(2) {
                        width: 170px;
                    }
                    
                    li:nth-child(3) {
                        display: flex;
                        gap: 10px;
                        width: 130px;
                        font-weight: 500;
                        font-size: 0.8rem;
                        
                        span {
                            font-weight: 500;
                            font-size: 0.8rem;
                        }
                    }
                    
                    li:nth-child(4) {
                        display: flex;
                        gap: 10px;
                        width: 200px;
                        font-weight: 500;
                        font-size: 0.9rem;
                    }
                    
                    li:nth-child(5) {
                        width: 100px;
                        font-weight: 500;
                        font-size: 1rem;
                    }

                    li:nth-child(6){
                        width: 100px;
                        font-weight: 500;
                        font-size: 0.9rem;
                    }
                }
            }
        }

        .colaboradores-area {
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 20px;
        }

        .details-plan{
            flex: 1;
            padding: 10px;
            background-color: #f2f2f2f2;
            box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.4);

            h3 {
                font-size: 1rem;
                font-weight: 900;
                margin-bottom: 10px;
                padding-left: 5px;
            }
        }

        .logs {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            min-width: 280px;
            height: 500px;
            overflow: auto;
            padding: 10px 10px 15px;
            border-radius: 4px;
            background-color: #f2f2f2f2;
            box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.4);


            
            &::-webkit-scrollbar {
                width: 8px;
                height: 3px;
            }
            
            &::-webkit-scrollbar-track {
                background:rgba(241, 241, 241, 0);
            }
            
            &::-webkit-scrollbar-thumb {
                background: #FE7E01;
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
        }
    }

`