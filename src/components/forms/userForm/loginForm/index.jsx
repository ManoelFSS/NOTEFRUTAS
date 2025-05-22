// components
import FormLayout from "../../formLayout"
import BtnSubmit from "../../../btns/btnSubmit"
import BtnNavigate from "../../../btns/btnNavigate"
import Title from "../../../title"
import InputComponent from "../../../inputComponent"
import LabelComponent from "../../../labelComponent"
import Loading from "../../../loading"
// context
import { useAuthContext } from "../../../../context/AuthContext"
// hooks
import useFormValue from "../../../../hooks/useFormValue"
//icons
import { PiKeyFill } from "react-icons/pi";


const LoginForm = ({setSelectForm}) => {

    const { loading } = useAuthContext();
    const { email, setEmail, password, setPassword } = useFormValue();

    return (
        <FormLayout >
            <section className="logo">
                <Title $text="Login"  $cor={"var(  --color-text-primary )"}  />
            </section>
            <section className="box">
                <LabelComponent $text="Email" $htmlFor="email" />
                <InputComponent 
                    $typeText="email" 
                    $textId="email" 
                    $value={email} 
                    $onchange={(e) => setEmail(e.target.value.trim())}
                    $name="email" 
                    $placeholder="Exemplo@gmail.com" 
                    $autoComplete="current-email" 
                    $required 
                />
            </section>
            <section className="box">
                <LabelComponent $text="Senha" $htmlFor="senha" />
                <InputComponent 
                    $typeText="password" 
                    $textId="senha" 
                    $value={password} 
                    $onchange={(e) => setPassword(e.target.value.trim())}
                    $name="senha" 
                    $placeholder="Digite sua  Senha" 
                    $autoComplete="current-password"
                    $required 
                />
                <p className="forgot-password" onClick={() => setSelectForm("password")}>
                    <PiKeyFill className="icon" />
                    Esqueci minha senha
                </p>
            </section>
            <section className="btns">
                <BtnSubmit $text="Entrar" />
                <BtnNavigate 
                    $text="Registre-se" 
                    onClick={() => setSelectForm("register")}
                />
            </section>
            {loading && <Loading />}
        </FormLayout>
    )
}

export default LoginForm
