import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    width: 100%;

    .sidebar {
        transition: width 0.3s ease;
        width: ${props => props.$toogleMenu ? "190px" : "50px" };
        height: 100vh;        
        background: linear-gradient(90deg, var( --color-primary) 0px, var( --color-primary ) 50px, var(  --color-secondary ) 50px, var( --color-secondary ) 100%);
        box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.3);
        z-index: 99;
        position: fixed;
        overflow: hidden;
        overflow-y: auto;
    }

    .content {
        display: flex;
        width: 100%;
        
        .main {
            display: flex;
            width: 100%;
            transition: padding 0.3s ease;
            margin-top: 45px;
            background-color:rgb(255, 255, 255);
            padding: ${props => props.$toogleMenu ? "0px 0px 0px 190px" : "0px 0px 0px 50px" };
        }

        footer {
            transition: width 0.3s ease;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: var(  --color-secondary );
            color: var( --color-text-secondary);
            font-weight: 500;
            font-size: 0.7rem;
            position: fixed;
            bottom: 0;
            right: 0;
            padding: 5px 20px;
            text-align: center;
            width: ${props => props.$toogleMenu ? "calc( 100% - 190px )" : "calc( 100% - 50px )" };
        }
    }
    
`;