import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 290px;
    user-select: none;

    .icon-left {
        cursor: pointer;
        box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.4);
        font-size: 1.5rem;
        border-radius: 4px;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: var( --color-bg-btn-hover );
            color: var( --color-text-secondary );
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
        background-color: var( --color-bg-btn-hover );
        color: var( --color-text-secondary );
    }

    .icon-right {
        cursor: pointer;
        box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.4);
        font-size: 1.5rem;
        border-radius: 4px;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: var( --color-bg-btn-hover );
            color: var( --color-text-secondary );
        }
    }
`