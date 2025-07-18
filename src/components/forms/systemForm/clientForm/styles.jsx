import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100svh;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 9999;
    animation-name: faid;
    animation-duration: 0.4s;

    @keyframes faid {
        from {opacity: 0}
        to { opacity: 1}
    }

    .form-area {
        position: relative;
        margin: auto;
        animation-name: animatop;
        animation-duration: 0.4s;
    }

    @keyframes animatop {
        from {top: -50px; opacity: 0}
        to { top: 0; opacity: 1}
    }

    .close {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;

        .close-icon {
            font-size: 1.5rem;
            color:rgb(255, 0, 0);
            cursor: pointer;
            box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.46);
            border-radius: 4px;
            padding: 3px;

            &:hover {
                color:rgb(209, 0, 0);
            }
        }
    }

    .select {
        aparence: none;
        background-color: var( --color-bg-input );
        width: 100%;
        height: 35px;
        border-radius: 5px;
        border: none;
        color: var( --color-text-primary );
        box-shadow: inset 1px 2px 5px rgba(0, 0, 0, 0.47);
        cursor: pointer;
        font-size: 1rem;
        font-weight: 500;
        outline: none;
        padding: 0 10px;
        transition: background-color 0.3s ease;
    }
`