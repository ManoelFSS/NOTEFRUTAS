import styled from "styled-components";

export const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    padding: 10px;
    
    .box-right {
        display: flex;
        flex-direction: column;
        
        p {
            font-size: 0.7rem;
            color: #000;
        }
    }
    
    .box-filter {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 15px;
        width: 100%;
        background-color: #fff;
        padding: 10px;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
        border-radius: 4px;

        .box-icon {
            display: flex;
            margin-left: 10px;
            gap: 15px;
            
            .icon-square, .icon-list {
                cursor: pointer;
                font-size: 1.7rem;
                trasition: color 0.3s ease;
                box-shadow: 1px 0.5px 5px rgba(0, 0, 0, 0.4);
                padding: 4px;
                border-radius: 4px;
                
                &:hover {
                    color: var( --color-icon-hover );
                    transform: scale(1.1);
                }
            }
            
            .ative-icon  {
                color: var( --color-icon-hover );
            }
        }
        
        
    }
`

export const ContainerTable = styled.section`
    display: flex;
    margin-top: 10px;
    width: 100%;
    height: calc(100vh - 130px);
    overflow: auto;

    .body-card{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 0px;
        width: 100%;
        padding: 5px;
        overflow: auto;
        height: calc(100vh - 134px);
        
        &::-webkit-scrollbar {
            width: 3px;
        }
        
        &::-webkit-scrollbar-track {
            background:rgba(241, 241, 241, 0);
        }
        
        &::-webkit-scrollbar-thumb {
            background: #FF9D00;
        }
    }
    
    .table {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        min-width: 1140px;
        height: calc(100vh - 130px);

        @media (max-width: 1065px) {
            height: calc(100vh - 170px);
        }

        @media (max-width: 605px) {
            height: calc(100vh - 213px);
        }

        @media (max-width: 433px) {
            height: calc(100vh - 258px);
        }

        @media (max-width: 309px) {
            height: calc(100vh - 299px);
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
                padding:  10px 0;
                
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
                    background-color: #FF9D00;
                    border-radius: 4px;
                    color: var( --color-text-secondary );
                    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.4);
                    
                    
                    .icon  {
                        width: 18px;
                        height: 18px;
                    }
                }
                
                li:nth-child(1) {
                    width: 70px;
                    justify-content: center;
                }

                li:nth-child(2) {
                    width: 180px;
                }
                
                li:nth-child(3) {
                    width: 160px;
                }

                li:nth-child(4){
                    width: 240px;
                }

                li:nth-child(6){
                    width: 150px;
                }

                li:nth-child(7){
                    width: 150px;
                }

                li:nth-child(8){
                    width: 160px;
                }

                li:nth-child(5), li:nth-child(9) {
                    width: 120px;
                }
                
            }
        }

        .body {
            display: flex;
            align-items: center;
            justify-content: ;
            flex-direction: column;
            gap: 10px;
            list-style: none;
            width: 100%;
            padding: 10px 0;
            overflow: auto;
            height: calc(100vh - 192px);
            
            &::-webkit-scrollbar {
                width: 5px;
            }
            
            &::-webkit-scrollbar-track {
                background:rgba(241, 241, 241, 0);
            }
            
            &::-webkit-scrollbar-thumb {
                background: #FF9D00;
            }

            .body-list {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
                list-style: none;
                width: 99%;
                background-color:rgb(255, 255, 255);     
                border-radius: 6px;    
                box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.22);
                padding: 5px 0;

                &:nth-child(even) {
                    background-color:rgba(255, 255, 255, 0.95);
                }

                li {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0 10px;
                    font-weight: 600;
                    font-size: 0.8rem;
                    color: #000;
                    color: var( --color-text-primary );
                }
                
                li:nth-child(1) {
                    display: flex;
                    align-items: center;
                    width: 70px;
                    padding: 0;
                    
                    img {
                        width: 60px;
                        height: 50px;
                        border-radius: 8px;
                        background-color: #fff;
                    }
                }
                
                li:nth-child(2) {
                    width: 180px;
                }
                
                li:nth-child(3) {
                    display: flex;
                    gap: 10px;
                    width: 160px;
                    font-weight: 900;
                    font-size: 1rem;
                    
                    span {
                        font-weight: 500;
                        font-size: 0.8rem;
                    }
                }
                
                li:nth-child(4) {
                    display: flex;
                    gap: 10px;
                    width: 240px;
                }

                li:nth-child(6){
                    width: 150px;
                }
                
                li:nth-child(5), li:nth-child(9) {
                    width: 120px;
                    span {    
                        font-weight: 900;
                        font-size: 1rem;
                    }
                }

                li:nth-child(7){
                    width: 160px;
                }
                
                .icons {
                    width: 160px;
                    justify-content: center;
                    gap: 14px;
                    
                    .icon {
                        font-size: 1.5rem;
                        cursor: pointer;
                        trasition: color 0.3s ease;
                        
                        &:hover {
                            transform: scale(1.1);
                            padding: 2px;
                            border-radius: 4px;
                            box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.4);
                        }
                    }
                    
                    .icon-whatsapp {
                        font-size: 1.5rem;
                        cursor: pointer;
                        trasition: color 0.3s ease;
                        color: var(  --color-bg-btn-primary );
                        font-weight: 900;
                        
                        &:hover {
                            transform: scale(1.1);
                            padding: 2px;
                            border-radius: 4px;
                            box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.4);
                        }
                    }
                }
            }
        }
    }

`
