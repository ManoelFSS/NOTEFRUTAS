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

const Header = ({$setToogleMenu, $toogleMenu, $showModalAlert, $setShowModalAlert, $}) => {

    const { logs } = useLogs()
    console.log(logs)
    const { logoutUser } = useAuthContext()

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
                        className={logs.length > 0 ? "icon-notification" : "icon-alert"}
                        onClick={() => $setShowModalAlert(!$showModalAlert )}
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
