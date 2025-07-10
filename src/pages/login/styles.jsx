import styled from "styled-components";
// images
import graficPhoto from "../../assets/fruts.avif"

export const Container_login = styled.section`
    display: flex;
    min-height: 100svh;
    width: 100%;
    background-color: #fff;
    position: relative;

    @media (max-width: 552px) {
        flex-direction: column;
    }
    
    .box-left {
        height: 100svh;
        min-width: 280px;
        display: flex;
        justify-content: center;
        background:rgb(255, 255, 255);
        box-shadow: inset -2px 2px 20px rgba(0, 0, 0, 0.47);
        align-items: center;
        text-align: center;
        overflow: hidden;
        
        .box-container {
            width: 90%;
            margin: auto;
            padding: 10px;

            img {
                width: 140px;
                padding: 10px;
                background-color:rgba(198, 205, 199, 0.95);
                box-shadow: 1px 2px 8px 0 rgba(0, 0, 0, 0.7);
                margin-bottom: 10px;
                border-radius: 5px;

                @media (min-width: 1550px) {
                    width: 25vh;
                }

                @media (max-width: 440px) {
                    width: 100px;
                }

                @media (max-width: 340px) {
                    width: 90px;
                }
            }

            h1 {
                font-size: 1.5rem;
                font-weight: 900;
                color: var( --color-title-primary );
                text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
                @media (min-width: 1550px) {
                    font-size: 4.5vh;
                }
            }
            
            p {
                font-size: 1rem;
                @media (min-width: 1550px) {
                    font-size: 2.5vh;
                }
            }
            
            .icons {
                display: flex;
                justify-content: center;
                gap:2vh ;
                font-size: 30px;
                padding: 20px 0px;

                .whatsapp,
                .facebook,
                .instagram {
                    width: 40px;
                    height: 40px;
                    border-radius: 5px;
                    cursor: pointer;
                    padding: 5px;
                    transition: all 0.3s;
                    background: rgba(255, 255, 255, 0); /* fundo semi-transparente */
                    backdrop-filter: blur(10px); /* desfoque no fundo */
                    border: 1px solid rgb(255, 255, 255); /* borda brilhante */
                    -webkit-backdrop-filter: blur(10px); /* Safari */
                    box-shadow: 1px 2px 6px 0 rgba(0, 0, 0, 0.4), inset 1px 2px 10px 0 rgba(255, 255, 255, 0.8); /* sombra suave */
                
                    
                    &:hover {
                        transform: scale(1.1);
                    }
                }
                
                .whatsapp {
                    color: #25d366;
                }
                
                .facebook {
                    color: #4267b2;
                }
                
                .instagram {
                    color: #e1306c;
                }
                
                @media (min-width: 1550px) {
                    font-size: 4.5vh;
                }
                
            }
        }
        
        @media (min-width: 1550px) {
            width: 30vw;
            min-width: 600px;
        }
        
        @media (max-width: 552px) {
            max-height: 30svh;
        }

        @media (max-width: 340px) {
            height:30svh;
        }

        @media (orientation: landscape) {
            min-height: 50svh;
        }
    }
    
    .box-right {
        width: 100%;
        height: 100svh;
        background:  #000 url(${graficPhoto}) no-repeat right center / 100% 100%;
        position: relative;

        @media (max-width: 550px) {
            height: 70svh;
        }

        @media (max-width: 340px) {
            height: 70svh;
        }

        .box-blu {
            display: flex;
            width: 100%;
            height: 100svh;
            background-color: rgba(0, 0, 0, 0.3);
            overflow: auto;
            padding: 20px 10px 40px;
            position: relative;
            
            @media (max-width: 550px) {
                height: 70svh;
            }
            
            @media (max-width: 340px) {
                height: 70svh;
            }
        }
        
        .copyright {   
            font-size: 1.7vh;
            font-weight: 600;
            z-index: 2;
            padding: 2.5px;
            width: 100%;
            text-align: center;
            color: var( --color-text-secondary );
            background-color: rgba(0, 0, 0, 0.5);
            position: absolute;
            bottom: 0px;
            left: 0;
            right: 0;
            
        }
    }
`;
