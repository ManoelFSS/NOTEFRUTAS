import styled from "styled-components";

export const Container_select = styled.div`
    cursor: pointer;
    position: relative;

    .select_header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 5px;
        width: 100%;
        height: 35px;
        background:rgb(255, 255, 255);
        padding: 0px 10px;
        border-radius: 4px;
        box-shadow: inset 1px 1px 5px rgba(2, 2, 2, 0.34);
    }

    .select_header:hover h3,
    .select_header:hover .icone_select {
        color: #FF9D00;
    }

    .icone_select {
        font-size: 0.8rem;
    }

    .select_header h3 {
        font-size: 0.9rem;
        font-weight: 400;
        color: #000;
    }

    .select_list {
        overflow:auto;
        // transition: all 0.2s;
        position: absolute;
        max-height: 120px;
        top: 40px;
        left: 0px;
        background-color: #fff;
        box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.3);
        z-index: 99;
        border-radius: 4px;

        &::-webkit-scrollbar {
            width: 5px;
        }

        &::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        &::-webkit-scrollbar-thumb {
            background: #007E2A;   
            cursor: pointer;
        }

        li {
            display: flex;
            align-items: center;
            justify-content: ;
            padding: 0px 10px;
            width: 100%;
            height: 30px;
            font-size: 0.9rem;
            font-weight: 600;
            trasition: all 0.3s;

            &:hover {
                background-color: #f2f2f2;
            }
        }
    }

`