import styled from "styled-components";

export const Container = styled.div`
    width: 245px;
    height: 435px;
    border-radius: 6px;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background-color:rgb(226, 226, 226);
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.4);

    .headerCard {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;

        img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
        }
    }

    .bodyCard {
        width: 100%;

        h3 {
            display: inline-block;
            padding-left: 5px;
            padding-bottom: 5px;
            font-size: 0.7rem;
            font-weight: 900;
        }

        p {
            font-size: 0.7rem;
            font-weight: 500;
            padding: 4px 8px;
            background-color: #f2f2f2;
            color: #000;
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
    }

`