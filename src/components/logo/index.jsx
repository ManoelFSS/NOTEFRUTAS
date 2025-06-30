import { Image } from "./styles"
import LogoTipo from "../../assets/perfil.png"

const Logo = ({$width, photo}) => {

    return (
        <Image 
            $width={$width}
            src={photo ? photo : LogoTipo}
            alt="Logo tipo do Trin-Flow, uma ingrenagem com grafico de financas em 2d" 
        />
    )
}

export default Logo
