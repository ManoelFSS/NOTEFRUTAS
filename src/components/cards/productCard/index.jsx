import {Container} from "./styles"
import Perfil from "../../../assets/perfil.png"

const ProductCard = ({name, stock, description, category, status, acao, image }) => {
    return (
        <Container>
            <section className="headerCard">
                <img src={image || Perfil} alt="perfil" />
            </section>
                
            <section className="bodyCard">
                <div>
                    <h3>Nome</h3>
                    <p>{name}</p>
                </div>
                <div>
                    <h3>Estoque</h3>
                    <p>{stock}</p>
                </div>
                <div>
                    <h3>Descrição</h3>
                    <p>{description}</p>
                </div>
                <div>
                    <h3>Categoria</h3>
                    <p>{category}</p>
                </div>
                <div>
                    <h3>Status</h3>
                    <p style={{fontWeight: "bold", color: status === "Em Dias" ? "green" : "red"}}>{status}</p>
                </div>
                <div>
                    <div className="acoes">
                        { acao.map((item, index) => (
                            <p className="icon-card" key={index}>{item.icon}</p>
                        ))}
                    </div>
                </div>
            </section>
        </Container>
    )
}

export default ProductCard