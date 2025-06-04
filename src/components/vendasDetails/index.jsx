import { useEffect, useState } from "react";
import { Container_datails } from "./styles"
// icons
import { FaWindowClose } from "react-icons/fa";

// context 
import { useVendas } from "../../context/VendasContext"

const VendasDetails = ({ setVendaModalDetails }) => {

    const { vendas, idVenda  } = useVendas();
    const [vendaFilter, setVendaFilter] = useState({});

    useEffect(() => {
        const getVendaItem = vendas.find(venda => venda.id === idVenda);
        setVendaFilter(getVendaItem);
        console.log(getVendaItem);
    }, [idVenda])


    return (
        <Container_datails>
            <section className="datails-container">
                <div className="close-container">
                    <h1>JOSIFRUTAS</h1>
                    <FaWindowClose className="close" onClick={() => setVendaModalDetails(false)} />
                </div>
                <h2>Detalhes da venda</h2>
                <div className="datails-client">
                    <div className="datails-date">
                        <div>
                            <h4>Cliente</h4>
                            <p>{vendaFilter?.name}</p>
                        </div>
                        <div>
                            <h4>Data</h4>
                            <p>{vendaFilter?.created_at?.split('T')[0].split('-').reverse().join('/')}</p>
                        </div>
                    </div>
                    
                    <div className="datails-client-info">
                        <div>
                            <h4>Telefone</h4>
                            <p>{vendaFilter?.phone}</p>
                            <h4>CPF | CNPJ</h4>
                            <p>{vendaFilter?.cpf || "Não informado"}</p>
                        </div>
                        <div style={{paddingLeft: "30px"}}>
                            <h4>Valor total</h4>
                            <p style={{ color: "green", fontSize: "0.9rem", fontWeight: "bold" }}>{vendaFilter?.valor_total?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            <h4>Valor da entrada</h4>
                            <p>{vendaFilter?.valor_entrada?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        </div>
                    </div>
                </div>

                <div className="datails-payment">
                    <ul className="payment-header" >
                        <li>
                            <p>Produto</p>
                        </li>
                        <li>
                            <p>Qnt</p>
                        </li>
                        <li>
                            <p>Val Unt</p>
                        </li>
                        <li>
                            <p>Val Total</p>
                        </li>
                    </ul>
                    {vendaFilter?.itens_venda?.length > 0 && 
                        vendaFilter?.itens_venda?.map((produto, index) =>
                        <ul className="payment-list" key={index} >
                            <li>
                                <p>{produto?.name}</p>
                            </li>
                            <li>
                                <p>{produto?.quantidade}</p>
                            </li>
                            <li>
                                <p>{produto?.valor_unitario?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </li>
                            <li>
                                <p>{produto?.valor_total?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </li>
                        </ul>
                    )}
                    <div className="payment-total">
                        <p>Total: {vendaFilter?.valor_total?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                </div>

                <div className="datails-payment">
                    <h5>Parcelas</h5>
                    <ul style={{ backgroundColor:"rgb(232, 148, 13)"}} className="payment-header" >
                        <li>
                            <p>Data venc</p>
                        </li>
                        <li>
                            <p>status</p>
                        </li>
                        <li>
                            <p style={{ width: "70px" }}>Valor</p>
                        </li>
                        <li>
                            <p style={{ width: "60px" }}>Ação</p>
                        </li>
                    </ul>
                    {vendaFilter?.parcelas_venda?.length > 0 && 
                        vendaFilter?.parcelas_venda?.map((parcela, index) =>
                        <ul className="payment-list" key={index} >
                            <li>
                                <p>{parcela?.data_vencimento.split('T')[0].split('-').reverse().join('/')}</p>
                            </li>
                            <li>
                                <p className="status" style={{ color: parcela?.status === "Paga" ? "green" : "red" }}>{parcela?.status}</p>
                            </li>
                            <li>
                                <p  style={{ width: "70px" }}>{parcela?.valor_parcela?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </li>
                            <li>
                                <p  style={{ width: "60px" }}>
                                    <input 
                                        className="checkbox"
                                        type="checkbox" 
                                        checked={parcela?.status === "Paga" ? true : false}
                                    />
                                </p>
                            </li>
                        </ul>
                    )}
                    <div className="payment-total">
                        <div className="title">
                            <p >Parcelas</p>
                        </div>
                        <div>
                            <p>Total: {vendaFilter?.parcelas_venda?.length}</p>
                            <p style={{ color: "red" }}>{vendaFilter?.valor_restante?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        </div>
                        <div>
                            <p>Pagas: {vendaFilter?.parcelas_venda?.filter((parcela) => parcela.status === "Paga").length}</p>
                            <p style={{ color: "green" }}> <span>-</span> {vendaFilter?.parcelas_venda?.filter((parcela) => parcela.status === "Paga").reduce((total, parcela) => total + parcela.valor_parcela, 0) .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        </div>
                        <div>
                            <p>Pendentes: {vendaFilter?.parcelas_venda?.filter((parcela) => parcela.status === "Pendente").length}</p>
                            <p>{(vendaFilter?.valor_restante - vendaFilter?.parcelas_venda?.filter((parcela) => parcela.status === "Paga").reduce((total, parcela) => total + parcela.valor_parcela, 0)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        </div>
                    </div>
                </div>
            </section>
        </Container_datails>
    )
}

export default VendasDetails
