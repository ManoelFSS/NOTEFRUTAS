import { All_loading } from "./styles"
import Logo from "../../assets/carrinho.png"
import Loading from "../loading"

const Loadingpage = () => {
    return (
        <All_loading> 
            <img src={Logo} alt="logo" />
            <Loading /> 
        </All_loading>
    )
}

export default Loadingpage
