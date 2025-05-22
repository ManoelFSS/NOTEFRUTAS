import styled from "styled-components";

export const Text = styled.h3`
    font-size: 1.2rem;
    font-weight: 900;
    color: var( --color-title-primary );
    // border-bottom: solid 4px var( --color-bord-btn-primary );

    text-transform: capitalize;

    @media (min-width: 1920px) {
        font-size: 3vh;
        padding-bottom: 1vh;
        border-bottom: solid 0.5vh var( --color-bord-btn-primary );
    }

`
