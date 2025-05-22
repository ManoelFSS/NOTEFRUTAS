import styled from "styled-components";

export const Nav = styled.nav`
    display: flex;
    trasition: width 0.3s ease;
    flex-direction: column;
    height: 100vh;
    
    .logo {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-direction: column;
        width:190px;
        padding-left: 55px;
        padding-top: 15px;
        padding-bottom: 10px;

        img {
            width: 80px;
        }

        h3 {
            font-size: 1rem;
            font-weight: 700;
            color: var( --color-text-secondary );
            text-align: center;
        }
    }

    ul {
        trasition: width 0.3s ease;
        list-style: none;
        display: flex;
        width: 170px;
        max-width: 170px;
        flex-direction: column;
        padding-bottom: 10px;

        .link {
            text-decoration: none;
        }

        li {
            display: flex;
            width: 190px;
            align-items: center;
            cursor: pointer;
            font-size: 0.8rem;
            font-weight: 600;
            gap: 30px;
            transition: color 0.3s ease;
            color: var( --color-text-secondary );

            &:hover {
                background-color: var( --color-text-hover);
            }

            &:hover .icon {
                color: var( --color-icon-hover );
            }
                
            .icon {
                cursor: pointer;
                width: 40px;
                height: 45px;
                color: var( --color-icon-primary );
                position: relative;
                padding: 5px;
                left: 4px;
            }
        }

        .active {
            background-color: var( --color-text-hover);
            color: var(  --color-icon-hover);
            
            .icon {
                color: var( --color-icon-hover );
            }
        }
        
    }

`