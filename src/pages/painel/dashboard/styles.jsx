import styled from "styled-components";

export const Container_dashboard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 10px 0px ;
    background-color:rgb(244, 243, 243);

    .cards {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
        gap: 10px;
        padding: 0 10px;
    }

    .charts-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
        gap: 15px;
        
        .charts-x {
            display: flex;
            align-items: center;
            flex-direction: column;
            gap: 15px;
            
            @media (max-width: 500px) {
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

    .charts-container-vendas {
        width: 100%;
        padding: 0px 10px ;
        overflow: auto;

        .chart-vendas {
            overflow: auto;
            
        }
    }

`