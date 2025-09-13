import { Container } from "./styles"
const  ModalAlert = ({$showModalAlert, $alert}) => {

    const messageDiaria = $alert.filter(item => 
        new Date(item.created_at).toISOString().split('T')[0] === new Date().toISOString().split('T')[0]) || item.status === 'Não lida';

    return (
        <Container $showModalAlert={$showModalAlert} className="modal-alert">
            <h3>Notificações</h3>
            <div className="box-alert">
                {messageDiaria.map((item, index) => (
                    <div key={index} className="alert">
                        <h4>{item.titulo}</h4>
                        <p>{item.mensagem}</p>
                        <div className="date-area">
                            <h5>Por: {item.name.split(' ').slice(0, 2).join(' ')}</h5>
                            <div className="date">
                                <p>{item.created_at.split('T')[0].split('-').reverse().join('/')}</p>
                                <span>
                                    as {new Date(item.created_at).toLocaleTimeString('pt-BR', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })} 
                                    h
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    )
}

export default ModalAlert
