import styled from "styled-components";

export const Container = styled.div`
    width: 245px;
    height: 410px;
    border-radius: 6px;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background-color: #fff;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
    transform: scale(0.95);
    transition: transform 0.3s ease;
    cursor: pointer;

    &:hover {
        transform: scale(1);
    }

    .headerCard {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;

        img {
            width: 80px;
            height: 80px;
        }
    }

    .bodyCard {
        width: 100%;

        h3 {
            display: inline-block;
            padding-left: 5px;
            padding-bottom: 5px;
            font-size: 0.9rem;
            font-weight: 900;
        }

        p {
            font-size: 0.7rem;
            font-weight: 900;
            padding: 4px 8px;
            background-color: #f2f2f2;
            color:rgb(87, 87, 87);
            height: 25px;
        }

        

        .acoes {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-top: 10px;
            background-color: #f2f2f2;

            .icon-whatsapp {
                width: 25px;
                height: 25px;
                cursor: pointer;
                padding: 2px;
                border-radius: 4px;
                box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.4);

                &:hover {
                    transform: scale(1.1);
                }
            }

            .icon {
                width: 25px;
                height: 25px;
                cursor: pointer;
                padding: 2px;
                border-radius: 4px;
                box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.4);

                &:hover {
                    transform: scale(1.1);
                }
            }
        }

        .icon-card {
            height: 35px;
        }
    }

`