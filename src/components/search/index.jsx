import { Container_search } from "./styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

const Search = ({valueSearch, setValueSearch, $height, $width, onClick}) => {
    return (
        <Container_search style={{height: $height, width: $width}}>
            <input 
                type="text" 
                placeholder="Pesquisar" 
                value={valueSearch}
                onChange={(e) => setValueSearch(e.target.value)}
            />
            <FontAwesomeIcon 
                className="icon" icon={faMagnifyingGlass} 
                onClick={onClick}
            />
        </Container_search>
    )
}

export default Search;