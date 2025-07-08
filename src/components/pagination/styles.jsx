import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    // width: 290px;
    user-select: none;

    .icon-left {
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
            padding: 3px;
            border-radius: 4px;
            color: #FE7E01;
        }
    }

    button {
        width: 15px;
        height: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.4);
        font-size: 0.8rem;
        border: none;
        transition: background-color 0.3s ease;
        font-weight: 700;
        border-radius: 2px;
    }

    button:hover, .active {
        width: 25px;
        height: 25px;
        cursor: pointer;
        trasition: color 0.3s ease;
        padding: 2px;
        border-radius: 4px;
        background: rgb(255, 255, 255); /* fundo semi-transparente */
        backdrop-filter: blur(10px); /* desfoque no fundo */
        -webkit-backdrop-filter: blur(10px); /* Safari */
        box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.43); /* sombra suave */
        color: #FE7E01;
        font-weight: 900;
        
        &:hover {
            color: #007E2A;
        }
    }

    .icon-right {
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
            padding: 3px;
            border-radius: 4px;
            color: #FE7E01;
        }
    }
`