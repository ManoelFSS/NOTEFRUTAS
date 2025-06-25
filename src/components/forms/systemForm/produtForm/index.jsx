import { useState, useEffect, use, } from "react"
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
import { FaUserPlus, } from "react-icons/fa";
// context
import { useProduct } from "../../../../context/ProductContext"
import { set } from "mongoose"

const  ProductForm = ({setCloseModal, btnName, setBtnName, $color}) => {

    const { loading, images, setImages } = useProduct ();
    const [imagens, setImagens] = useState([]);
    const [visiblePeso, setVisiblePeso] = useState(false);
    
    
    const {
        category, 
        setCategory, 
        description, 
        setDescription, 
        name, 
        setName,
        setState,
        tipoDeVenda, setTipoDeVenda,
        pesoMedio, setPesoMedio,
    } = useProduct();

    const [select, setSelect] = useState(category);

    console.log( tipoDeVenda )


    const url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ1Zx0zi5m3O4aBpmqUiaTUnoTmTGOPe2Qj4mbGaOysw_pOKK-u4LEfdukorH_AzWr2wA&usqp=CAU";

    useEffect(() => {
        if (!name || images.length === 0) return;
        const itemList = images[0].images || []; // isso depende da estrutura dos dados
        const itemFilter = itemList.filter((item) =>
            removerAcentos(item.name).includes(removerAcentos(name))
        );
        
        if (itemFilter.length === 0 ) return setImagens(url)
        // Ou se quiser apenas a URL da primeira imagem encontrada:
        setImagens([itemFilter[0].url_image]);
    }, [name, images]);

    function removerAcentos(texto) {
        return texto
            .normalize("NFD") // Normaliza caracteres latinos com acento
            .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
            .toLowerCase(); // Deixa minúsculo
    }

    

const data = [
    { category: "Frutas" },
    { category: "Legumes" },
    { category: "Verduras" },
    { category: "Raízes" },
    { category: "Grãos e Cereais" },
    { category: "Ervas e Temperos" },
];

    return (
        <Container >
            <div className="form-area">
                <FormLayout $color={$color}>
                    <div className="close">
                        <FaWindowClose className="close-icon" 
                            onClick={() => {
                                setCloseModal(false)
                                setBtnName("Cadastrar");
                                setName('');
                                setDescription('');
                                setCategory('Escolha uma categoria');
                            }}
                        />
                    </div>
                    <section className="logo">
                        <FaUserPlus className="icon" />
                        <Title $text="PRODUTO"  $cor={"var(  --color-text-primary )"}  />
                    </section>
                    <div className="image">
                        <img  src={imagens.length === 0 ? url : imagens} alt="aa" />
                        <InputComponent 
                            $typeText="hidden" 
                            $textId="img" 
                            $value={imagens.length <= 0 ? url : imagens} 
                            $name="img" 
                        />
                    </div>
                    <section className="box">
                        <LabelComponent $text="Nome" $htmlFor="name" />
                        <InputComponent 
                            $typeText="text" 
                            $textId="name" 
                            $value={name} 
                            $onchange={(e) => setName(e.target.value)}
                            $name="name" 
                            $placeholder="Digite o nome do produto" 
                            $autoComplete="current-name"
                            $required 
                        />
                    </section>
                    <section className="box">
                        <LabelComponent $text="Descrição" $htmlFor="description" />
                        <InputComponent 
                            $typeText="text" 
                            $textId="description" 
                            $value={description} 
                            $onchange={(e) => setDescription(e.target.value)}
                            $name="description" 
                            $placeholder="Digite a descrição do produto" 
                            $autoComplete="current-description" 
                        />
                    </section>
                    <section className="box">
                        <LabelComponent $text="Categoria" $htmlFor="category" />
                        <Select     
                            select={select} 
                            setSelect={setSelect}
                            data={data} 
                            $width={"100%"}
                            $ocult={true}
                            setState={setCategory}
                        />
                    </section>

                    <section className="box">
                        <LabelComponent $text="Tipo de venda" />
                        <p style={{fontSize: "14px", paddingBottom: "5px"}}>Como será vendido para o cliente ?</p>
                        <section className="tipo-venda-area">
                            <div className="tipo-venda">
                                <input type="radio" 
                                    checked={tipoDeVenda === "kg"}
                                    value={tipoDeVenda}
                                    name="type-venda"
                                    onChange={() => { 
                                        setVisiblePeso(true)
                                        setTipoDeVenda("kg")
                                    }}
                                />
                                <label>Kg</label>
                            </div>
                            <div  className="tipo-venda">
                                <input type="radio" 
                                    checked={tipoDeVenda === "unidade"}
                                    name="type-venda"
                                    value={tipoDeVenda}
                                    required
                                    onChange={() => {
                                        setVisiblePeso(false)
                                        setTipoDeVenda("unidade")
                                    }}
                                />
                                <label>Unidade</label>
                            </div>
                            <div  className="tipo-venda">
                                <input type="radio" 
                                    checked={tipoDeVenda === "caixa"}
                                    name="type-venda"
                                    value={tipoDeVenda}
                                    required
                                    onChange={() => {
                                        setVisiblePeso(false)
                                        setTipoDeVenda("caixa")
                                    }}
                                />
                                <label>Caixa</label>
                            </div>
                            <div  className="tipo-venda">
                                <input type="radio" 
                                    checked={tipoDeVenda === "saco"}
                                    name="type-venda"
                                    value={tipoDeVenda}
                                    required
                                    onChange={() => {
                                        setVisiblePeso(false)
                                        setTipoDeVenda("saco")
                                    }}
                                />
                                <label>Saco</label>
                            </div>
                        </section>
                    </section>

                    { (visiblePeso || tipoDeVenda === "kg") &&
                        <section className="box peso-medio">
                            <LabelComponent $text="Peso medio" />
                            <p style={{fontSize: "14px", paddingBottom: "5px"}}>Informe o peso medio [ caixa, saco, unidade ]</p>
                            <div className="peso">
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={pesoMedio === "" ? "" : pesoMedio}
                                    className="quant"
                                    placeholder="Ex: 1.5"
                                    onChange={(e) => {
                                        const entrada = e.target.value.replace(",", "."); // aceita vírgula ou ponto
                                        if (entrada === "") {
                                        setPesoMedio(""); // permite apagar tudo
                                        } else {
                                            const numero = Number(entrada);
                                            if (!isNaN(numero)) {
                                                setPesoMedio(numero);
                                            }
                                        }
                                    }}
                                    required
                                />

                                <span>Kg</span>
                            </div>
                        </section>
                    }
                    
                    <BtnSubmit $marginTop="20px" $text={btnName}/>
                    {loading && <Loading $marginBottom="10px" />}
                </FormLayout>
            </div>
        </Container>
    )
}

export default ProductForm