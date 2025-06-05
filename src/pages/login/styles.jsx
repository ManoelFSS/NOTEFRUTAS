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
        align-items: center;
        text-align: center;
        overflow: hidden;
        
        .box-container {
            width: 100%;
            margin: auto;

            img {
                width: 150px;
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
                font-size: 22px;
                font-weight: 900;
                color: var( --color-title-primary );
                @media (min-width: 1550px) {
                    font-size: 4.5vh;
                }
            }
            
            p {
                font-size: 16px;
                @media (min-width: 1550px) {
                    font-size: 2.5vh;
                }
            }
            
            .icons {
                display: flex;
                justify-content: center;
                gap:2vh ;
                font-size: 30px;
                padding: 10px 0px;
                
                .whatsapp,
                .facebook,
                .instagram {
                    cursor: pointer;
                    transition: all 0.3s;
                    
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
            background-color: rgba(0, 0, 0, 0.6);
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
