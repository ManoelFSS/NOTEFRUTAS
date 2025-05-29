import { useState } from "react"
import { Container } from "./styles"
import  FormLayout from "../../formLayout"
import Title from "../../../title"
import InputComponent from "../../../inputComponent"
import LabelComponent from "../../../labelComponent"
import BtnSubmit from "../../../btns/btnSubmit"
import Loading from "../../../loading"
import Select from "../../../select"

// icons
import { FaWindowClose } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
// context
import { useClientes } from "../../../../context/ClientesContext"


const data = [
    { category: "Acre" },
    { category: "Alagoas" },
    { category: "Amapá" },
    { category: "Amazonas" },
    { category: "Bahia" },
    { category: "Ceará" },
    { category: "Distrito Federal" },
    { category: "Espírito Santo" },
    { category: "Goiás" },
    { category: "Maranhão" },
    { category: "Mato Grosso" },
    { category: "Mato Grosso do Sul" },
    { category: "Minas Gerais" },
    { category: "Pará" },
    { category: "Paraíba" },
    { category: "Paraná" },
    { category: "Pernambuco" },
    { category: "Piauí" },
    { category: "Rio de Janeiro" },
    { category: "Rio Grande do Norte" },
    { category: "Rio Grande do Sul" },
    { category: "Rondônia" },
    { category: "Roraima" },
    { category: "Santa Catarina" },
    { category: "São Paulo" },
    { category: "Sergipe" },
    { category: "Tocantins" }
];

const  ClientForm = ({setCloseModal, btnName, setBtnName}) => {

    const {
        loading,
        name, setName,
        phone, setPhone,
        cpf, setCpf,
        city, setCity,
        estado, setEstado,
        messege, setMessege,
    } = useClientes();

    const [select, setSelect] = useState(estado);

    const handlePhoneChange = (event) => {
        const { value } = event.target;
        const formattedPhone = formatPhoneNumber(value);
        setPhone(formattedPhone);
    };
    
    function formatPhoneNumber(value) {
        // Remove qualquer caractere não numérico
        const cleanedValue = value.replace(/\D/g,'');
        // Se o valor estiver vazio, retorne uma string vazia
        if (cleanedValue.length === 0) {
            return '';
        }
        // Verifica a quantidade de números e aplica a formatação
        if (cleanedValue.length <= 2) {
            return `(${cleanedValue}`;
        } else if (cleanedValue.length <= 7) {
            return `(${cleanedValue.slice(0, 2)})${cleanedValue.slice(2)}`;
        } else {
            return `(${cleanedValue.slice(0, 2)})${cleanedValue.slice(2, 7)}-${cleanedValue.slice(7, 11)}`;
        }
    }


    return (
        <Container>
            <div className="form-area">
                <FormLayout state={estado}>
                    <div className="close">
                        <FaWindowClose className="close-icon" 
                            onClick={() => {
                                setCloseModal(false)    
                                setBtnName("Cadastrar")
                                setName("")
                                setPhone("")
                                setCpf("")
                                setCity("")
                                setEstado("Escolha o Estado")
                            }}
                        />
                    </div>
                    <section className="logo">
                        <FaUserPlus className="icon" />
                        <Title $text="CLIENTE"  $cor={"var(  --color-text-primary )"}  />
                    </section>
                    <section className="box">
                        <LabelComponent $text="Nome" $htmlFor="name" />
                        <InputComponent 
                            $typeText="text" 
                            $textId="name" 
                            $value={name} 
                            $onchange={(e) => setName(e.target.value.trim())}
                            $name="name" 
                            $placeholder="Digite o nome do cliente" 
                            $autoComplete="current-name" 
                            $required 
                        />
                    </section>
                    <section className="box">
                        <LabelComponent $text="CPF | CNPJ" $htmlFor="cpf" />
                        <InputComponent 
                            $typeText="text" 
                            $textId="cpf" 
                            $value={cpf} 
                            $onchange={(e) => setCpf(e.target.value.trim())}
                            $name="cpf" 
                            $placeholder="Ex: 12345678900" 
                            $autoComplete="current-number" 
                        />
                    </section>
                    <section className="box">
                        <LabelComponent $text="telefone" $htmlFor="phone" />
                        <InputComponent 
                            $typeText="phone" 
                            $textId="phone" 
                            $value={phone} 
                            $onchange={handlePhoneChange}
                            $name="phone" 
                            $placeholder="Ex: (00) 00000-0000" 
                            $autoComplete="current-tel" 
                            $required 
                        />
                    </section>
                    <section className="box">
                        <LabelComponent $text="Cidade" $htmlFor="city" />
                        <InputComponent 
                            $typeText="text" 
                            $textId="city" 
                            $value={city} 
                            $onchange={(e) => setCity(e.target.value.trim())}
                            $name="city" 
                            $placeholder="Ex: Juazeiro" 
                            $autoComplete="current-text" 
                            $required 
                        />
                    </section>
                    <section className="box">
                        <LabelComponent $text="Estado" $htmlFor="uf" />
                        <Select     
                            select={select} 
                            setSelect={setSelect}
                            data={data} 
                            $width={"100%"}
                            $ocult={true}
                            setState={setEstado}
                        />
                    </section>
                    <BtnSubmit $marginTop="20px" $text={btnName}/>
                    {loading && <Loading $marginBottom="10px" />}
                </FormLayout>
            </div>
        </Container>
    )
}

export default ClientForm
