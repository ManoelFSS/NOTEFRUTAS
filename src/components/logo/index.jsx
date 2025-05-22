import { Image } from "./styles"
import LogoTipo from "../../assets/perfil.png"
// context 
import { useAuthContext } from "../../context/AuthContext"

const Logo = ({$width}) => {

    const { user } = useAuthContext();

    return (
        <Image 
            $width={$width}
            src={user?.urlPhoto ? user?.urlPhoto : LogoTipo}
            alt="Logo tipo do Trin-Flow, uma ingrenagem com grafico de financas em 2d" 
        />
    )
}

export default Logo
