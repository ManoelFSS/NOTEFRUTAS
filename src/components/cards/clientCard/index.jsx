import {Container} from "./styles"
import Perfil from "../../../assets/perfil.png"

const ClientCard = ({name, cpf, phone, city, state, status, acao }) => {
    return (
        <Container>
            <section className="headerCard">
                <img src={Perfil} alt="perfil" />
            </section>
                
            <section className="bodyCard">
                <div>
                    <h3>Nome</h3>
                    <p>{name}</p>
                </div>
                <div>
                    <h3>CPF | CNPJ</h3>
                    <p>{cpf}</p>
                </div>
                <div>
                    <h3>Telefone</h3>
                    <p>{phone}</p>
                </div>
                <div>
                    <h3>Cidade</h3>
                    <p>{city}</p>
                </div>
                <div>
                    <h3>Estado</h3>
                    <p>{state}</p>
                </div>
                <div>
                    <h3>Status</h3>
                    <p style={{fontWeight: "bold", color: status === "Em Dias" ? "green" : "red"}}>{status}</p>
                </div>
                <div>
                    <div className="acoes">
                        { acao.map((item, index) => (
                            <p key={index}>{item.icon}</p>
                        ))}
                    </div>
                </div>
            </section>
        </Container>
    )
}

export default ClientCard