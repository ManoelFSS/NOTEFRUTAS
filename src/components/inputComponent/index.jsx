import { useState } from "react"
import {Container,  Input } from "./styles"
import { IoMdInformationCircleOutline } from "react-icons/io";
import { AiOutlineCheck } from "react-icons/ai";
import { FaEye, FaEyeSlash  } from "react-icons/fa";
// context 
import { useAuthContext } from "../../context/AuthContext";

const InputComponent = (
    {
        $typeText, 
        $placeholder, 
        $textId, 
        $name, 
        $autoComplete, 
        $value,
        $onchange,
        $required,
        $width,
        $min
    }) => {

    const { selectForm } = useAuthContext();
    const [showPassword, setShowPassword] = useState(true);

    // Estado para armazenar quais critérios foram atendidos
    const [passwordCriteria, setPasswordCriteria] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
    });

    // Função para verificar os critérios da senha
    const validatePassword = (password) => {
        setPasswordCriteria({
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            specialChar: /[!@#$%^&*]/.test(password),
        });
    };

    // Função que será chamada no onChange
    const handleChange = (e) => {
        const newPassword = e.target.value;
        validatePassword(newPassword);
        $onchange(e); // Passa o evento para a função recebida por props
    };


    return (
        <Container>
            <Input 
                type={$typeText === "password" ? showPassword ? $typeText : "text" : $typeText} 
                id={$textId} 
                name={$name} 
                placeholder={$placeholder} 
                autoComplete={$autoComplete}
                value={$value}
                onChange={handleChange}
                required={$required}
                className="checkd"
                style={{width: $width}}
                min={$min}
            />
            {$typeText === "password" && 
                <>
                    { showPassword ? (
                            <FaEyeSlash 
                                className="icon"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        ) : (
                            <FaEye 
                                className="icon" 
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        )
                    }
                    { selectForm !== "login"  && <IoMdInformationCircleOutline className="icon-info" />}
                    { selectForm !== "login" &&
                        <div className="info-balloon">
                            <h4>A Senha deve conter:</h4>
                            <p><span>8</span>  caracteres no mínimo {passwordCriteria.length && <AiOutlineCheck className="check-required" />}</p>
                            <p><span>1</span> letra maiúscula {passwordCriteria.uppercase && <AiOutlineCheck className="check-required" />}</p>
                            <p><span>1</span> letra minúscula {passwordCriteria.lowercase && <AiOutlineCheck className="check-required" />}</p>
                            <p><span>1</span> número {passwordCriteria.number && <AiOutlineCheck className="check-required" />}</p>
                            <p><span>1</span> caractere especial [ !@#$%^&* ] {passwordCriteria.specialChar && <AiOutlineCheck className="check-required" />}</p>
                        </div>
                    }
                </> 
            }
        </Container>
    )
}

export default InputComponent
