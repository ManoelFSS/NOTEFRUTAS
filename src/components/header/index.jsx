import {useEffect, useState} from "react"
import  { Container_header } from "./styles"
// components
import Logo from "../../assets/logo.png"
import  Title from "../../components/title"
import Btn from "../../components/btns/btnSubmit"
// icons
import { IoMenu, IoArrowUndo, IoToggle } from "react-icons/io5";
import { VscBellDot } from "react-icons/vsc";

// context
import { useAuthContext } from "../../context/AuthContext"
import {useLogs} from '../../context/LogContext'

const Header = ({$setToogleMenu, $toogleMenu, $showModalAlert, $setShowModalAlert,}) => {

    const { logs } = useLogs()
    const [cauntAlertAtive, setCauntAlertAtive] = useState(localStorage.getItem('cauntAlertAtive') || 0)


    const { logoutUser } = useAuthContext()

    useEffect(() => {  
        if(logs.length === 0){
            localStorage.setItem('cauntAlertAtive', 0)
            return
        }
        localStorage.setItem('cauntAlertAtive', cauntAlertAtive - 1)
        setCauntAlertAtive(cauntAlertAtive - 1)
    }, [logs]);

    return (
        <Container_header 
            $toogleMenu={$toogleMenu} 
            $alert={logs.length}
        > 
            <IoMenu className="menu" onClick={() => $setToogleMenu(!$toogleMenu)} />
            
            <div className="title">
                <img src={Logo} alt="logo" />
                <Title 
                    $text="NOTE FRUTAS" 
                    $cor={"var( --color-text-primary )"} 
                    $bord={"none"}
                    padd={"0"}
                    
                />
            </div>
            <div className="box_right">
                <div className="notification">
                    <VscBellDot 
                        className={ logs.length > cauntAlertAtive ? "icon-notification" : "icon-alert"}
                        onClick={() => { 
                            $setShowModalAlert(!$showModalAlert )
                            setCauntAlertAtive( logs.length + 1)     
                            localStorage.setItem('cauntAlertAtive', logs.length + 1 )
                        }}
                    />
                </div>
                <div className="exit">
                    <IoArrowUndo className="icon" />
                    <Btn 
                        $text="Sair"
                        onClick={logoutUser}
                    />
                </div>
            </div>
        </Container_header>
    )
}

export default Header
