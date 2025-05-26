import { useState, useEffect, use } from "react"
import { Container } from "./styles"
import  FormLayout from "../../formLayout"
import Title from "../../../title"
import BtnSubmit from "../../../btns/btnSubmit"
import BtnNavigate from "../../../btns/btnNavigate"
import Loading from "../../../loading"
import Search from "../../../search"
import Messege from "../../../messege"
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
    const [selectedTipyPayment, setSelectedTipyPayment] = useState('');
    const [messege, setMessege] = useState(null);

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
        tipoPagamento, setTipoPagamento,
        qtParcelas , setQtParcelas,
        tipoCobranca, setTipoCobranca
    } = useClientes();


    const handleClick = (value) => {
        if(valorRecebido <= 0 && formaDEPagamento === "A prazo") {
            setMessege({
                success: false,
                title: "❌ Ops! ",
                message:
                    `O valor recebido deve ser preenchido para escolher um tipo de Pagamento,  ou venda sem entrada.   
                `,
            });
            return
        }
        
        if (selectedTipyPayment === value) {
            setSelectedTipyPayment(""); // desmarca se já estiver selecionado
        } else {
            setSelectedTipyPayment(value);
        }
    };

    const handleFormaDePagamentoClick = (value) => {
        setFormaDEPagamento(value);
    };

    const handleTipoDeCobrancaClick = (value) => {
        setTipoCobranca(value);
    };

    useEffect(() => {
        console.log(selectedTipyPayment);
    }, [selectedTipyPayment]);


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
        const totalVenda = itensVenda.reduce((acc, item) => acc + (item.valorTotal || 0), 0);
        setValorTotalDaVenda(totalVenda);

        if (valorRecebido <= 0 && formaDEPagamento === "A prazo") {
            setSelectedTipyPayment("")
            console.log("valor recebido", valorRecebido);
        }

        const entrada = Number(valorDaEntrada.replace(/\D/g, "")) / 100 || 0; // Converte para centavos
        const restante = totalVenda - entrada;
        setValorRestante(restante);

        if(restante <= 0) {
            // setFormaDEPagamento("A vista")
            setValorRecebido(0)
            setValorDaEntrada('')
            setDataDeRecebimento('')
            setValorRestante(0)
            setTipoPagamento('')
        }
        console.log("Restante:", restante);
    }, [valorDaEntrada, itensVenda]);////////////

    useEffect(() => {
        if(valorRestante <= 0){
            setVisibleInputs(false)  
            setFormaDEPagamento("A vista")
            setStatus_pagamento("Pago");
            setQtParcelas(0);
        }  
    }, [valorDaEntrada]);



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
            setFormaDEPagamento("A prazo");
            setQtParcelas(1);
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
                        <h5>Cliente</h5>
                        <p style={{textTransform: "capitalize", fontSize: "0.8rem", paddingBottom: "5px"}}>{name}</p>
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
                        <BtnNavigate 
                            $text="Adicionar Produto"  
                            onClick={() => setModalProduct(true)}
                        />
                        <div className="total">
                            <p>Total</p> 
                            <span>
                                {itensVenda
                                    .reduce((acc, item) => acc + (item.valorTotal || 0), 0)
                                    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                }
                            </span>
                        </div>
                    </div>
                    
                    <div className="payment-area">
                        <h6>Forma de Pagamento</h6>
                        <div className="radio-area">
                            <div>
                                <input 
                                    // defaultChecked={formaDEPagamento === "A vista" ? true : false}
                                    type="radio" 
                                    name="forma-payment" 
                                    value={"A vista"}
                                    checked={ formaDEPagamento === 'A vista'} 
                                    onClick={() => {
                                        setValorDaEntrada('')
                                        setVisibleInputs(false)
                                        setFormaDEPagamento("A vista")
                                        setStatus_pagamento("Pago")
                                        handleFormaDePagamentoClick("A vista")
                                        setDataDeRecebimento('')
                                        setQtParcelas(0)
                                    }}
                                    readOnly 
                                />
                                <label htmlFor="true">A Vista</label>
                            </div>
                            <div>
                                <input 
                                    style={{marginLeft: "11px"}}
                                    // defaultChecked={formaDEPagamento === "A prazo" ? true : false}
                                    type="radio" 
                                    name="forma-payment"
                                    value={"A prazo"}
                                    checked={ formaDEPagamento === 'A prazo'} 
                                    onClick={() => {
                                        setVisibleInputs(true)
                                        setFormaDEPagamento("A prazo")
                                        setStatus_pagamento("Pendente")
                                        setSelectedTipyPayment('')
                                        handleFormaDePagamentoClick("A prazo")
                                        setQtParcelas(1)
                                    }}
                                    readOnly 
                                />
                                <label htmlFor="false">A Prazo</label>
                            </div>
                        </div>

                    </div>
                    
                    {visibleInputs && 
                        <>
                        <div className="inputs-area">
                            <div>
                                <h6>Valor recebido</h6>
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
                                <h6>Valor restantes</h6>
                                <p style={{ fontWeight: "bold", color: valorRestante === 0 ? "green" : "red" }}>
                                    {valorRestante.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </p>
                            </div>

                        </div>
                        <div className="date">
                            <div className="date-area">
                                <label htmlFor="">Data do Recebimento</label>
                                <input 
                                    type="date" 
                                    value={dataDeRecebimento}
                                    onChange={(e) => setDataDeRecebimento(e.target.value)}
                                    placeholder="dd/mm/aaaa"
                                    required
                                />
                            </div>
                            <div className="Pacelament-area">
                                <label htmlFor="">Total de Parcelas</label>
                                <input 
                                    style={{textAlign: "center", fontWeight: "bold"}}
                                    type="text" 
                                    value={qtParcelas <= 0 ? '' : qtParcelas}
                                    onChange={(e) => {
                                        const entrada = e.target.value;
                                        const numeros = entrada.replace(/\D/g, "");
                                        setQtParcelas(Number(numeros));
                                    }}
                                    required
                                />
                            </div>
                        </div>

                        <div className="payment-area" style={{paddingBottom:"4px" }}>
                            <h6>Tipo de Cobrança</h6>
                            <div className="radio-area tipo-cobranca">
                                <div>
                                    <input 
                                        type="radio" 
                                        name="tipo-cobranca"
                                        value={"Diário"}
                                        checked={tipoCobranca === 'Diário'} 
                                        onClick={() => {
                                            handleTipoDeCobrancaClick("Diário")
                                            setTipoCobranca("Diário")
                                            setQtParcelas(1);
                                        }}
                                        readOnly 
                                    />
                                    <label htmlFor="true">Diário</label>
                                </div>
                                <div>
                                    <input 
                                        type="radio" 
                                        name="tipo-cobranca"
                                        value={"Semanal"}
                                        checked={tipoCobranca === 'Semanal'}
                                        onClick={() => {
                                            handleTipoDeCobrancaClick("Semanal")
                                            setTipoCobranca("Semanal")
                                            setQtParcelas(7);
                                        }}
                                        readOnly 
                                    />
                                    <label htmlFor="false">Semanal</label>
                                </div>
                                <div>
                                    <input 
                                        type="radio" 
                                        name="tipo-cobranca"
                                        value={"Quinzenal"}
                                        checked={tipoCobranca === 'Quinzenal'}
                                        onClick={() => {
                                            handleTipoDeCobrancaClick("Quinzenal")
                                            setTipoCobranca("Quinzenal")
                                            setQtParcelas(15);
                                        }}
                                        readOnly 
                                    />
                                    <label htmlFor="false">Quinzenal</label>
                                </div>
                                <div>
                                    <input 
                                        type="radio" 
                                        name="tipo-cobranca"
                                        value={"Mensal"}
                                        checked={tipoCobranca === 'Mensal'}
                                        onClick={() => {
                                            handleTipoDeCobrancaClick("Mensal")
                                            setTipoCobranca("Mensal")
                                            setQtParcelas(30);
                                        }}
                                        readOnly 
                                    />
                                    <label htmlFor="false">Mensal</label> 
                                </div>

                            </div>
                        </div>
                        </>
                    }

                    <div className="payment-area" style={{paddingBottom:"4px" }}>
                        <h6>Tipo de Pagamento</h6>
                        <div className="radio-area">
                            
                            <div>
                                <input 
                                    type="radio" 
                                    name="tipo-pagamento"
                                    value={"Dinheiro"}
                                    checked={selectedTipyPayment === 'Dinheiro'} 
                                    onClick={() => {
                                        handleClick("Dinheiro")
                                        setTipoPagamento("Dinheiro")
                                    }}
                                    readOnly 
                                />
                                <label htmlFor="true">Dinheiro</label>
                            </div>
                            <div>
                                <input 
                                    type="radio" 
                                    name="tipo-pagamento"
                                    value={"Pix"}
                                    checked={selectedTipyPayment === 'Pix'}
                                    onClick={() => {
                                        handleClick("Pix")
                                        setTipoPagamento("Pix")
                                    }}
                                    readOnly 
                                />
                                <label htmlFor="false">Pix</label>
                            </div>
                            <div>
                                <input 
                                    type="radio" 
                                    name="tipo-pagamento"
                                    value={"Cartão"}
                                    checked={selectedTipyPayment === 'Cartão'}
                                    onClick={() => {
                                        handleClick("Cartão")
                                        setTipoPagamento("Cartão")
                                    }}
                                    readOnly 
                                />
                                <label htmlFor="false">Cartão</label>
                            </div>
                        </div>

                    </div>
                    
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
            { messege && <Messege $buttonText="OK" $title={messege.title} $text={messege.message} $setMessege={setMessege} /> }
        </Container>
    )
}

export default VendasForm 
