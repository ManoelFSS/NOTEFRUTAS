import { useState, useEffect } from "react"
import { Container } from "./styles"
import  FormLayout from "../../formLayout"
import Title from "../../../title"
import BtnSubmit from "../../../btns/btnSubmit"
import BtnNavigate from "../../../btns/btnNavigate"
import Loading from "../../../loading"
import Search from "../../../search"
// icons
import { FaWindowClose } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa6";
// context
import { useClientes } from "../../../../context/ClientesContext"
import { useProduct } from "../../../../context/ProductContext"
import { useAuthContext } from "../../../../context/AuthContext"

const  VendasForm = ({setModalVendas, btnName, setBtnName, $color}) => {

    const {userId} = useAuthContext();
    const {product, setProduct, buscarProductPorAdmin} = useProduct();
    const [modalProduct, setModalProduct] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [visibleInputs, setVisibleInputs] = useState(false);


    const {
        loading,
        name, setName,
        phone, setPhone,
        cpf, setCpf,
        city, setCity,
        estado, setEstado,
        formaDEPagamento, setFormaDEPagamento,
        itensVenda, setItensVenda,
        dataDeRecebimento, setDataDeRecebimento,
        status_pagamento, setStatus_pagamento,
        valorDaEntrada, setValorDaEntrada,
        valorTotalDaVenda, setValorTotalDaVenda,
        valorRestante, setValorRestante,
        valorRecebido, setValorRecebido,
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
                valorTotal: ""
            }
        ]);
        setModalProduct(false)
        
    }

    function removerProduto(produtoId) {
        setItensVenda(prev => prev.filter(item => item.produtoId !== produtoId));
    }

    // Função para formatar valor para moeda brasileira
    const formatarParaMoeda = (valorEmCentavos) => {
        const numero = Number(valorEmCentavos) / 100;

        return numero.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    };

    // Ex: useEffect para atualizar o valor restante sempre que mudar entrada ou itens
    useEffect(() => {
         // Atualiza o valor recebido em reais
        // setValorRecebido(Number(valorDaEntrada.replace(/\D/g, "")) / 100 || 0);
        console.log(valorDaEntrada)
        
        const totalVenda = itensVenda.reduce((acc, item) => acc + (item.valorTotal || 0), 0);
        setValorTotalDaVenda(totalVenda);

        const entrada = Number(valorDaEntrada.replace(/\D/g, "")) / 100 || 0; // Converte para centavos
        const restante = totalVenda - entrada;
        setValorRestante(restante);
    }, [valorDaEntrada, itensVenda]);

    useEffect(() => {
        console.log(itensVenda)
    }, [itensVenda])

    useEffect(() => {
        const hendlerGetProduct = async () => {
            const produData = await  buscarProductPorAdmin(userId, 1000, 1);
            if(produData.length === 0) setTimeout(() => setDataNotFound(true), 2000);
            setProduct(produData)
        }
        hendlerGetProduct();
        
        if (formaDEPagamento === "A prazo") {
            setVisibleInputs(true);
            setStatus_pagamento("Pendente");
        }

    }, []);

    return (
        <Container>
            <div className="form-area">
                <FormLayout state={estado} $color={$color}>
                    <div className="close">
                        <FaWindowClose className="close-icon" 
                            onClick={() => {
                                setModalVendas(false)    
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
                    </section>
                    <section className="box-products">
                        <ul className="header-list">
                            <li>Produto</li>
                            <li>Qnt</li>
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
                                                    const novaQuantidade = valorDigitado === "" ? "" : Number(valorDigitado);
                                                    const itemAtual = copia[index];
                                                    itemAtual.quantidade = novaQuantidade;
                                                    itemAtual.valorTotal = novaQuantidade * (itemAtual.valorUnitario || 0);
                                                    return copia;
                                                });
                                            }}
                                        />
                                    </li>

                                    <li>
                                        <input
                                            type="text"
                                            value={item.valorUnitario?.toLocaleString("pt-BR", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            }) || ""}
                                            onChange={e => {
                                                const entrada = e.target.value;
                                                const numeros = entrada.replace(/\D/g, "");

                                                setItensVenda(prev => {
                                                    const copia = [...prev];
                                                    const itemAtual = copia[index];
                                                    
                                                    if (numeros === "") {
                                                        itemAtual.valorUnitario = 0;
                                                        itemAtual.valorTotal = (itemAtual.quantidade || 0) * 0;
                                                    } else {
                                                        const valorNumerico = Number(numeros) / 100;
                                                        itemAtual.valorUnitario = valorNumerico;
                                                        itemAtual.valorTotal = (itemAtual.quantidade || 0) * valorNumerico;
                                                    }      
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
                        <p>Total</p> 
                        <span>
                            {itensVenda
                                .reduce((acc, item) => acc + (item.valorTotal || 0), 0)
                                .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                            }
                        </span>
                    </div>
                    <BtnNavigate 
                        $text="Adicionar Produto"  
                        onClick={() => setModalProduct(true)}
                    />
                    <div className="payment-area">
                        <h5>Forma de Pagamento</h5>
                        <div className="radio-area">
                            <div>
                                <input 
                                    defaultChecked={formaDEPagamento === "A vista" ? true : false}
                                    type="radio" 
                                    name="payment" 
                                    onClick={() => {
                                        setVisibleInputs(false)
                                        setFormaDEPagamento("A vista")
                                        setStatus_pagamento("Pago")
                                    }}
                                />
                                <label htmlFor="true">A Vista</label>
                            </div>
                            <div>
                                <input 
                                    defaultChecked={formaDEPagamento === "A prazo" ? true : false}
                                    type="radio" 
                                    name="payment"
                                    onClick={() => {
                                        setVisibleInputs(true)
                                        setFormaDEPagamento("A prazo")
                                        setStatus_pagamento("Pendente")
                                    }}
                                />
                                <label htmlFor="false">A Prazo</label>
                            </div>
                        </div>

                    </div>
                    {visibleInputs && 
                        <>
                        <div className="inputs-area">
                            <div>
                                <h4>Valor recebido</h4>
                                <input 
                                    type="text" 
                                    value={formatarParaMoeda(valorDaEntrada)}
                                    placeholder="Entrada" 
                                    onChange={(e) => {
                                        const entrada = e.target.value.replace(/\D/g, ""); // remove tudo que não for número
                                        setValorDaEntrada(entrada);
                                        setValorRecebido(Number(entrada) / 100); // aqui garantimos que seja numérico
                                    }}
                                />
                            </div>

                            <div>
                                <h4>Valor restantes</h4>
                                <p style={{ fontWeight: "bold", color: valorRestante === 0 ? "green" : "red" }}>
                                    {valorRestante.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </p>
                            </div>

                        </div>
                        <div className="date">
                            <label htmlFor="">Data do Recebimento</label>
                            <input 
                                type="date" 
                                value={dataDeRecebimento}
                                onChange={(e) => setDataDeRecebimento(e.target.value)}
                            />
                        </div>
                        </>
                    }
                    
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
