import React, { useState, useEffect } from 'react'
// components
import FormLayout from "../../formLayout"
import BtnSubmit from "../../../btns/btnSubmit"
import BtnNavigate from "../../../btns/btnNavigate"
import Title from "../../../title"
import InputComponent from "../../../inputComponent"
import LabelComponent from "../../../labelComponent"
import Loading from "../../../loading"
// hooks
import useFormValue from "../../../../hooks/useFormValue"
// context
import { useAuthContext } from "../../../../context/AuthContext"
// services
import { sendEmail, gerarCodigo } from "../../../../services/emailService"

const Password_Recovery = ({setSelectForm}) => {

    const { loading, setMessege, setLoading } = useAuthContext();
    const { email, setEmail, password, setPassword, codigo, setCodigo } = useFormValue();

    const [simulaApi, setSimulaApi] = useState(false)
    const [isDisabledBtn, setIsDisabledBtn] = useState(false);
    const [coutTime, setCountTime] = useState(240)
    const [controlerTime, setControlerTime] = useState(false)
    const [fromPassword, setFromPassword] = useState(true)
    const [validaCodigo, setValidaCodigo] = useState(null)

    // Função para enviar email, gerar codigo, e controlae campos do formulario
    const handleFormUpdate = async () => {
        
        const codigoGerado = await gerarCodigo();
        
        const result = await sendEmail(email, codigoGerado, setMessege, setLoading);
        if (!result.success) {
            setMessege({success: false, title: result.title, message: result.message});
            return
        }

        setValidaCodigo(codigoGerado)
        localStorage.setItem("email", email);
        setSimulaApi(true);
        setIsDisabledBtn(true);
        setControlerTime(!controlerTime)
        
    };

    // Função para verificar codigo
    const hendleInpassword = () => {
        setLoading(true);
        if (validaCodigo !== codigo){
            setTimeout(() => {
                setMessege({success: false, title: "Codigo Invalido", message: "Verifique o Codigo e Tente Novamente"});
                setLoading(false);
                return console.log("Codigo Invalido");
            }, 2000);
        }else{
            setTimeout(() => {
                setFromPassword(false) 
                setLoading(false);
            }, 2000);
        }
    }
    
    useEffect(() => {
        if (simulaApi) {
            const interval = setInterval(() => {
                setCountTime((prevCount) => {
                    if (prevCount === 0) {
                        clearInterval(interval);
                        setIsDisabledBtn(false);
                        return 240; // Reseta o contador
                    }
                    return prevCount - 1;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [simulaApi, controlerTime]);


    return (
        <FormLayout>
            <section className="logo">
                <Title $text="Redefinir senha"  $cor={"var(  --color-text-primary )"}  />
            </section>
            { fromPassword && 
                <>
                    <section className="box">
                        <LabelComponent $text="Email" $htmlFor="email" />
                        <InputComponent 
                            $typeText="email" 
                            $textId="email"
                            $value={email}
                            $onchange={(e) => setEmail(e.target.value.trim())} 
                            $name="email" 
                            $placeholder="Digite seu email" 
                            $autoComplete="current-email" 
                            $required 
                        />
                    </section>
                    <BtnSubmit 
                        $typeText="button"
                        $text={simulaApi ? ` Reenviar Codigo` : 'Enviar Codigo'}
                        $marginTop="1vh"
                        onClick={() => handleFormUpdate() } 
                        $disabled={isDisabledBtn}
                        $opacity={isDisabledBtn}
                        $timer={coutTime}
                    /> 
                    
                    { simulaApi && 
                        <>
                            <p className="text"> Por Favor Verifique seu Email, envianos um codigo</p>
                            <section className="box">
                                <LabelComponent $text="Codigo" $htmlFor="codigo" />
                                <InputComponent 
                                    $typeText="text" 
                                    $textId="codigo"
                                    $value={codigo}
                                    $onchange={(e) => setCodigo(e.target.value.trim())} 
                                    $name="codigo" 
                                    $placeholder="Digite o Codigo" 
                                    $autoComplete="current-text" 
                                    $required 
                                />
                                <BtnSubmit 
                                    $typeText="button"
                                    $text="Verificar Codigo"
                                    $marginTop="1.5vh" 
                                    onClick={() =>  hendleInpassword()}
                                />
                            </section>
                        </>
                    }
                </>
            }

            {!fromPassword && 
                <>
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
                    </section>
                    <section className="box">
                        <BtnSubmit 
                            $typeText="submit"
                            $text="Alterar Senha"
                            $marginTop="1.5vh" 
                            onClick={() =>  hendleInpassword() }
                        />
                    </section>
                </>
            }
            <section className="btns">
                {!simulaApi && 
                    <BtnNavigate 
                        $text="Cadastre-se"
                        onClick={() => setSelectForm("register")} 
                    />
                }
                <BtnNavigate 
                    $text="Fazer Login" 
                    onClick={() => setSelectForm("login")}
                />
            </section>
            
            {loading && <Loading />}
        </FormLayout>
    )
}

export default Password_Recovery
