import styled from "styled-components";

export const Container = styled.div`
    height: 100svh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;

    .selectArea  {
        width: 600px;
        height: 400px;
        background-color: #fff;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        position: relative;
       
    }
`