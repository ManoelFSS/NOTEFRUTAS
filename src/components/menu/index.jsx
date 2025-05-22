import { useState, useEffect } from "react"
import { Nav } from "./styles"
// icons
import { MdDashboardCustomize, MdGroupAdd, MdAdminPanelSettings } from "react-icons/md";
import 
    { FaTruckFast, 
        FaProductHunt, 
        FaLayerGroup, 
        FaMoneyBillTransfer, 
        FaSquarePollVertical, 
        FaBuildingCircleExclamation,
        FaMapLocationDot,
        FaHandshake 
    } from "react-icons/fa6";
import Logo from "../logo";
// context
import { useAuthContext } from "../../context/AuthContext";
import {Link, useLocation } from 'react-router-dom';

const Menu = () => {
    const {user} = useAuthContext();
    const navigate = useLocation();

    const [activeLink, setActiveLink] = useState("dashboard");

    useEffect(() => {
        setActiveLink(navigate.pathname);
    }, [navigate.pathname]);

    return (
        <Nav>
            <div className="logo">
                <Logo />
                <h3>{user?.name?.split(" ")[0]}</h3>
            </div>
            <ul>
                <Link className="link" to="/dashboard">
                    <li className={activeLink === "/" || activeLink === "/dashboard" ? "active" : ""}> 
                        <MdDashboardCustomize className="icon" /> 
                        Dashboard
                    </li>
                </Link>
                <Link className="link" to="/clients">
                    <li className={activeLink === "/clients" ? "active" : ""} >
                        <MdGroupAdd className="icon" />
                        Clientes
                    </li>
                </Link>
                <Link className="link" to="/products">
                    <li className={activeLink === "/products" ? "active" : ""}>
                        <FaProductHunt className="icon" />
                        Produtos
                    </li>
                </Link>
                <Link className="link" to="/suppliers">
                    <li className={activeLink === "/suppliers" ? "active" : ""}>
                        <FaHandshake className="icon" />
                        Fornecedores
                    </li>
                </Link>
                <Link className="link" to="/sales">
                    <li className={activeLink === "/sales" ? "active" : ""}>
                        <FaLayerGroup className="icon" />
                        Vendas
                    </li>
                </Link>
                <Link className="link" to="/finances">
                    <li className={activeLink === "/finances" ? "active" : ""}>
                        <FaMoneyBillTransfer className="icon" />
                        Finanças
                    </li>
                </Link>
                <Link  className="link" to="/reports">
                    <li className={activeLink === "/reports" ? "active" : ""}>
                        <FaSquarePollVertical className="icon" />
                        Relatórios
                    </li>
                </Link>
                <Link className="link" to="/settings">
                    <li className={activeLink === "/settings" ? "active" : ""}>
                        <FaBuildingCircleExclamation className="icon" />
                        Empresa
                    </li>
                </Link>
                <Link className="link" to="/users">
                    <li className={activeLink === "/users" ? "active" : ""}>
                        <MdAdminPanelSettings className="icon" />
                        Administrador
                    </li>
                </Link>
            </ul>
        </Nav>
    )
}

export default Menu
