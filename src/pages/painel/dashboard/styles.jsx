import styled from "styled-components";

export const Container_dashboard = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    width: 100%;
    padding: 10px 0px ;
    background-color:rgb(244, 243, 243);

    .cards {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 270px;
        gap: 10px;
        padding: 0 10px;
        
        @media (max-width: 1320px) {
            width: 100%;
        }
    }

    .charts-container {
        display: flex;
        flex-wrap: wrap;
        width: 1000px;
        overflow: auto;
        gap: 10px;
        
        .charts {
            display: flex;
            flex-wrap: wrap;
            gap: 13px;
            justify-content: center;
            
            .charts-x {
                display: flex;
                align-items: center;
                flex-direction: column;
                gap: 10px;
                
                @media (max-width: 500px) {
                    width: 100%;
                }
            }
        }
        
        .charts-vendas {
            display: flex;
            flex-wrap: wrap;
            gap: 13px;
            justify-content: center;
            
            .charts-x {
                display: flex;
                flex-direction: column;
                gap: 10px;
                
                @media (max-width: 1068px) {
                    width: 100%;
                }
            }
        }
        
        .chart-stock {
            width: 100%;
            overflow: auto;
            
            @media (max-width: 500px) {
                padding: 0px 10px;
            }
        }
    }

    .charts-container-vendas {
        width: 100%;
        padding: 0px 10px 10px;
        overflow: auto;

        .chart-vendas {
            overflow: auto;
            
        }
    }

`