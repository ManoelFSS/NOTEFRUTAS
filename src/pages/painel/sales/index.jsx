import { useState, useEffect} from "react";
import { Container, ContainerTable } from "./styles"
// components
import BtnNavigate from "../../../components/btns/btnNavigate"
import Select from "../../../components/select"
import Search from "../../../components/search"
import Pagination from "../../../components/pagination"
import ProductForm from "../../../components/forms/systemForm/produtForm";
import Messege from "../../../components/messege";
import Loading from "../../../components/loading";
import MonthYearSelector from "../../../components/MonthYearSelector";
import VendasDetails from "../../../components/vendasDetails";
// icons
import { FaUserPlus} from "react-icons/fa";
import {  PiHandTapFill  } from "react-icons/pi";
import { HiMiniStar } from "react-icons/hi2";
import { AiOutlineAlignRight } from "react-icons/ai";
import { IoBagHandleSharp } from "react-icons/io5";
import { BsFillTelephonePlusFill } from "react-icons/bs";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { FaCreditCard } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io";
import { TbCancel } from "react-icons/tb";
import { HiOutlineInformationCircle } from 'react-icons/hi';
// hooks
import useSelect from "../../../hooks/useSelect"
// context
import { useAuthContext } from "../../../context/AuthContext"
import { useVendas } from "../../../context/VendasContext";
import { useClientes } from "../../../context/ClientesContext";
//image
import Perfil from "../../../assets/perfil.png"
// rota aninhada

const Sales = () => {;

    const { setIdClient, caunterVendas } = useClientes();

    const { 
        buscarVendasPorAdmin,
        messege, setMessege,
        closeModal, setCloseModal,
        vendas, setVendas,
        buscarVendasSeach,
        editarVenda,
        idVenda, setIdVenda,
    } = useVendas();
    
    const {user, setSelectForm, userId} = useAuthContext();
    const [valueSearch, setValueSearch] = useState('');
    const [dataNotFound, setDataNotFound] = useState(false);
    const [cardList, setCardList] = useState(false);
    const [btnName, setBtnName] = useState("Cadastrar");
    const [deleteControl, setDeleteControl] = useState(null);
    const [confirmCancelaVenda, setConfirmCancelaVenda] = useState(false);
    const [closeBtn, setCloseBtn] = useState(false);
    const [mes, setMes] = useState( new Date().getMonth() + 1);
    const [ano, setAno] = useState(new Date().getFullYear());
    const [vendaModalDetails, setVendaModalDetails] = useState(false);
    const [textBtn, setTextBtn] = useState("Cancelar");

    const handleDateChange = ({ month, year }) => {
        setAno(year);
        setMes(month + 1);
    };

    const dataHeader = [
        {icon: <IoBagHandleSharp className="icon" />},
        { name: "Cliente", icon: <AiOutlineAlignRight  className="icon" /> },
        { name: "Telefone", icon: <BsFillTelephonePlusFill className="icon" /> },
        { name: "Data", icon: <HiMiniCalendarDateRange  className="icon" /> },
        { name: "Forma de Pagamento", icon: <FaCreditCard  className="icon" /> },
        { name: "Valor Total", icon: <RiMoneyDollarCircleFill className="icon" /> },
        { name: "Valor de Entrada", icon: <GiReceiveMoney  className="icon" /> },
        { name: "Status", icon: <HiMiniStar className="icon" /> },
        {name: "Ação", icon: <PiHandTapFill className="icon" />}
        
    ]

    const data = [
        { category: "Cancelada" },
        { category: "Pendente" },
        { category: "Atrasada" },
    ];

    const img = Perfil;
    const { select, setSelect } = useSelect();
    const [paginacao, setPaginacao] = useState(1);

    const itemsPorPage = 100;
    const totalPages = Math.ceil(caunterVendas / itemsPorPage);

    useEffect(() => {
        if(totalPages > 1 ) return setPaginacao(1);
    }, [mes, ano]);

    useEffect(() => {
        setDataNotFound(false);
        console.log(paginacao)
        const hendlerGetProduct = async () => {
            const vendaData = await  buscarVendasPorAdmin(userId, itemsPorPage, paginacao, ano, mes);
            if(vendaData.length === 0) setTimeout(() => setDataNotFound(true), 2000);
            setVendas(vendaData)
        }
        hendlerGetProduct();    
    }, [closeModal, paginacao, deleteControl, mes, ano]);

    useEffect(() => {
        const searchLength = valueSearch.split("").length;

        if(searchLength <= 0) {
            const hendlerGetVendas = async () => {
                const vendas = await  buscarVendasPorAdmin(userId, itemsPorPage, paginacao, ano, mes);
                if(vendas.length === 0) setTimeout(() => setDataNotFound(true), 2000);
                setVendas(vendas)
                
            }
            hendlerGetVendas();
        }
    }, [valueSearch]);

    const hendlerGetclienteSearch = async () => {
        setVendas([])
        const vendaSeach = await   buscarVendasSeach(valueSearch, userId);
        if(vendaSeach.length === 0) setTimeout(() => setDataNotFound(true), 2000);
        setVendas(vendaSeach)
        console.log(vendaSeach)
    }

    useEffect(() => {
        if(!idVenda) return
        
        const cancelarVenda = async () => {
            await editarVenda(idVenda, "Cancelada");
            setDeleteControl(!deleteControl)
            setMessege(null);
            setIdVenda(null);
            setCloseBtn(false);
        }
        cancelarVenda(); 

    }, [confirmCancelaVenda]);

    const hendleCancelaVenda = (id) => {
        setMessege({success: true, title: "Tem certeza que deseja Cancelar essa Venda?", message: "Atenção recomendamos cancelar a venda em casos de problemas com o pagamento ou devolução"});
        setIdVenda(id);
        setCloseBtn(true);
    }


    return (
        <Container>
            <section className="box-filter">
                <BtnNavigate 
                    $text="Cadastrar venda" 
                    icon={<FaUserPlus className="icon" />} 
                    onClick={() => {
                        setCloseModal(true)
                        setSelectForm("cadastrar produto") 
                    }}
                />
                <Select     
                    select={select} 
                    setSelect={setSelect}
                    data={data} 
                    $width={"196px"}
                />
                <Search 
                    valueSearch={valueSearch}
                    setValueSearch={setValueSearch}
                    $height={"35px"}
                    $width={"200px"}
                    onClick={hendlerGetclienteSearch}
                />
                <MonthYearSelector userRegisterYear={user?.createdat?.slice(0, 4)} onChange={handleDateChange} />

                {totalPages > 1 && <Pagination 
                    $totalPages={totalPages} 
                    $paginacao={paginacao} 
                    $setPaginacao={setPaginacao}
                />}
            </section>
            <ContainerTable>
                {
                    cardList ? (
                    <>
                    </>
                    ) : (
                    <section className="table">
                        <div className="header">
                            <ul className="header-list">
                                {dataHeader.map((item, index) => (
                                <li key={index}>
                                    {item.name} {item.icon}
                                </li>
                                ))}
                            </ul>
                        </div>
                        {vendas?.length > 0 ? (
                        <div className="body">
                            {vendas.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                            .filter(item => {
                                const search = valueSearch.toLowerCase();
                                const nomeInclui = item.name?.toLowerCase().includes(search);
                                const contemTermo = nomeInclui
                                if (select !== "Todos") return item.status === select && contemTermo;
                                return contemTermo;
                            })
                            .map((item, index) => (
                                <ul className="body-list" key={index} style={{ backgroundColor: item.created_at.split("T")[0] === new Date().toISOString().split("T")[0] ? "rgba(175, 188, 179, 0.72)" : "" }}>
                                    <li><img src={item.url_image ? item.url_image : Perfil} alt="avatar" /></li>
                                    <li>{item.name}</li>
                                    <li>{item.phone}</li>
                                    <li>{new Date(item.created_at).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</li>
                                    <li>{item.forma_pagamento}</li>
                                    <li>{item.valor_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</li>
                                    <li>{item.valor_entrada.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }</li>
                                    <li>
                                        <span style={{ 
                                            backgroundColor: item.status === "Paga" ? "rgb(78, 138, 98)" : item.status === "Pendente" ? "rgb(58, 85, 136)" : item.status === "Atrasada" ? "rgb(193, 117, 23)" : "rgb(211, 5, 5)",
                                        }}>
                                            {item.status}
                                        </span>
                                    </li>
                                    <li className="icons">
                                        <IoLogoWhatsapp
                                            className="icon-whatsapp"
                                            onClick={() =>
                                                window.open(
                                                `https://api.whatsapp.com/send?phone=55${item.phone.replace(/[^\d]/g, '')}`
                                                )
                                            }
                                        />
                                        <HiOutlineInformationCircle 
                                            className="icon" 
                                            style={{ color: "rgb(53, 53, 53)" }} 
                                            onClick={() => {
                                                setIdVenda(item.id);
                                                setVendaModalDetails(true);
                                            }}
                                        />
                                        <TbCancel  
                                            className="icon" 
                                            style={{ color: "rgb(224, 2, 2)" }} 
                                            onClick={() => {
                                                item.status !== "Cancelada" ? hendleCancelaVenda(item.id) : setMessege({title: "Atenção", message: "Essa venda ja foi cancelada!"});
                                                item.status === "Cancelada" && setCloseBtn(false)
                                                item.status === "Cancelada" && setTextBtn("OK");
                                                setIdClient(item.cliente_id);
                                            }}
                                        />
                                    </li>
                                </ul>
                            ))}
                        </div>
                        ) : !dataNotFound ? (
                        <div style={{ margin: "auto" }}><Loading /></div>
                        ) : (
                        <p style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "auto" }}>
                            Nenhuma Venda resistrada !
                        </p>
                        )}
                    </section>
                    )
                }
                </ContainerTable>

            {closeModal && <ProductForm  $color={"#fff"} setCloseModal={setCloseModal} btnName={btnName} setBtnName={setBtnName} />}
            { messege && <Messege setIdVenda={setIdVenda} setTextBtn={setTextBtn} $buttonText={textBtn} button={closeBtn && <BtnNavigate $text="Sim" onClick={() => setConfirmCancelaVenda(!confirmCancelaVenda)} />} $title={messege.title} $text={messege.message} $setMessege={setMessege} /> }
            { vendaModalDetails && 
                <VendasDetails  
                    setVendaModalDetails={setVendaModalDetails} 
                    userId={userId} 
                    itemsPorPage={itemsPorPage} 
                    paginacao={paginacao} 
                    ano={ano} 
                    mes={mes} 
                />
            }
        </Container>
    )
}

export default Sales
