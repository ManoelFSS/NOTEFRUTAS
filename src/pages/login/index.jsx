import { Container_login} from "./styles";
//components
import Logo from "../../assets/logo.png"
import LoginForm from "../../components/forms/userForm/loginForm"
import Register from "../../components/forms/userForm/register"
import Password_Recovery from "../../components/forms/userForm/password_recovery"
import Messege from "../../components/messege";
// context
import { useAuthContext } from "../../context/AuthContext";
// icons
import { FaWhatsapp, FaInstagram  } from "react-icons/fa";

const Login = () => {
    const { messege, setMessege, selectForm, setSelectForm } = useAuthContext();
    
    return (
        <Container_login>
            <section className="box-left">
                <div className="box-container">
                    <img src={Logo} alt="logo"/>
                    <h1>NOTE FRUTAS</h1>
                    <p>Tudo que sua Empresa precisa.</p>
                    <div className="icons">
                        <FaWhatsapp className="whatsapp" onClick={() => window.open('https://wa.me/5574935050160', '_blank')} />
                        {/* <FaFacebook className="facebook" onClick={() => window.open('https://www.facebook.com/manoel.fernando.50', '_blank')} /> */}
                        <FaInstagram className="instagram" onClick={() => window.open('https://www.instagram.com/manoelfernandoplk/', '_blank')} />
                    </div>
                </div>
            </section>
            <section className="box-right">
                <div className="box-blu">
                    { selectForm === "login" && <LoginForm  setSelectForm={setSelectForm}/>}
                    { selectForm === "register" && <Register  setSelectForm={setSelectForm} /> }
                    { selectForm === "password" && <Password_Recovery  setSelectForm={setSelectForm} />}
                    { messege && <Messege $setMessege={setMessege} $buttonText="OK" $title={messege.title} $text={messege.message} /> }
                </div>
                <p className="copyright"> © 2025 Trin-Codex - Todos os direitos reservados.</p>
            </section>
        </Container_login>
    )
}

export default Login;
