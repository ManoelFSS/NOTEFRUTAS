import { useState, useEffect} from "react"
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
import { useFornecedores } from "../../../../context/FornecedoresContext"
import { useClientes } from "../../../../context/ClientesContext"
import { useProduct } from "../../../../context/ProductContext"
import { useAuthContext } from "../../../../context/AuthContext"

const  CompraForm = ({setModalCompras, btnName, setBtnName, $color}) => {

    const {userId} = useAuthContext();
    const {product, setProduct, buscarProductPorAdmin} = useProduct();
    const [modalProduct, setModalProduct] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [visibleInputs, setVisibleInputs] = useState(false);
    const [visibleTipoCobranca, setVisibleTipoCobranca] = useState(false);
    const [selectedTipyPayment, setSelectedTipyPayment] = useState('');
    const [messege, setMessege] = useState(null);

    const {
        loading,
        setValorTotalDaCompra,
        parcelasItensCompra, setParcelasItensCompra,
        estadoFornecedor, setEstadoFornecedor,
        textBtn, setTextBtn, 
        itensCompra, setItensCompra,
        idFornecedor, setIdFornecedor
    } = useFornecedores();

    const { 
        name, 
        setName,
        setPhone,
        setCpf,
        setCity,
        //////
        idClient, setIdClient,
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
        tipoCobranca, setTipoCobranca,
        parcelasItensVenda, setParcelasItensVenda,
    } = useClientes();


    const handleClick = (value) => {
        if(valorRecebido <= 0 && formaDEPagamento === "A prazo") {
            setMessege({
                success: false,
                title: "❌ Ops! ",
                message:
                    `O valor da entrada deve ser preenchido para poder  escolher, um tipo de Pagamento,  ou deixe R$ 0,00, para vender sem entrada. 
                `,
            });
            setTipoPagamento("");
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


    useEffect(() => {
        if (qtParcelas > 1) {
            setVisibleTipoCobranca(true)
        }else {
            setVisibleTipoCobranca(false)
        }

    }, [qtParcelas]);


    function adicionarProduto(produto) {
        const jaExiste = itensCompra.some(item => item.produtoId === produto.id);
        if (jaExiste) {
            alert("Produto já adicionado à comprar!");
            return;
        }

        setItensCompra(prev => [
            ...prev,
            {
                produto_id: produto.id,
                compra_id: null,
                adminid: userId,
                name: produto.name,
                quantidade: "",
                valor_unitario: "",
                valor_total: "",
                created_at: new Date(),
            }
        ]);
        setModalProduct(false)
        
    }

    function removerProduto(produtoId) {
        setItensCompra(prev => prev.filter(item => item.produto_id !== produtoId));
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
        const totalVenda = itensCompra.reduce((acc, item) => acc + (item.valor_total || 0), 0);
        setValorTotalDaCompra(totalVenda);

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
    }, [valorDaEntrada, itensCompra]);////////////

    useEffect(() => {
        if(valorRestante <= 0){
            setVisibleInputs(false)  
            setFormaDEPagamento("A vista")
            setStatus_pagamento("Paga");
            setQtParcelas(0);
            setTipoCobranca('');
        }  
    }, [valorDaEntrada]);



    useEffect(() => {
        console.log(itensCompra)
    }, [itensCompra])

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

    
    useEffect(() => {
        function gerarParcelas(dataInicial, tipoCobranca, quantidadeParcelas, valorTotal) {
            if (!dataInicial || !quantidadeParcelas || !valorTotal) {
                console.error("Erro ao gerar parcelas: Dados insuficientes.");
                return [];
            }

            const tipos = {
                "Diário": 1,
                "Semanal": 7,
                "Quinzenal": 15,
                "Mensal": 30,
            };

            const dataBase = new Date(dataInicial);
            const parcelasGeradas = [];

            const totalCentavos = Math.round(valorTotal * 100);
            const valorBaseParcela = Math.floor(totalCentavos / quantidadeParcelas);
            const restante = totalCentavos - (valorBaseParcela * quantidadeParcelas); // Centavos que sobram

            for (let i = 0; i < quantidadeParcelas; i++) {
                let dataParcela;

                console.log( quantidadeParcelas);

                if (quantidadeParcelas === 1) {
                    dataParcela = new Date(dataBase); // Única parcela = data original
                } else {
                    const diasDeDiferenca = tipos[tipoCobranca];
                    if (!diasDeDiferenca) {
                        console.error("Tipo de cobrança inválido.");
                        return [];
                    }
                    dataParcela = new Date(dataBase);
                    dataParcela.setDate(dataParcela.getDate() + i * diasDeDiferenca);
                }

                const valorFinalParcela = valorBaseParcela + (i < restante ? 1 : 0);
                const hoje = new Date().toISOString().split("T")[0];// data atual

                parcelasGeradas.push({
                    compra_id: null,
                    adminid: userId,
                    fornecedor_id:  idFornecedor,
                    valor_parcela: valorFinalParcela / 100,
                    data_vencimento: dataParcela.toISOString().split("T")[0],
                    created_at: new Date(),
                    updated_at: new Date(),
                    status: dataParcela.toISOString().split("T")[0] === hoje ? "Hoje" : "A vencer",
                });
            }

            return parcelasGeradas;
        }

        const resultado = gerarParcelas(dataDeRecebimento, tipoCobranca, qtParcelas, valorRestante);
        setParcelasItensCompra(resultado);
    }, [qtParcelas, dataDeRecebimento, tipoCobranca, valorRestante]);


    useEffect(() => {
        console.log(parcelasItensVenda);
    }, [parcelasItensVenda]);

    useEffect(() => {
        if (qtParcelas <= 1) {
            setTipoCobranca('');
        }
    }, [qtParcelas]);

    useEffect(() => {
        setValorDaEntrada('');
        setValorRecebido(0);
    }, [formaDEPagamento]);

    return (
        <Container>
            <div className="form-area">
                <FormLayout state={estadoFornecedor} $color={$color}>
                    <div className="close">
                        <FaWindowClose className="close-icon" 
                            onClick={() => {
                                setModalCompras(false)    
                                setBtnName("Cadastrar")
                                setName("")
                                setPhone("")
                                setCpf("")
                                setCity("")
                                setEstadoFornecedor("Escolha o Estado")
                                setItensCompra([])
                                setFormaDEPagamento("A prazo")
                            }}
                        />
                    </div>
                    <section className="logo">
                        <FaCartPlus className="icon" />
                        <Title $text="COMPRA"  $cor={"var(  --color-text-primary )"}  />
                    </section>
                    <section className="box">
                        <h5>Fornecedor</h5>
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
                            {itensCompra.map((item, index) => (
                                <ul key={index} className="body-list">
                                    <li>{item.name}</li>
                                    <li>
                                        <input 
                                            type="number"
                                            value={item.quantidade}
                                            className="quant"
                                            onChange={e => {
                                                const valorDigitado = e.target.value;
                                                setItensCompra(prev => {
                                                    const copia = [...prev];
                                                    const novaQuantidade = valorDigitado === "" ? "" : Number(valorDigitado);
                                                    const itemAtual = copia[index];
                                                    itemAtual.quantidade = novaQuantidade;
                                                    itemAtual.valor_total = novaQuantidade * (itemAtual.valor_unitario || 0);
                                                    return copia;
                                                });
                                            }}
                                            required
                                        />
                                    </li>

                                    <li>
                                        <input
                                            type="text"
                                            value={
                                                item.valor_unitario !== null && item.valor_unitario !== undefined && item.valor_unitario !== ""
                                                ? Number(item.valor_unitario).toLocaleString("pt-BR", {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                    })
                                                : ""
                                            }
                                            onChange={(e) => {
                                                const entrada = e.target.value;
                                                // Permite campo vazio
                                                if (entrada === "") {
                                                    setItensCompra((prev) => {
                                                        const copia = [...prev];
                                                        const itemAtual = copia[index];
                                                        itemAtual.valor_unitario = 0;
                                                        itemAtual.valor_total = (itemAtual.quantidade || 0) * 0;
                                                        return copia;
                                                    });
                                                    return;
                                                }

                                                // Remove tudo que não for número
                                                const numeros = entrada.replace(/\D/g, "");
                                                const valorNumerico = Number(numeros) / 100;

                                                setItensCompra((prev) => {
                                                    const copia = [...prev];
                                                    const itemAtual = copia[index];
                                                    itemAtual.valor_unitario = valorNumerico;
                                                    itemAtual.valor_total = (itemAtual.quantidade || 0) * valorNumerico;
                                                    return copia;
                                                });
                                            }}
                                            required
                                        />
                                    </li>

                                    <li className="total-item">
                                        {(item.quantidade * item.valor_unitario).toLocaleString("pt-BR", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </li>
                                    <li>
                                        <MdDeleteForever 
                                            className="delete-icon" 
                                            onClick={() => removerProduto(item.produto_id)}
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
                                {itensCompra
                                    .reduce((acc, item) => acc + (item.valor_total || 0), 0)
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
                                        setValorDaEntrada("")
                                        setVisibleInputs(false)
                                        setFormaDEPagamento("A vista")
                                        setStatus_pagamento("Paga")
                                        handleFormaDePagamentoClick("A vista")
                                        setDataDeRecebimento('')
                                        setQtParcelas(0)
                                        setTipoCobranca('')
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
                                <h6>Valor da entrada</h6>
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

                        { valorDaEntrada > 0 &&
                            <div className="payment-area" style={{ paddingBottom: "4px" }}>
                                <h6>Tipo de Pagamento</h6>
                                <div className="radio-area tipo-pagamento">
                                    {["Dinheiro", "Pix", "Cartão"].map((tipo) => (
                                    <div key={tipo}>
                                        <input 
                                            type="radio" 
                                            name="tipo-pagamento"
                                            value={tipo}
                                            checked={selectedTipyPayment === tipo}
                                            onClick={() => {
                                                setTipoPagamento(tipo);
                                                handleClick(tipo);
                                            }}
                                            readOnly 
                                        />
                                        <label key={tipo}>{tipo}</label>
                                    </div>
                                    ))}
                                </div>
                            </div>
                        }

                        <div className="date">
                            <div className="date-area">
                                <label htmlFor="">Data da Recebimento</label>
                                <input 
                                    type="date" 
                                    value={dataDeRecebimento}
                                    onChange={(e) => setDataDeRecebimento(e.target.value)}
                                    // min={new Date().toISOString().split("T")[0]} // limita para hoje em diante
                                    placeholder="dd/mm/aaaa"
                                    required
                                />
                            </div>
                            <div className="Pacelament-area">
                                <label htmlFor="">Total de Parcelas</label>
                                <div>
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
                                    <p style={{color:valorRestante === 0 ? "green" : "red"}} className="parcelas-text">{(valorRestante / qtParcelas).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                </div>

                            </div>
                        </div>

                        {visibleTipoCobranca && (
                            <div className="payment-area" style={{ paddingBottom: "4px" }}>
                                <h6>Tipo de Cobrança</h6>
                                <div className="radio-area tipo-cobranca">
                                {["Diário", "Semanal", "Quinzenal", "Mensal"].map((tipo) => (
                                    <div key={tipo}>
                                        <input
                                            type="radio"
                                            name="tipo-cobranca"
                                            value={tipo}
                                            checked={qtParcelas > 1 && tipoCobranca === tipo}
                                            required={qtParcelas > 1}
                                            onChange={(e) => {
                                            if (qtParcelas > 1) {
                                                e.preventDefault(); // Evita mudanças acidentais via teclado
                                                setTipoCobranca(tipo);
                                            }
                                            }}
                                        />
                                        <label>{tipo}</label>
                                    </div>
                                ))}
                                </div>
                            </div>
                        )}
                        </>
                    }

                    { formaDEPagamento === "A vista" &&
                        <div className="payment-area" style={{ paddingBottom: "4px" }}>
                            <h6>Tipo de Pagamento</h6>
                            <div className="radio-area tipo-pagamento">
                                {["Dinheiro", "Pix", "Cartão"].map((tipo, index) => (
                                <div key={tipo}>
                                    <input 
                                        type="radio" 
                                        name="tipo-pagamento"
                                        value={tipo}
                                        checked={selectedTipyPayment === tipo}
                                        onClick={() => {
                                            setTipoPagamento(tipo);
                                            handleClick(tipo);
                                        }}
                                        readOnly 
                                    />
                                    <label key={tipo}>{tipo}</label>
                                </div>
                                ))}
                            </div>
                        </div>
                    }
                    <BtnSubmit $marginTop="20px" $text={btnName}/>
                    {loading && <Loading $marginBottom="10px" />}
                </FormLayout>

                {modalProduct && 
                    <section className="modal-product">
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
                                    <div className="img-area">
                                        <img src={item.url_image} alt="" />
                                        <p>{item.name}</p>
                                    </div>
                                    <div className="stock-area">
                                        <p>{item.stock}</p>
                                        <span>{item.Type_sales === "kg" ? "Itens" : item.Type_sales === "unidade" ? "Unid" : item.Type_sales}</span>
                                    </div>
                                </div>
                            ))}
                        </section>
                        <div className="btn-area">
                            <BtnNavigate $text="Cancelar"  
                                onClick={() => setModalProduct(false)}
                            />
                        </div>
                    </section> 
                }
            </div>
            { messege && <Messege  $buttonText="OK" $title={messege.title} $text={messege.message} $setMessege={setMessege} /> }
        </Container>
    )
}

export default  CompraForm
