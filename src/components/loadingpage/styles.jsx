import styled from "styled-components";

export const All_loading = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100svh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: var( --color-bg-primary );
    z-index: 9999;

    .logo-area {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    img {
        width: 150px;
    }
`