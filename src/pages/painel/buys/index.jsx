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
import CompraDetails from "../../../components/compraDetails";
import Title from "../../../components/title";
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
import { HiMiniShoppingCart } from "react-icons/hi2";
import { GiShoppingCart } from "react-icons/gi";
import { IoMdPerson } from "react-icons/io";
// hooks
import useSelect from "../../../hooks/useSelect"
// context
import { useAuthContext } from "../../../context/AuthContext"
import { useVendas } from "../../../context/VendasContext";
import { useBuys } from "../../../context/BuysContext";
import { useFornecedores } from "../../../context/FornecedoresContext";
//image
import Perfil from "../../../assets/perfil.png"
// rota aninhada
;

const Buys = () => {;

    const { setIdFornecedor, caunterCompras} = useFornecedores();

    const { 
        buscarComprasPorAdmin,
        compras, setCompras,
        messege, setMessege,
        closeModal, setCloseModal,
        buscarComprasSeach,
        editarCompra,
        idCompra, setIdCompra,
    } = useBuys();
    
    const {user, setSelectForm, userId} = useAuthContext();
    const [valueSearch, setValueSearch] = useState('');
    const [dataNotFound, setDataNotFound] = useState(false);
    const [cardList, setCardList] = useState(false);
    const [btnName, setBtnName] = useState("Cadastrar");
    const [deleteControl, setDeleteControl] = useState(null);
    const [confirmCancelaCompra, setConfirmCancelaCompra] = useState(false);
    const [closeBtn, setCloseBtn] = useState(false);
    const [mes, setMes] = useState( new Date().getMonth() + 1);
    const [ano, setAno] = useState(new Date().getFullYear());
    const [compraModalDetails, setCompraModalDetails] = useState(false);
    const [textBtn, setTextBtn] = useState("Cancelar");

    const handleDateChange = ({ month, year }) => {
        setAno(year);
        setMes(month + 1);
    };

    const dataHeader = [
        {icon: <IoMdPerson className="icon" />},
        { name: "Fornecedor", icon: <AiOutlineAlignRight  className="icon" /> },
        { name: "Telefone", icon: <BsFillTelephonePlusFill className="icon" /> },
        { name: "Data", icon: <HiMiniCalendarDateRange  className="icon" /> },
        { name: "Forma de Pagamento", icon: <FaCreditCard  className="icon" /> },
        { name: "Valor Total", icon: <RiMoneyDollarCircleFill className="icon" /> },
        { name: "Valor de Entrada", icon: <GiReceiveMoney  className="icon" /> },
        { name: "Status", icon: <HiMiniStar className="icon" /> },
        { name: "Ação", icon: <PiHandTapFill className="icon" />}
        
    ]

    const data = [
        { category: "Cancelada" },
        { category: "Pendente" },
    ];

    const img = Perfil;
    const { select, setSelect } = useSelect();
    const [paginacao, setPaginacao] = useState(1);

    const itemsPorPage = 100;
    const totalPages = Math.ceil(caunterCompras / itemsPorPage);

    useEffect(() => {
        if(totalPages > 1 ) return setPaginacao(1);
    }, [mes, ano]);

    useEffect(() => {
        setDataNotFound(false);
        const  hendlerGetCompras = async () => {
            const comprasData  = await  buscarComprasPorAdmin(userId, itemsPorPage, paginacao, ano, mes);
            if(comprasData .length === 0) setTimeout(() => setDataNotFound(true), 2000);
            setCompras(comprasData )
        }
        hendlerGetCompras();    
    }, [closeModal, paginacao, deleteControl, mes, ano]);


    useEffect(() => {
        const searchLength = valueSearch.split("").length;

        if(searchLength <= 0) {
            const hendlerGetCompras = async () => {
                const comprasData = await   buscarComprasPorAdmin(userId, itemsPorPage, paginacao, ano, mes);
                if(comprasData .length === 0) setTimeout(() => setDataNotFound(true), 2000);
                setCompras(comprasData )
                
            }
            hendlerGetCompras();
        }
    }, [valueSearch]);

    

    const hendlerGetCompraSearch = async () => {
        setCompras([])
        const vendaSeach = await   buscarComprasSeach(valueSearch, userId);
        if(vendaSeach.length === 0) setTimeout(() => setDataNotFound(true), 2000);
        setCompras(vendaSeach)
        console.log(vendaSeach)
    }

    useEffect(() => {
        if(!idCompra) return
        console.log(idCompra)
        
        const cancelarCompra = async () => {
            await editarCompra(idCompra, "Cancelada");
            setDeleteControl(!deleteControl)
            setMessege(null);
            setIdCompra(null);
            setCloseBtn(false);
        }
        cancelarCompra(); 

    }, [confirmCancelaCompra]);

    const hendleCancelaCompra = (id) => {
        setMessege({success: true, title: "Tem certeza que deseja Cancelar essa compra?", message: "Atenção recomendamos cancelar a compra em casos de não recebimento ou devolução"});
        setIdCompra(id);
        setCloseBtn(true);
    }
        


    return (
        <Container>
            <section className="box-filter">
                <div className="title">
                    <GiShoppingCart className="icon" />
                    <Title $text="Compras" $fontSize={"1.5rem"}  $cor={"var(  --color-text-primary )"} />
                </div>
                <div className="filter">
                    <Select     
                        select={select} 
                        setSelect={setSelect}
                        data={data} 
                        $width={"130px"}
                    />
                    <Search 
                        valueSearch={valueSearch}
                        setValueSearch={setValueSearch}
                        $height={"35px"}
                        $width={"200px"}
                        onClick={hendlerGetCompraSearch}
                    />
                    <MonthYearSelector userRegisterYear={user?.createdat?.slice(0, 4)} onChange={handleDateChange} />

                    {totalPages > 1 && <Pagination 
                        $totalPages={totalPages} 
                        $paginacao={paginacao} 
                        $setPaginacao={setPaginacao}
                    />}
                </div>
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
                        { compras?.length > 0 ? (
                        <div className="body">
                            { compras.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                            .filter(item => {
                                const search = valueSearch.toLowerCase();
                                const nomeInclui = item.name?.toLowerCase().includes(search);
                                const contemTermo = nomeInclui
                                if (select !== "Todas") return item.status === select && contemTermo;
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
                                                setIdCompra(item.id);
                                                setCompraModalDetails(true);
                                            }}
                                        />
                                        <TbCancel  
                                            className="icon" 
                                            style={{ color: "rgb(224, 2, 2)" }} 
                                            onClick={() => {
                                                item.status !== "Cancelada" ? hendleCancelaCompra(item.id) : setMessege({title: "Atenção", message: "Essa compra ja foi cancelada!"});
                                                item.status === "Cancelada" && setCloseBtn(false)
                                                item.status === "Cancelada" && setTextBtn("OK");
                                                setIdFornecedor(item.fornecedor_id);
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
                            Nenhuma Compra cadastrada !
                        </p>
                        )}
                    </section>
                    )
                }
                </ContainerTable>

            {closeModal && <ProductForm  $color={"#fff"} setCloseModal={setCloseModal} btnName={btnName} setBtnName={setBtnName} />}
            { messege && <Messege setIdVenda={setIdCompra} setTextBtn={setTextBtn} $buttonText={textBtn} button={closeBtn && <BtnNavigate $text="Sim" onClick={() => setConfirmCancelaCompra(!confirmCancelaCompra)} />} $title={messege.title} $text={messege.message} $setMessege={setMessege} /> }
            { compraModalDetails && 
                <CompraDetails  
                    setCompraModalDetails={setCompraModalDetails} 
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

export default Buys
