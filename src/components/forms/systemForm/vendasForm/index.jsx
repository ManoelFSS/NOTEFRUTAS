import { useState } from "react"
import { Container } from "./styles"
import  FormLayout from "../../formLayout"
import Title from "../../../title"
import BtnSubmit from "../../../btns/btnSubmit"
import BtnNavigate from "../../../btns/btnNavigate"
import Loading from "../../../loading"
import Search from "../../../search"
import Select from "../../../select"
// icons
import { FaWindowClose } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa6";

// context
import { useClientes } from "../../../../context/ClientesContext"
import { useProduct } from "../../../../context/ProductContext"





const  VendasForm = ({setCloseModal, btnName, setBtnName, $color}) => {

    const {product} = useProduct();
    const [modalProduct, setModalProduct] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [itensVenda, setItensVenda] = useState([]);

    const {
        loading,
        name, setName,
        phone, setPhone,
        cpf, setCpf,
        city, setCity,
        estado, setEstado,
    } = useClientes();

    function adicionarProduto(produto) {
        const jaExiste = itensVenda.some(item => item.produtoId === produto.id);
        if (jaExiste) {
            alert("Produto já adicionado à venda!");
            return;
        }

        setItensVenda(prev => [
            ...prev,
            {
                produtoId: produto.id,
                nome: produto.name,
                quantidade: "",
                valorUnitario: "",
            }
        ]);
        setModalProduct(false)
    }

    function removerProduto(produtoId) {
        setItensVenda(prev => prev.filter(item => item.produtoId !== produtoId));
    }

    function formatarMoeda(valor) {
        const valorNumerico = valor.replace(/\D/g, '');
        const valorFormatado = (Number(valorNumerico) / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
        return valorFormatado;
    }

    function desformatarMoeda(valorFormatado) {
        return Number(valorFormatado.replace(/\D/g, '')) / 100;
    }

    return (
        <Container>
            <div className="form-area">
                <FormLayout state={estado} $color={$color}>
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
                        <FaCartPlus className="icon" />
                        <Title $text="VENDA"  $cor={"var(  --color-text-primary )"}  />
                    </section>
                    <section className="box">
                        <h4>Cliente</h4>
                        <p>{name}</p>
                        <p>{phone}</p>
                    </section>
                    <section className="box">
                    </section>
                    <section className="box-products">
                        <ul className="header-list">
                            <li>Produto</li>
                            <li>Quant</li>
                            <li>Val Unt</li>
                            <li>Val Total</li>
                            <li>#</li>
                        </ul>
                        <section className="body">
                            {itensVenda.map((item, index) => (
                                <ul key={index} className="body-list">
                                    <li>{item.nome}</li>
                                    <li>
                                        <input 
                                            type="number"
                                            value={item.quantidade}
                                            className="quant"
                                            onChange={e => {
                                                const valorDigitado = e.target.value;
                                                setItensVenda(prev => {
                                                    const copia = [...prev];
                                                    copia[index].quantidade = valorDigitado === "" ? "" : Number(valorDigitado);
                                                    return copia;
                                                });
                                            }}
                                        />
                                    </li>

                                    <li>
                                        <input
                                            type="text"
                                            value={item.valorFormatado || ""}
                                            onChange={e => {
                                                const entrada = e.target.value;
                                                // Remove tudo que não é número
                                                const numeros = entrada.replace(/\D/g, "");
                                                if (numeros === "") {
                                                    setItensVenda(prev => {
                                                        const copia = [...prev];
                                                        copia[index].valorUnitario = 0;
                                                        copia[index].valorFormatado = "";
                                                        return copia;
                                                    });
                                                    return;
                                                }
                                                const valorNumerico = Number(numeros) / 100;
                                                // Formata com separadores, mas sem "R$"
                                                const formatado = valorNumerico.toLocaleString("pt-BR", {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                });
                                                setItensVenda(prev => {
                                                    const copia = [...prev];
                                                    copia[index].valorUnitario = valorNumerico;
                                                    copia[index].valorFormatado = formatado;
                                                    return copia;
                                                });
                                            }}
                                        />      
                                    </li>

                                    <li className="total-item">
                                        {(item.quantidade * item.valorUnitario).toLocaleString("pt-BR", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </li>
                                    <li>
                                        <MdDeleteForever 
                                            className="delete-icon" 
                                            onClick={() => removerProduto(item.produtoId)}
                                        />
                                    </li>
                                </ul>
                            ))}
                        </section>
                    </section>
                    <div className="total-money">
                        <p>Total</p> <span>R$ 1200,00</span>
                    </div>
                    <BtnNavigate 
                        $text="Adicionar Produto"  
                        onClick={() => setModalProduct(true)}
                    />
                    <BtnSubmit $marginTop="20px" $text={btnName}/>
                    {loading && <Loading $marginBottom="10px" />}
                </FormLayout>
                {  modalProduct && <section className="modal-product">
                    <div className="search-area">
                        <Search 
                            valueSearch={valueSearch} 
                            setValueSearch={setValueSearch}
                            $height="40px"
                            $width="100%"
                        />
                    </div>
                    <section className="select-item-area">
                        {product.filter((item) => item.name.toLowerCase().includes(valueSearch.toLowerCase())).map((item, index) => (
                            <div 
                                className="item" key={index} 
                                onClick={() => {adicionarProduto(item)}}
                            >
                                <img src={item.url_image} alt="" />
                                <p>{item.name}</p>
                            </div>
                        ))}
                    </section>
                    <div className="btn-area">
                        <BtnNavigate $text="Cancelar"  
                            onClick={() => setModalProduct(false)}
                        />
                    </div>
                </section> }
            </div>
        </Container>
    )
}

export default VendasForm 
