import { Container } from "./styles";

const CardDashboard = ({visible, $money, icon, text, cor, cor2, toogleMenu, $moneyHoje, $moneyAtrasado,  $moneyTotal }) => {

    return (
        <Container 
            style={{ backgroundColor: cor, flex : toogleMenu ? "1" : "" }}
        >
            <div className="card-header ">
                {visible && <h3>{parseFloat($money).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>}
                {!visible && 
                    <section className="list-valores">
                        <div  className="valor">
                            <h4>Hoje</h4>
                            <span style={{ color: "green" }}>{parseFloat($moneyHoje).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }</span>
                        </div>
                        <div  className="valor">
                            <h4>Atrasado</h4>
                            <span style={{ color: "red" }}>{parseFloat($moneyAtrasado).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }</span>
                        </div>
                        <div  className="valor">
                            <h4>Total</h4>
                            <span>{parseFloat($moneyTotal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }</span>
                        </div>
                    </section>
                }
                <span>{icon}</span>
            </div>
            <p
                style={{ backgroundColor: cor2 }}
            >
                {text}
            </p>
        </Container>
    )
}

export default CardDashboard;


