import { useState } from "react"
import { Container } from "./styles"
// componenmts
import Header from "../../../components/header"
import Menu from "../../../components/menu"
import Messege from "../../../components/messege"
import ModalAlert from "../../../components/modalAlert"
// context 
import { useAuthContext } from "../../../context/AuthContext"
import { useLogs } from "../../../context/LogContext"

const Layout = ({children, $setToogleMenu, $toogleMenu}) => {
    
    const { messege, selectForm, setSelectForm, setMessege } = useAuthContext();
    const { logs } = useLogs()

    const [showModalAlert, setShowModalAlert] = useState(false);

    return (
        <Container $toogleMenu={$toogleMenu} >
            <section className="sidebar" >
                <Menu $setToogleMenu={$setToogleMenu}  />
            </section>
            <section className="content">
                <Header 
                    $setToogleMenu={$setToogleMenu} 
                    $toogleMenu={$toogleMenu} 
                    $alert={logs} 
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
                $alert={logs}
            />
        </Container>
    )
}

export default Layout
