import { Container_company } from "./styles"

const Company = () => {
    return (
        <Container_company >
            <section className="banner">
                <h1>Dados da Empresa</h1>
            </section>

            <section className="container-company">
                <div className="logo-company">
                    <img src="https://ceasa-digital.netlify.app/assets/carrinho-CxB0h3LS.png" alt="logo" />
                </div>

                <div className="info-company">
                    <div className="company">
                        <div>
                            <h3>Nome:</h3>
                            <p>Trin-Codex</p>
                        </div>
                        <div>
                            <h3>Telefone:</h3>
                            <p>(11) 99999-9999</p>
                        </div>
                        <div>
                            <h3>Endereço:</h3>
                            <p>Av. Paulista, 1234</p>
                        </div>
                        <div>
                            <h3>CEP:</h3>
                            <p>12345-678</p>
                        </div>
                    </div>
                </div>
            </section>

        </Container_company>
    )
}

export default Company
