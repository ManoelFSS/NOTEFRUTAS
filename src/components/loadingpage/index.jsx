import { All_loading } from "./styles"
import Logo from "../../assets/carrinho.png"
import Loading from "../loading"

const Loadingpage = () => {
    return (
        <All_loading> 
            <section className="logo-area">
                <img src={Logo} alt="logo" />
            </section>
            <Loading /> 
        </All_loading>
    )
}

export default Loadingpage
