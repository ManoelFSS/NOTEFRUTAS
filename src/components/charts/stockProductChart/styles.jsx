import styled from "styled-components";

export const Container = styled.div`
    background-color:rgb(255, 255, 255);
    border-radius: 8px;
    border: solid 2px #ccc;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
    padding: 10px 0;
    margin-top: 10px;


    @media (max-width: 1068px) {
        width: 1200px;
    }

    .chart-header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        padding: 14px 15px;
        gap: 10px;

        h3 {
            font-size: 1.2rem;
            font-weight: 900;
            color: #000;
        }

        .custom-legend {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-wrap: wrap;
            width: 300px;
            gap: 5px;
            padding-top:10px;

            .legend-item {
                display: flex;
                align-items: center;
                font-weight: 600;
                font-size: 0.7rem;
                margin-right: 10px;
            }

            .legend-color {
                width: 12px;
                height: 12px;
                margin-right: 6px;
                border-radius: 2px;
            }

            .legend-item:nth-child(1) .legend-color {
                background-color: #FF9D00 !important;
            }
        }

        .selects-ano-mes {
            display: flex;
            align-items: center;
            gap: 5px;
        }
    }

    .chart-main {
        display: flex;
        height: 200px;
        justify-content: center;
        width: 100%;
        padding: 0px 10px;
        background-color:rgb(255, 255, 255);

        @media (max-width: 1320px) {
            height: 200px;
        }
    }

`