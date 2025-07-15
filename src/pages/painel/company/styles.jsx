import styled from "styled-components";

export const Container_company = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: calc(100vh - 45px);
    overflow: auto;
    padding: 10px;
    
    &::-webkit-scrollbar {
        width: 8px;
        height: 3px;
    }
    
    &::-webkit-scrollbar-track {
        background:rgba(241, 241, 241, 0);
    }
    
    &::-webkit-scrollbar-thumb {
        background: #FE7E01;
    }
    
    .banner {
        width: 100%;
        height: 100px;
        background: linear-gradient(to top, #fe6f01ff, #ffa600ff);
        border-radius: 4px;
        padding: 10px 35px;

        h1 {
            color: #ffffff;
            font-size: 1.5rem;
            font-weight: 900;
            text-align: center;
            margin-bottom: 10px;
        }
        
    }

    .container-company {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        width:90%;
        background-color: #ebebeb8a;
        padding: 15px;
        border-radius: 4px;
        position: relative;
        backdrop-filter: blur(5px); /* desfoque no fundo */
        border: 1px solid rgba(255, 255, 255, 0.48); /* borda brilhante */
        -webkit-backdrop-filter: blur(5px); /* Safari */
        box-shadow: 1px 2px 6px 0 rgba(0, 0, 0, 0.24), inset 1px 2px 10px 0 rgba(255, 255, 255, 0.34); /* sombra suave */        top: -50px;

        @media (max-width: 740px) {
            flex-direction: column;
            
        }

        .logo-company {
            width: 100px;
            height: 100px;

            img {
                width: 100%;
                height: 100%;
            }
            
        }

        .info-company {
            flex: 1;

            .company {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 20px;
                padding: 10px;

                div {
                    display: flex;
                    flex-direction: column;
                    height: 60px;
                    padding: 10px;
                    gap: 5px;
                    color: #000;
                    min-width: 200px;
                    background-color: #ffffff88;
                    border-radius: 4px;
                    box-shadow: 1px 1px 5px rgba(48, 47, 47, 0.18);

                    @media (max-width: 740px) {
                        min-width: 100%;
                    }

                    h3 {
                        font-size: 0.9rem;
                        font-weight: 900; 
                    }

                    p {
                        font-size: 0.8rem;
                        font-weight: 400;
                    }
                }
            }
        }
    }

    

`