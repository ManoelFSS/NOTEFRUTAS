import { useState, useEffect} from "react";
import { Container, ContainerTable } from "./styles"
// components
import BtnNavigate from "../../../components/btns/btnNavigate"
import Select from "../../../components/select"
import Search from "../../../components/search"
import Pagination from "../../../components/pagination"
import ClientForm from "../../../components/forms/systemForm/clientForm";
import Messege from "../../../components/messege";
import Loading from "../../../components/loading";
import ClientCard from "../../../components/cards/clientCard";
import VendasForm from "../../../components/forms/systemForm/vendasForm";
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
import { useClientes } from "../../../context/ClientesContext"
//image
import Perfil from "../../../assets/perfil.png"

const Client = () => {

    const {
        messege, 
        setMessege, 
        closeModal, 
        setCloseModal, 
        buscarClientesPorAdmin, 
        clientes, 
        setClientes, 
        caunterClientes,  
        buscarClienteSeach,
        setName,
        setPhone,
        setCpf,
        setCity,
        setEstado,
        setIdClient,
        deletarCliente,
    } = useClientes();

    const { setSelectForm, userId } = useAuthContext();
    const [valueSearch, setValueSearch] = useState('');
    const [dataNotFound, setDataNotFound] = useState(false);
    const [cardList, setCardList] = useState(false);
    const [btnName, setBtnName] = useState("Cadastrar");
    const [closeBtn, setCloseBtn] = useState(false);

    const [deleteControl, setDeleteControl] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [idClientItem, setIdClientItem] = useState(null);
    
    const dataHeader = [
        {icon: <IoMdPerson className="icon" />},
        { name: "Nome", icon: <PiUserListFill  className="icon" /> },
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

    const itemsPorPage = 10;
    const totalPages = Math.ceil(caunterClientes / itemsPorPage);

    useEffect(() => {
        const hendlerGetcliente = async () => {
            const clientes = await  buscarClientesPorAdmin(userId, itemsPorPage, paginacao);
            if(clientes.length === 0) setTimeout(() => setDataNotFound(true), 2000);
            setClientes(clientes)
        }
        hendlerGetcliente();
        
    }, [closeModal, paginacao, deleteControl]);

    useEffect(() => {
        const searchLength = valueSearch.split("").length;

        if(searchLength <= 0) {
            const hendlerGetcliente = async () => {
                const clientes = await  buscarClientesPorAdmin(userId, itemsPorPage, paginacao);
                if(clientes.length === 0) setTimeout(() => setDataNotFound(true), 2000);
                setClientes(clientes)
            }
            hendlerGetcliente();
        }
    }, [valueSearch]);

    const hendlerGetclienteSearch = async () => {
        const clientSeach = await  buscarClienteSeach(valueSearch, userId);
        if(clientSeach.length === 0) setTimeout(() => setDataNotFound(true), 2000);
        setClientes(clientSeach)
        console.log(clientes)
    }

    useEffect(() => {
        if(!idClientItem) return
        
        const deletaItem = async () => {
            await deletarCliente(idClientItem);
            setDeleteControl(!deleteControl)
            setMessege(null);
            setConfirmDelete(false);
        }
        deletaItem();
        console.log("confirmDelete", confirmDelete);
    }, [confirmDelete]);

    const hendledeliteCliente = (id) => {
        setMessege({success: true, title: "Tem certeza que deseja deletar esse Cliente ?", message: "Atenção ao deletar o cliente ele sera removido permanentemente e informações relacionadas ao mesmo"});
        setIdClientItem(id);
        setCloseBtn(true);
    }

    return (
        <Container>
            <section className="box-filter">
                <BtnNavigate 
                    $text="Cadastrar Cliente" 
                    icon={<FaUserPlus className="icon" />} 
                    onClick={() => {
                        // setCloseModal(true)
                        setSelectForm("cadastrar cliente") 
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
                    $width={"196px"}
                />
                <Search 
                    valueSearch={valueSearch}
                    setValueSearch={setValueSearch}
                    $height={"35px"}
                    $width={"210px"}
                    onClick={hendlerGetclienteSearch}
                />
                {caunterClientes > 10 && <Pagination 
                    $totalPages={totalPages} 
                    $paginacao={paginacao} 
                    $setPaginacao={setPaginacao}
                />}
            </section>
            <ContainerTable>
                {
                    cardList ? ( // 👈 substitua "condicao" pela condição que você quer
                    <>
                        {clientes.length > 0 ? (
                        <div className="body-card">
                            {clientes
                            .filter(item => {
                                const search = valueSearch.toLowerCase();
                                const nomeInclui = item.name?.toLowerCase().includes(search);
                                const cpfInclui = item.cpf?.toLowerCase().includes(search);
                                const telefoneInclui = item.phone?.replace(/[^\d]/g, "").includes(search);
                                const cityInclui = item.city?.toLowerCase().includes(search);
                                const contemTermo = nomeInclui || cpfInclui || telefoneInclui || cityInclui;
                                if (select !== "Todos") return item.status === select && contemTermo;
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
                                        icon: <FaEdit 
                                                className="icon" 
                                                style={{ color: "rgb(14, 115, 143)" }} 
                                                onClick={() => {
                                                    setCloseModal(true)
                                                    setName(item.name)
                                                    setCpf(item.cpf)
                                                    setCity(item.city)
                                                    setEstado(item.state)
                                                    setPhone(item.phone)
                                                    setIdClient(item.id)
                                                    setBtnName("Editar Cliente");
                                                    setSelectForm("editar cliente")
                                                }}
                                            />,
                                    },
                                    {
                                        icon: <MdDeleteForever 
                                                className="icon" 
                                                style={{ color: "rgb(224, 2, 2)" }} 
                                                onClick={() => hendledeliteCliente(item.id)}    
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
                        {clientes.length > 0 ? (
                        <div className="body">
                            {clientes
                            .filter(item => {
                                const search = valueSearch.toLowerCase();
                                const nomeInclui = item.name?.toLowerCase().includes(search);
                                const cpfInclui = item.cpf?.toLowerCase().includes(search);
                                const telefoneInclui = item.phone?.replace(/[^\d]/g, "").includes(search);
                                const cityInclui = item.city?.toLowerCase().includes(search);
                                const contemTermo = nomeInclui || cpfInclui || telefoneInclui || cityInclui;
                                if (select !== "Todos") return item.status === select && contemTermo;
                                return contemTermo;
                            })
                            .map((item, index) => (
                                <ul className="body-list" key={index}>
                                <li><img src={img} alt="avatar" /></li>
                                <li>{item.name}</li>
                                <li style={{ fontWeight: "bold", color: item.cpf === "Não informado" ? "red" : "black" }}>{item.cpf}</li>
                                <li>{item.phone}</li>
                                <li>{item.city}</li>
                                <li>{item.state}</li>
                                <li>
                                    <span style={{ color: item.status === "Em Dias" ? "green" : "red" }}>
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
                                            setCloseModal(true)
                                            setName(item.name)
                                            setCpf(item.cpf)
                                            setCity(item.city)
                                            setEstado(item.state)
                                            setPhone(item.phone)
                                            setIdClient(item.id)
                                            setBtnName("Realizar Venda");
                                            setSelectForm("cadastrar venda")
                                        }}
                                    />
                                    <FaInfoCircle
                                        className="icon" 
                                        style={{ color: "rgb(255, 162, 0)" }} 
                                        onClick={() => hendledeliteCliente(item.id)}
                                    />
                                    <FaEdit 
                                        className="icon" 
                                        style={{ color: "rgb(14, 115, 143)" }} 
                                        onClick={() => {
                                            setCloseModal(true)
                                            setName(item.name)
                                            setCpf(item.cpf)
                                            setCity(item.city)
                                            setEstado(item.state)
                                            setPhone(item.phone)
                                            setIdClient(item.id)
                                            setBtnName("Editar Cliente");
                                            setSelectForm("editar cliente")
                                        }}
                                    />
                                    <MdDeleteForever 
                                        className="icon" 
                                        style={{ color: "rgb(224, 2, 2)" }} 
                                        onClick={() => hendledeliteCliente(item.id)}
                                    />
                                </li>
                                </ul>
                            ))}
                        </div>
                        ) : !dataNotFound ? (
                        <div style={{ margin: "auto" }}><Loading /></div>
                        ) : (
                        <p style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "auto" }}>
                            Nenhum cliente cadastrado!
                        </p>
                        )}
                    </section>
                    )
                }
                </ContainerTable>
                {false &&< ClientForm $color="#fff"  setCloseModal={setCloseModal} btnName={btnName} setBtnName={setBtnName}  />}
            {closeModal && <VendasForm $color="#fff"  setCloseModal={setCloseModal} btnName={btnName} setBtnName={setBtnName}  />}
            { messege && <Messege $buttonText="Cancelar" button={closeBtn && <BtnNavigate $text="Deletar " onClick={() => setConfirmDelete(true)} />} $title={messege.title} $text={messege.message} $setMessege={setMessege} /> }

        </Container>
    )
}

export default Client
