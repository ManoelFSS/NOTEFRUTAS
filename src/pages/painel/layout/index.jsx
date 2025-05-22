import { useState } from "react"
import { Container } from "./styles"
// componenmts
import Header from "../../../components/header"
import Menu from "../../../components/menu"
import Messege from "../../../components/messege"
import ModalAlert from "../../../components/modalAlert"
// context 
import { useAuthContext } from "../../../context/AuthContext"

const Layout = ({children, $setToogleMenu, $toogleMenu}) => {
    
    const { messege, selectForm, setSelectForm, setMessege } = useAuthContext();
    const [showModalAlert, setShowModalAlert] = useState(false);
    
    const [alert, setAlert] = useState(
        [
            {
                id: 1,
                creatDate: "2025-04-21T10:00:00",
                menssage: " O caminhão de problema no motor! ",
                name: "Manoel",
                userId: 1,
            },
            {
                id: 2,
                creatDate: "2025-04-21T10:00:00",
                menssage: " O motor do forno  de 30cv queimou! ",
                name: "Matheus",
                userId: 1,
            },
            {
                id: 3,
                creatDate: "2025-04-21T10:00:00",
                menssage: " Lorem ipsum accumsan ante inceptos dui dictum lobortis, ut accumsan euismod nisi sed orci est, elementum primis tellus suspendisse torquent nunc. gravida tempor hac iaculis duis porta quam phasellus",
                name: "Felipe",
                userId: 1,
            },
            {
                id: 4,
                creatDate: "2025-04-21T10:00:00",
                menssage: " Lorem ipsum accumsan ante inceptos dui dictum lobortis, ut accumsan euismod nisi sed orci est, elementum primis tellus suspendisse torquent nunc. gravida tempor hac iaculis duis porta quam phasellus",
                name: "Caio",
                userId: 1,
            },
            {
                id: 5,
                creatDate: "2025-04-21T10:00:00",
                menssage: " Lorem ipsum accumsan ante inceptos dui dictum lobortis, ut accumsan euismod nisi sed orci est, elementum primis tellus suspendisse torquent nunc. gravida tempor hac iaculis duis porta quam phasellus",
                name: "Samuel",
                userId: 1,
            },
            {
                id: 1,
                creatDate: "2025-04-21T10:00:00",
                menssage: " O Britador deu problema no motor! ",
                name: "Jhone",
                userId: 1,
            },
        ]);
        
    return (
        <Container $toogleMenu={$toogleMenu} >
            <section className="sidebar" >
                <Menu />
            </section>
            <section className="content">
                <Header 
                    $setToogleMenu={$setToogleMenu} 
                    $toogleMenu={$toogleMenu} 
                    $alert={alert} 
                    $showModalAlert={showModalAlert}
                    $setShowModalAlert={setShowModalAlert}
                />
                <div className="main">
                    {children}
                </div>
            </section>
            { messege && <Messege $title={messege.title} $text={messege.message} $buttonText ="OK" $setMessege={setMessege} /> }
            <ModalAlert 
                $showModalAlert={showModalAlert}
                $alert={alert}
            />
        </Container>
    )
}

export default Layout
