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
import ProductCard from "../../../components/cards/productCard";
import MonthYearSelector from "../../../components/MonthYearSelector";
import VendasDetails from "../../../components/vendasDetails";
// icons
import { FaUserPlus, FaFileDownload  } from "react-icons/fa";
import { LuSquareEqual, LuLayoutList } from "react-icons/lu";
import {  PiHandTapFill  } from "react-icons/pi";
import { HiMiniStar } from "react-icons/hi2";
import { FaEdit} from "react-icons/fa";
import { MdDeleteForever, MdDownloadForOffline  } from "react-icons/md";
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
//image
import Perfil from "../../../assets/perfil.png"
// rota aninhada
import { useNavigate  } from "react-router-dom";

const Sales = () => {

    const navigate = useNavigate();

    const { 
        buscarVendasPorAdmin,
        loading, setLoading,
        messege, setMessege,
        closeModal, setCloseModal,
        vendas, setVendas,
        caunterVendas, setCaunterVendas,
        buscarVendasSeach,
        editarVenda,
        deletarVenda,
        name, setName,
        phone, setPhone,
        idVenda, setIdVenda,
    } = useVendas();
    
    const { setSelectForm, userId,  activeLink, setActiveLink } = useAuthContext();
    const [valueSearch, setValueSearch] = useState('');
    const [dataNotFound, setDataNotFound] = useState(false);
    const [cardList, setCardList] = useState(false);
    const [btnName, setBtnName] = useState("Cadastrar");
    const [deleteControl, setDeleteControl] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [idProduct, setIdProductCard] = useState(null);
    const [closeBtn, setCloseBtn] = useState(false);
    const [mes, setMes] = useState( new Date().getMonth() + 1);
    const [ano, setAno] = useState(new Date().getFullYear());
    const [vendaModalDetails, setVendaModalDetails] = useState(false);

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
        { category: "Pago" },
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
        console.log(paginacao)  
        console.log(totalPages)
    }, [mes, ano]);

    useEffect(() => {
        setDataNotFound(false);
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
        if(!idProduct) return
        
        const deletaItem = async () => {
            await deletarProduto(idProduct);
            setDeleteControl(!deleteControl)
            setMessege(null);
            setConfirmDelete(false);
        }
        deletaItem();
        console.log("confirmDelete", confirmDelete);
    }, [confirmDelete]);

    const hendledeliteProduct = (id) => {
        setMessege({success: true, title: "Tem certeza que deseja deletar esse produto ?", message: "Atenção ao deletar o produto ele sera removido permanentemente e informações relacionadas ao mesmo"});
        setIdProductCard(id);
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
                {/* <div className="box-icon">
                    <LuSquareEqual 
                        className={`icon-square ${cardList && "ative-icon"}`}
                        onClick={() => setCardList(true)}
                    />
                    <LuLayoutList  
                        className={`icon-list ${!cardList && "ative-icon"}`} 
                        onClick={() => setCardList(false)}
                    />
                </div> */}
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
                    $width={"210px"}
                    onClick={hendlerGetclienteSearch}
                />
                <MonthYearSelector userRegisterYear={2023} onChange={handleDateChange} />

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
                        {vendas?.length > 0  ? (
                        <div className="body-card">
                            {vendas
                            .filter(item => {
                                const search = valueSearch.toLowerCase();
                                const nomeInclui = item.name?.toLowerCase().includes(search);
                                const contemTermo = nomeInclui
                                if (select !== "Todos") return item.status === select && contemTermo;
                                return contemTermo;
                            })
                            .map(item => (
                                <ProductCard
                                    key={item.id}
                                    index={item.id}
                                    image={item.url_image}
                                    name={item.name}
                                    stock={item.stock}
                                    description={item.description}
                                    category={item.category}
                                    status={item.status}
                                    acao={[
                                    {
                                        icon: <FaEdit 
                                                    className="icon" 
                                                    style={{ color: "rgb(14, 115, 143)" }} 
                                                    onClick={() => {
                                                        setCloseModal(true);
                                                        setName(item.name);
                                                        setDescription(item.description);
                                                        setCategory(item.category);
                                                        setSelectForm("editar produto");
                                                        setIdProduct(item.id);
                                                        setBtnName("Editar produto");
                                                    }}
                                                />,
                                    },
                                    {
                                        icon: <MdDeleteForever 
                                                    className="icon" 
                                                    style={{ color: "rgb(224, 2, 2)" }} 
                                                    onClick={() => {
                                                        hendledeliteProduct(item.id);
                                                    }}
                                                />,
                                    },
                                ]}
                                />
                            ))}
                        </div>
                        ) : !dataNotFound ? (
                        <div style={{ margin: "auto" }}><Loading /></div>
                        ) : (
                        <p style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "auto" }}>
                            Nenhum cliente cadastrado!
                        </p>
                        )}
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
                                            backgroundColor: item.status === "Pago" ? "rgb(78, 138, 98)" : item.status === "Pendente" ? "rgb(58, 85, 136)" : "rgb(211, 5, 5)",
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
                                                // hendledeliteProduct(item.id);
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
                            Nenhum Produto cadastrado!
                        </p>
                        )}
                    </section>
                    )
                }
                </ContainerTable>

            {closeModal && <ProductForm  $color={"#fff"} setCloseModal={setCloseModal} btnName={btnName} setBtnName={setBtnName} />}
            { messege && <Messege $buttonText="Cancelar" button={closeBtn && <BtnNavigate $text="Deletar " onClick={() => setConfirmDelete(true)} />} $title={messege.title} $text={messege.message} $setMessege={setMessege} /> }
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
