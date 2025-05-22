import React, { useState, useRef, useEffect } from "react";
import { Container_select } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Select = ({data, setSelect, select,  $setPaginacao,  $width, $ocult, setState}) => {
    const [select_heigth, setselect_heigth] = useState("0px")
    const selectRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setselect_heigth("0px");
            }
        };

        document.addEventListener("click", handleClickOutside);

        // Limpa o event listener quando o componente é desmontado
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    
    return (
        <Container_select
            ref={selectRef}
            style={{width: $width}}
            onClick={(e) => {
                e.stopPropagation();
                setselect_heigth(select_heigth === "0px" ? ([...new Set(data.map(item => item.category))].length * 30) + "px" : "0px");
            }}
        >        
            <div className="select_header" style={{width: $width}}>
                <h3>{select}</h3>
                <FontAwesomeIcon icon={faChevronDown} 
                    style={{transform: select_heigth === "0px" ? "" : "rotate(180deg)" }}
                    className="icone_select"
                />
            </div>
            <ul     
                className="select_list"
                style={{width: $width, height: select_heigth}}
            >
                { !$ocult && <li onClick={(e) => {setSelect(e.target.innerHTML); setselect_heigth("0px"); }}>Todos</li>}
                {[...new Set(data.map(item => item.category))].map((category, index) => (
                    <li 
                        style={{ backgroundColor: select === category && "#f2f2f2" }}
                        key={index}
                        onClick={(e) => {
                            setSelect(e.target.innerHTML);
                            setselect_heigth("0px");
                            // {!$ocult && $setPaginacao(1)}
                            setState(e.target.innerHTML)
                        }}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </Container_select>
    )
}

export default Select;