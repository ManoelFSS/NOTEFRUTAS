import { useEffect, useState, useRef } from "react";
import { Container_datails } from "./styles"
// icons
import { FaWindowClose } from "react-icons/fa";
import { FaFileDownload  } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";

// components
import Loading from "../loading";
import Messege from "../messege";
import BtnNavigate from "../btns/btnNavigate";

// context 
import { useVendas } from "../../context/VendasContext"
import { useClientes } from "../../context/ClientesContext";
import { useAuthContext } from "../../context/AuthContext";
import {useLogs} from '../../context/LogContext'
import { useDashboard } from "../../context/DashboardContext";
// download
import html2canvas from "html2canvas";

const VendasDetails = ({setVendaModalDetails, userId, itemsPorPage, paginacao, ano, mes }) => {

    const { reloadDashboard, setReloadDashboard } = useDashboard();
    const {user} = useAuthContext();
    const {cadastrarLog} = useLogs();

    const { atualizarStatusParaDebitos} = useClientes();
    const {contarVendasPendentesOuAtrasadas, vendas, setVendas, idVenda, editarParcelaStatus, buscarVendasPorAdmin, editarVenda, setIdVenda } = useVendas();

    const [vendaFilter, setVendaFilter] = useState({});
    const [idParcela, setIdParcela] = useState('');
    const [confirmPacela, setConfirmPacela] = useState(false);
    const [messege, setMessege] = useState(null);
    const [closeBtn, setCloseBtn] = useState(false);
    const [controlerVendaFilter, setControlerVendaFilter] = useState(null);
    const [textBtn, setTextBtn] = useState('Cancelar');

    const hasRun = useRef(false);

    useEffect(() => {
        const getVendaItem = vendas.find(venda => venda.id === idVenda);
        setVendaFilter(getVendaItem);
    }, [idVenda, controlerVendaFilter])

    useEffect(() => {
        // if (!hasRun.current) return;
        // hasRun.current = true;
        setMessege(null);
        if(!idParcela) return

        const hendleStatusVenda  = async () => {
            await editarParcelaStatus(idParcela, 'Paga');

            const getVendas = await buscarVendasPorAdmin(userId, itemsPorPage, paginacao, ano, mes);
            setVendas(getVendas);

            const getVendaItem = getVendas.find(venda => venda.id === idVenda);
            const getParcelas = await getVendaItem?.parcelas_venda.filter(parcela => parcela.status === 'A vencer');
            console.log(getVendaItem);
            console.log(getParcelas);

            if(getParcelas.length === 0) {
                await editarVenda(idVenda, 'Paga');
                const getVendas = await buscarVendasPorAdmin(userId, itemsPorPage, paginacao, ano, mes);
                setVendas(getVendas);

                const getNumeroDeVendasDoCliente = await contarVendasPendentesOuAtrasadas(userId, getVendaItem.cliente_id);
                console.log("contarVendas", getNumeroDeVendasDoCliente);
                if(getNumeroDeVendasDoCliente === 0) {
                    await atualizarStatusParaDebitos(getVendaItem.cliente_id, "Em Dias");
                    console.log("cliente nao tem nemhuma venda pendente, status Em Dias");
                }
            }
            
            setControlerVendaFilter(!controlerVendaFilter);
            setCloseBtn(false);
            setTextBtn('OK');
            setMessege({success: true, title: "Parcela confirmada com sucesso", message: "A parcela foi confirmada como Pago"});

            const parcelaItem = await  getVendaItem ?.parcelas_venda.find(parcela => parcela.id === idParcela);
            console.log(parcelaItem);

            if (parcelaItem) {
                const log = {
                    adminid: userId,    
                    colaborador_id: user.id, 
                    name: user.name,   
                    titulo: '✅ Pagamento confirmado',   
                    mensagem: `A parcela referente à venda de ${getVendaItem.created_at.split('T')[0].split('-').reverse().join('/')} 
                                para o cliente: ${getVendaItem.name.split(' ').slice(0, 2).join(' ')} foi registrada como paga,
                                no valor de: ${parcelaItem.valor_parcela.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`, 
                    status: 'Não lida',   
                    referencia_id: idVenda, 
                    created_at: new Date().toISOString()
                };

                await cadastrarLog(log);
            }

            setReloadDashboard(!reloadDashboard);// atualiza o dashboard
        }

        hendleStatusVenda ();
    }, [confirmPacela]);

    const confirmaPagamento  = (id) => {
        setTextBtn('Cancelar');
        setMessege({success: true, title: "Tem certeza que deseja  Confirmar  o pagamento dessa Parcela ?", message: "Atenção ao confirmar o pagamento dessa parcela Não pode ser desfeito"});
        setIdParcela(id);
        setCloseBtn(true);
    }

    const divRef = useRef();
    const handleDownload = async (phone) => {
        const element = divRef.current;
        const canvas = await html2canvas(element);
        const dataUrl = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "div-capturada.png";
        link.click();
    };

    console.log(vendaFilter);

    return (
        <Container_datails>
            <section ref={divRef} className="datails-container">
                <div className="close-container">
                    <h1>JOSIFRUTAS</h1>
                    <FaWindowClose className="close" onClick={() => {setVendaModalDetails(false), setIdVenda(null)}} />
                </div>
                <h2>Detalhes da venda</h2>
                <div className="datails-client">
                    <div className="datails-date">
                        <div>
                            <h4>Cliente</h4>
                            <p className="name">{vendaFilter?.name}</p>
                        </div>
                        <div>
                            <h4>Data da venda</h4>
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
                        <div style={{paddingLeft: "60px"}}>
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
                            <span>Tipo Unid</span>
                        </li>
                        <li>
                            <p>Valor</p>
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
                                <p>
                                    {
                                        produto?.Type_sales?.toLowerCase() === "kg"
                                        ? Number(produto?.quantidade) / 1000
                                        : produto?.quantidade
                                    }
                                </p>
                                <span>{produto?.Type_sales === "unidade" ? "qt" : "kg"}</span>
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
                        <p>Valor total: {vendaFilter?.valor_total?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                </div>

                <div className="datails-payment">
                    <h5>Parcelas</h5>
                    <ul style={{ backgroundColor:"rgb(232, 148, 13)"}} className="payment-header" >
                        <li>
                            <p>Data Venc</p>
                        </li>
                        <li>
                            <p style={{ width: "70px" }}>Valor</p>
                        </li>
                        <li>
                            <p>Status</p>
                        </li>
                        <li>
                            <p style={{ width: "60px", paddingLeft: "25px" }}>Ação</p>
                        </li>
                    </ul>
                    {vendaFilter?.parcelas_venda?.length > 0 && 
                        vendaFilter?.parcelas_venda?.sort((p1, p2) => new Date(p1.data_vencimento) - new Date(p2.data_vencimento)).map((parcela, index) =>
                        <ul className="payment-list" key={index}  style={{ 
                                backgroundColor: parcela?.status === "A vencer" ? "rgba(255, 230, 0, 0.06)" : parcela?.status === "Hoje" ? "rgba(5, 34, 122, 0.11) " : parcela?.status === "Paga" ? "rgba(23, 170, 7, 0.11)" : parcela?.status === "Atrasada" ? "rgba(255, 0, 204, 0.09)" : "rgba(232, 8, 8, 0.09)" }} >
                            <li>
                                <p>{parcela?.data_vencimento.split('T')[0].split('-').reverse().join('/')}</p>
                            </li>
                            <li>
                                <p  style={{ width: "70px" }}>{parcela?.valor_parcela?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </li>
                            <li>
                                <p className="status">{parcela?.status}</p>
                            </li>
                            <li>
                                <p  style={{ width: "60px", paddingLeft: "30px" }}>
                                    {parcela?.status === "Cancelada" ? <FcCancel className="cancel-icon" /> : 
                                        <input 
                                            className="checkbox"
                                            type="checkbox" 
                                            checked={parcela?.status === "Paga"}
                                            onChange={() => vendaFilter?.status !== "Cancelada" && parcela?.status !== "Paga" && confirmaPagamento(parcela?.id)}
                                        />
                                    }
                                </p>
                            </li>
                        </ul>
                    )}
                    <div className="payment-total">
                        <div className="title">
                            <p >Parcelas</p>
                        </div>
                        <div>
                            <h4>Total: {vendaFilter?.parcelas_venda?.length}</h4>
                            <p style={{ color: "red" }}>{vendaFilter?.valor_restante?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        </div>
                        <div>
                            <h4>Pagas: {vendaFilter?.parcelas_venda?.filter((parcela) => parcela.status === "Paga").length}</h4>
                            <p style={{ color: "green" }}>
                                <span>-</span>{" "}
                                {
                                    (
                                    vendaFilter?.parcelas_venda
                                        ?.filter((parcela) => parcela.status === "Paga")
                                        .reduce((total, parcela) => total + Math.round(Number(parcela.valor_parcela || 0) * 100), 0) / 100
                                    ).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                }
                            </p>
                        </div>
                        <div>
                            <h4>Pendentes: {vendaFilter?.parcelas_venda?.filter((parcela) => parcela.status !== "Paga").length}</h4>
                            <p>{(vendaFilter?.valor_restante - vendaFilter?.parcelas_venda?.filter((parcela) => parcela.status === "Paga").reduce((total, parcela) => total + parcela.valor_parcela, 0)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        </div>
                    </div>
                </div>
                <div className="datails-download">
                    <p>{vendaFilter?.status === "Cancelada" && "Venda cancelada"}</p>
                    <FaFileDownload 
                        className="icon" 
                        onClick={() => {
                            handleDownload(vendaFilter?.phone);
                        }}
                    />
                </div>
            </section>
            
            { messege && <Messege $buttonText={textBtn} button={closeBtn && <BtnNavigate $text="Sim" onClick={() => setConfirmPacela(!confirmPacela)} />} $title={messege.title} $text={messege.message} $setMessege={setMessege} /> }
        </Container_datails>
    )
}

export default VendasDetails
