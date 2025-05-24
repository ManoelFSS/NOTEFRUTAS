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
// icons
import { FaUserPlus } from "react-icons/fa";
import { LuSquareEqual, LuLayoutList } from "react-icons/lu";
import {  PiHandTapFill  } from "react-icons/pi";
import { HiMiniStar } from "react-icons/hi2";
import { FaEdit} from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import {  MdCategory } from "react-icons/md";
import { GrMoney } from "react-icons/gr";
import { AiOutlineAlignRight } from "react-icons/ai";
import { IoBagHandleSharp } from "react-icons/io5";
// hooks
import useSelect from "../../../hooks/useSelect"
// context
import { useAuthContext } from "../../../context/AuthContext"
import { useProduct } from "../../../context/ProductContext";
//image
import Perfil from "../../../assets/perfil.png"

const Product = () => {

    const { 
        messege, 
        setMessege, 
        closeModal, 
        setCloseModal, 
        caunterProduct, 
        buscarProductPorAdmin, 
        product, 
        setProduct,
        setName,
        setDescription,
        setCategory, category,
        setIdProduct,
        deletarProduto
    } = useProduct();
    
    const { setSelectForm, userId } = useAuthContext();
    const [valueSearch, setValueSearch] = useState('');
    const [dataNotFound, setDataNotFound] = useState(false);
    const [cardList, setCardList] = useState(false);
    const [btnName, setBtnName] = useState("Cadastrar");
    const [deleteControl, setDeleteControl] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [idProduct, setIdProductCard] = useState(null);
    const [closeBtn, setCloseBtn] = useState(false);
    
    const dataHeader = [
        {icon: <IoBagHandleSharp className="icon" />},
        { name: "Nome", icon: <AiOutlineAlignRight  className="icon" /> },
        { name: "Estoque", icon: <GrMoney className="icon" /> },
        { name: "Descrição", icon: <LuLayoutList className="icon" /> },
        { name: "Categoria", icon: <MdCategory  className="icon" /> },
        { name: "Status", icon: <HiMiniStar className="icon" /> },
        {name: "Ação", icon: <PiHandTapFill className="icon" />}
        
    ]



    const data = [
        { category: "Frutas" },
        { category: "Legumes" },
        { category: "Verduras" },
        { category: "Raízes" },
        { category: "Grãos e Cereais" },
        { category: "Ervas e Temperos" },
    ];

    const img = Perfil;
    const { select, setSelect } = useSelect();
    const [paginacao, setPaginacao] = useState(1);

    const itemsPorPage = 1000;
    const totalPages = Math.ceil(caunterProduct / itemsPorPage);

    useEffect(() => {
        const hendlerGetProduct = async () => {
            const produData = await  buscarProductPorAdmin(userId, itemsPorPage, paginacao);
            if(produData.length === 0) setTimeout(() => setDataNotFound(true), 2000);
            setProduct(produData)
        }
        hendlerGetProduct();        
    }, [closeModal, paginacao,  deleteControl]);

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
                    $text="cadastrar produto" 
                    icon={<FaUserPlus className="icon" />} 
                    onClick={() => {
                        setCloseModal(true)
                        setSelectForm("cadastrar produto") 
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
                />
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
                        {product?.length > 0 ? (
                        <div className="body-card">
                            {product
                            .filter(item => {
                                const search = valueSearch.toLowerCase();
                                const nomeInclui = item.name?.toLowerCase().includes(search);
                                const contemTermo = nomeInclui
                                if (select !== "Todos") return item.category === select && contemTermo;
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
                        {product?.length > 0 ? (
                        <div className="body">
                            {product
                            .filter(item => {
                                const search = valueSearch.toLowerCase();
                                const nomeInclui = item.name?.toLowerCase().includes(search);
                                const contemTermo = nomeInclui
                                if (select !== "Todos") return item.category === select && contemTermo;
                                return contemTermo;
                            })
                            .map((item, index) => (
                                <ul className="body-list" key={index}>
                                <li><img src={item.url_image ? item.url_image : Perfil} alt="avatar" /></li>
                                <li>{item.name}</li>
                                <li style={{fontWeight: "bold", color: item.stock === 0 ? "red" : "black" }}>{item.stock} <span>items</span></li>
                                <li style={{ fontWeight: "bold", color: item.description=== "Não informado" ? "red" : "black" }}>{item.description}</li>
                                <li>{item.category}</li>
                                <li>
                                    <span style={{ color: item.status === "Disponivel" ? "green" : "red" }}>
                                        {item.status}
                                    </span>
                                </li>
                                <li className="icons">
                                    <FaEdit 
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
                                    />
                                    <MdDeleteForever 
                                        className="icon" 
                                        style={{ color: "rgb(224, 2, 2)" }} 
                                        onClick={() => {
                                            hendledeliteProduct(item.id);
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
        </Container>
    )
}

export default Product
