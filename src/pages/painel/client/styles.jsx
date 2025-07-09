import styled from "styled-components";

export const Container = styled.section`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    height: 100%;
    padding: 10px;
    margin:auto;
    
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
                width: 25px;
                height: 25px;
                cursor: pointer;
                trasition: color 0.3s ease;
                padding: 2px;
                border-radius: 4px;
                background: rgb(255, 255, 255); /* fundo semi-transparente */
                backdrop-filter: blur(10px); /* desfoque no fundo */
                -webkit-backdrop-filter: blur(10px); /* Safari */
                border: 1px solid rgb(255, 255, 255); /* borda brilhante */
                box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.43); /* sombra suave */
                
                &:hover {
                    transform: scale(1.1);
                    padding: 3px;
                    border-radius: 4px;
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
    width: 100%;
    height: calc(100vh - 125px);
    overflow: auto;

    .body-card{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 10px;
        width: 100%;
        padding: 14px 0;
        overflow: auto;
        height: calc(100vh - 130px);
        
        &::-webkit-scrollbar {
            width: 8px;
        }
        
        &::-webkit-scrollbar-track {
            background:rgba(241, 241, 241, 0);
        }
        
        &::-webkit-scrollbar-thumb {
            background: #FE7E01;
        }
    }
    
    .table {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        min-width: 1200px;
        // height: calc(100vh - 130px);
        // border: 2px solid rgb(178, 15, 15);


        // @media (max-width: 1065px) {
        //     height: calc(100vh - 170px);
        // }

        // @media (max-width: 605px) {
        //     height: calc(100vh - 213px);
        // }

        // @media (max-width: 433px) {
        //     height: calc(100vh - 258px);
        // }

        // @media (max-width: 309px) {
        //     height: calc(100vh - 299px);
        // }
        
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
                    background-color: #FE7E01;
                    border-radius: 4px;
                    color: var( --color-text-secondary );
                    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.4);
                    
                    
                    .icon  {
                        width: 18px;
                        height: 18px;
                    }
                }
                
                li:nth-child(1) {
                    width: 50px;
                    justify-content: center;
                }

                li:nth-child(2) {
                    width: 180px;
                }
                
                li:nth-child(3) {
                    width: 160px;
                }

                li:nth-child(4){
                    width: 150px;
                }

                li:nth-child(6){
                    width: 180px;
                }

                li:nth-child(7){
                    width: 180px;
                }

                li:nth-child(8){
                    width: 180px;
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
                box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.22);
                padding: 5px 0;

                &:nth-child(even) {
                    background-color: #E5E5E5;
                }

                li {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 500;
                    font-size: 0.8rem;
                    color: #000;
                    color: var( --color-text-primary );
                }
                
                li:nth-child(1) {
                    display: flex;
                    align-items: center;
                    width: 50px;
                    padding: 0;
                    
                    img {
                        width: 35px;
                        height: 35px;
                        border-radius: 50%;
                        background-color: #fff;
                    }
                }
                
                li:nth-child(2) {
                    width: 180px;
                }
                
                li:nth-child(3) {
                    width: 160px;
                }
                
                li:nth-child(4) {
                    display: flex;
                    gap: 10px;
                    width: 150px;
                }

                li:nth-child(6){
                    width: 180px;
                }
                
                li:nth-child(5), li:nth-child(9) {
                    width: 120px;
                }

                li:nth-child(7){
                    display: flex;
                    justify-content: center;
                    width: 180px;
                    
                    span {
                        text-align: center;
                        width: 160px;
                        font-weight: 600;
                        font-size: 1rem;
                        color: #FFF;
                        padding: 8px 10px;
                        border-radius: 4px;
                    }
                }
                
                .icons {
                    width: 170px;
                    justify-content: center;
                    gap: 10px;
                    
                    .icon {
                        width: 35px;
                        height: 35px;
                        cursor: pointer;
                        trasition: color 0.3s ease;
                        padding: 6px;
                        border-radius: 4px;
                        background: rgba(255, 255, 255, 0); /* fundo semi-transparente */
                        backdrop-filter: blur(10px); /* desfoque no fundo */
                        border: 1px solid rgb(255, 255, 255); /* borda brilhante */
                        -webkit-backdrop-filter: blur(10px); /* Safari */
                        box-shadow: 1px 2px 6px 0 rgba(0, 0, 0, 0.4), inset 1px 2px 10px 0 rgba(255, 255, 255, 0.8); /* sombra suave */
                    }

                    .icon:nth-child(2) {
                        color:rgb(0, 0, 0);
                    }

                    .icon:nth-child(2) {
                        color:rgb(21, 0, 255);
                    }
                    
                    .icon:nth-child(3) {
                        color:rgb(0, 0, 0);
                    }

                    .icon:nth-child(3) {
                        color:rgb(255, 0, 0);
                    }

                    .icon-whatsapp {
                        width: 35px;
                        height: 35px;
                        cursor: pointer;
                        trasition: color 0.3s ease;
                        color:rgb(0, 133, 44);
                        padding: 6px;
                        border-radius: 4px;
                        background: rgba(255, 255, 255, 0); /* fundo semi-transparente */
                        backdrop-filter: blur(10px); /* desfoque no fundo */
                        border: 1px solid rgb(255, 255, 255); /* borda brilhante */
                        -webkit-backdrop-filter: blur(10px); /* Safari */
                        box-shadow: 1px 2px 6px 0 rgba(0, 0, 0, 0.4), inset 1px 2px 10px 0 rgba(255, 255, 255, 0.8); /* sombra suave */

                        &:hover {
                            color:rgb(0, 133, 44);
                        }
                    }
                }
            }
        }
    }

`
