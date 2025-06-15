import { useState, useEffect} from "react";
import { Container, ContainerTable } from "./styles"
// components
import BtnNavigate from "../../../components/btns/btnNavigate"
import Select from "../../../components/select"
import Search from "../../../components/search"
import Pagination from "../../../components/pagination"
import FornecedorForm from "../../../components/forms/systemForm/fornecedorForm";
import Messege from "../../../components/messege";
import Loading from "../../../components/loading";
import ClientCard from "../../../components/cards/clientCard";
import CompaForm from "../../../components/forms/systemForm/compraForm";
// icons
import { FaUserPlus, FaCartPlus, FaInfoCircle  } from "react-icons/fa";
import { LuSquareEqual, LuLayoutList } from "react-icons/lu";
import { IoMdPerson } from "react-icons/io";
import { PiUserListFill , PiHandTapFill  } from "react-icons/pi";
import { BsCreditCard,  BsFillTelephonePlusFill } from "react-icons/bs";
import { BiSolidCity } from "react-icons/bi";
import { HiMiniStar } from "react-icons/hi2";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
// hooks
import useSelect from "../../../hooks/useSelect"
// context
import { useAuthContext } from "../../../context/AuthContext"
import { useFornecedores  } from "../../../context/FornecedoresContext"
import  {useClientes} from "../../../context/ClientesContext"
import { useProduct } from "../../../context/ProductContext";
//image
import Perfil from "../../../assets/perfil.png"

const Suppliers = () => {

    const {
        messege,setMessege, 
        closeModal, 
        setCloseModal, 
        buscarFornecedorSeach,
        buscarFornecedoresPorAdmin,
        modalCompras, setModalCompras,
        fornecedores, setFornecedores,
        deletarFornecedor,
        caunterFornecedores,
        textBtn, setTextBtn,
        setEstadoFornecedor,
        idFornecedor, setIdFornecedor
    } = useFornecedores();

    const { 
        setName,
        setPhone,
        setCpf,
        setCity,
    } = useClientes();

    const { setSelectForm, userId } = useAuthContext();
    const [valueSearch, setValueSearch] = useState('');
    const [dataNotFound, setDataNotFound] = useState(false);
    const [cardList, setCardList] = useState(false);
    const [btnName, setBtnName] = useState("Cadastrar");
    const [closeBtn, setCloseBtn] = useState(false);

    const [deleteControl, setDeleteControl] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [idFornecedorItem, setIdFornecedorItem] = useState(null);
    
    const dataHeader = [
        {icon: <IoMdPerson className="icon" />},
        { name: "Fornecedor", icon: <PiUserListFill  className="icon" /> },
        { name: "CPF | CNPJ", icon: <BsCreditCard className="icon" /> },
        { name: "TEL", icon: <BsFillTelephonePlusFill className="icon" /> },
        { name: "Cidade", icon: <BiSolidCity className="icon" /> },
        { name: "Estado", icon: <LuSquareEqual className="icon" /> },
        { name: "Status", icon: <HiMiniStar className="icon" /> },
        { name: "Ação", icon: <PiHandTapFill className="icon" />}
    ]

    const data = [
        { category: "Em Dias" },
        { category: "Débitos Pendentes" },
    ];

    const img = Perfil;
    const { select, setSelect } = useSelect();
    const [paginacao, setPaginacao] = useState(1);

    const itemsPorPage = 100;
    const totalPages = Math.ceil( caunterFornecedores / itemsPorPage);

    useEffect(() => {
        const hendlerGetFornecedor = async () => {
            const fornecedores = await  buscarFornecedoresPorAdmin(userId, itemsPorPage, paginacao);
            if(fornecedores.length === 0) setTimeout(() => setDataNotFound(true), 2000);
            setFornecedores(fornecedores)
        }
        hendlerGetFornecedor();
        
    }, [closeModal, paginacao, deleteControl]);

    useEffect(() => {
        const searchLength = valueSearch.split("").length;
        console.log("searchLength")

        if(searchLength <= 0) {
            const hendlerGetFornecedor = async () => {
                const fornecedores = await  buscarFornecedoresPorAdmin(userId, itemsPorPage, paginacao);
                if(fornecedores.length === 0) setTimeout(() => setDataNotFound(true), 2000);
                setFornecedores(fornecedores)
            }
            hendlerGetFornecedor();
        }
    }, [valueSearch]);

    const hendlerGetclienteSearch = async () => {
        const fornecedorSeach = await   buscarFornecedorSeach(valueSearch, userId);
        if(fornecedorSeach.length === 0) setTimeout(() => setDataNotFound(true), 2000);
        setFornecedores(fornecedorSeach)
        console.log(fornecedorSeach)
    }

    useEffect(() => {
        if(!idFornecedorItem) return
        
        const deletaItem = async () => {
            await deletarFornecedor(idFornecedorItem);
            setDeleteControl(!deleteControl)
            setMessege(null);
            setConfirmDelete(false);
        }
        deletaItem();
        console.log("confirmDelete", confirmDelete);
        setTextBtn("Cancelar");
    }, [confirmDelete]);

    const hendledeliteCliente = (id) => {
        setMessege({success: true, title: "Tem certeza que deseja deletar esse Fornecedor ?", message: "Atenção ao deletar o fornecedor, ele sera removido permanentemente e informações relacionadas ao mesmo."});
        setIdFornecedorItem(id);
        setCloseBtn(true);
    }

    return (
        <Container>
            <section className="box-filter">
                <BtnNavigate 
                    $text="Cadastrar Fornecedor" 
                    icon={<FaUserPlus className="icon" />} 
                    onClick={() => {
                        setCloseModal(true)
                        setSelectForm("cadastrar fornecedor")
                        setCloseBtn(false); 
                    }}
                />
                <div className="box-icon">
                    <LuSquareEqual 
                        className={`icon-square ${cardList && "ative-icon"}`}
                        onClick={() => setCardList(true)}
                    />
                    <LuLayoutList  
                        className={`icon-list ${!cardList && "ative-icon"}`} 
                        onClick={() => setCardList(false)}
                    />
                </div>
                <Select     
                    select={select} 
                    setSelect={setSelect}
                    data={data} 
                    $width={"170px"}
                />
                <Search 
                    valueSearch={valueSearch}
                    setValueSearch={setValueSearch}
                    $height={"35px"}
                    $width={"210px"}
                    onClick={hendlerGetclienteSearch}
                />
                <Pagination 
                    $totalPages={totalPages} 
                    $paginacao={paginacao} 
                    $setPaginacao={setPaginacao}
                />
            </section>
            <ContainerTable>
                {
                    cardList ? ( // 👈 substitua "condicao" pela condição que você quer
                    <>
                        {fornecedores.length > 0 ? (
                        <div className="body-card">
                            {fornecedores
                            .filter(item => {
                                const search = valueSearch.toLowerCase();
                                const nomeInclui = item.name?.toLowerCase().includes(search);
                                const cpfInclui = item.cpf?.toLowerCase().includes(search);
                                const telefoneInclui = item.phone?.replace(/[^\d]/g, "").includes(search);
                                const cityInclui = item.city?.toLowerCase().includes(search);
                                const contemTermo = nomeInclui || cpfInclui || telefoneInclui || cityInclui;
                                if (select !== "Todas") return item.status === select && contemTermo;
                                return contemTermo;
                            })
                            .map(item => (
                                <ClientCard
                                    key={item.id}
                                    index={item.id}
                                    name={item.name}
                                    cpf={item.cpf}
                                    phone={item.phone}
                                    city={item.city}
                                    state={item.state}
                                    status={item.status}
                                    acao={[
                                    {
                                        icon: (
                                            <IoLogoWhatsapp
                                                className="icon-whatsapp"
                                                style={{ color: "rgb(22, 199, 28)" }}
                                                onClick={() =>
                                                    window.open(
                                                    `https://api.whatsapp.com/send?phone=55${item.phone.replace(
                                                        /[^\d]/g,
                                                        ""
                                                    )}`
                                                    )
                                                }
                                            />
                                        ),
                                    },
                                    {
                                        icon: <FaCartPlus 
                                                className="icon" 
                                                style={{ color: "rgb(83, 83, 83)" }} 
                                                onClick={() => {
                                                    setModalCompras(true)
                                                    setName(item.name)
                                                    setCpf(item.cpf)
                                                    setCity(item.city)
                                                    setEstadoFornecedor(item.state)
                                                    setPhone(item.phone)
                                                    setIdFornecedorItem(item.id)
                                                    setIdFornecedor(item.id)
                                                    setBtnName("Realizar Compra");
                                                    setSelectForm("cadastrar compra")
                                                    setTextBtn("OK")
                                                }}
                                            />
                                    },
                                    {
                                        icon: <FaEdit 
                                                className="icon" 
                                                style={{ color: "rgb(14, 115, 143)" }} 
                                                onClick={() => {
                                                    setCloseModal(true)
                                                    setName(item.name)
                                                    setCpf(item.cpf)
                                                    setCity(item.city)
                                                    setPhone(item.phone)
                                                    setIdFornecedorItem(item.id)
                                                    setIdFornecedor(item.id)
                                                    setBtnName("Editar Fornecedor");
                                                    setSelectForm("editar fornecedor")
                                                    setEstadoFornecedor(item.state)
                                                }}
                                            />,
                                    },
                                    {
                                        icon: <MdDeleteForever 
                                                className="icon" 
                                                style={{ color: "rgb(224, 2, 2)" }} 
                                                onClick={() =>{ 
                                                    hendledeliteCliente(item.id)
                                                    setTextBtn("Cancelar")
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
                            Nenhum Fornecedor cadastrado!
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
                        {fornecedores.length > 0 ? (
                        <div className="body">
                            {fornecedores
                            .filter(item => {
                                const search = valueSearch.toLowerCase();
                                const nomeInclui = item.name?.toLowerCase().includes(search);
                                const cpfInclui = item.cpf?.toLowerCase().includes(search);
                                const telefoneInclui = item.phone?.replace(/[^\d]/g, "").includes(search);
                                const cityInclui = item.city?.toLowerCase().includes(search);
                                const contemTermo = nomeInclui || cpfInclui || telefoneInclui || cityInclui;
                                if (select !== "Todas") return item.status === select && contemTermo;
                                return contemTermo;
                            })
                            .map((item, index) => (
                                <ul className="body-list" key={index}>
                                <li><img src={img} alt="avatar" /></li>
                                <li>{item.name}</li>
                                <li>{item.cpf}</li>
                                <li>{item.phone}</li>
                                <li>{item.city}</li>
                                <li>{item.state}</li>
                                <li>
                                    <span style={{backgroundColor: item.status === "Nada a Pagar" ?  "rgb(78, 138, 98)" : "rgb(211, 5, 5)" }}>
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
                                    <FaCartPlus 
                                        className="icon" 
                                        style={{ color: "rgb(83, 83, 83)" }} 
                                        onClick={() => {
                                            setModalCompras(true)
                                            setName(item.name)
                                            setCpf(item.cpf)
                                            setCity(item.city)
                                            setEstadoFornecedor(item.state)
                                            setPhone(item.phone)
                                            setIdFornecedorItem(item.id)
                                            setIdFornecedor(item.id)
                                            setBtnName("Realizar Compra");
                                            setSelectForm("cadastrar compra")
                                            setTextBtn("OK")
                                        }}
                                    />
                                    {/* <FaInfoCircle
                                        className="icon" 
                                        style={{ color: "rgb(255, 162, 0)" }} 
                                        onClick={() => hendledeliteCliente(item.id)}
                                    /> */}
                                    <FaEdit 
                                        className="icon" 
                                        style={{ color: "rgb(14, 115, 143)" }} 
                                        onClick={() => {
                                            setCloseModal(true)
                                            setName(item.name)
                                            setCpf(item.cpf)
                                            setCity(item.city)
                                            setPhone(item.phone)
                                            setIdFornecedorItem(item.id)
                                            setIdFornecedor(item.id)
                                            setEstadoFornecedor(item.state)
                                            setBtnName("Editar Fornecedor");
                                            setSelectForm("editar fornecedor")
                                        }}
                                    />
                                    <MdDeleteForever 
                                        className="icon" 
                                        style={{ color: "rgb(224, 2, 2)" }} 
                                        onClick={() =>{ 
                                            hendledeliteCliente(item.id)
                                            setTextBtn("Cancelar")
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
                            Nenhum Fornecedor cadastrado!
                        </p>
                        )}
                    </section>
                    )
                }
                </ContainerTable>
                { closeModal && <FornecedorForm  $color="#fff"  setCloseModal={setCloseModal} btnName={btnName} setBtnName={setBtnName}  />}
            { modalCompras  && <CompaForm  $color="#fff"  setModalCompras={setModalCompras} btnName={btnName} setBtnName={setBtnName}  />}
            { messege && <Messege $buttonText={textBtn} button={closeBtn && <BtnNavigate $text="Deletar" onClick={() => setConfirmDelete(true)} />} $title={messege.title} $text={messege.message} $setMessege={setMessege} /> }

        </Container>
    )
}

export default Suppliers
