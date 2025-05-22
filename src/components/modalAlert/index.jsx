import { Container } from "./styles"
const  ModalAlert = ({$showModalAlert, $alert}) => {
    return (
        <Container $showModalAlert={$showModalAlert} className="modal-alert">
            <h3>Notificações</h3>
            <div className="box-alert">
                {$alert.map((item, index) => (
                    <div key={index} className="alert">
                        <h4>{item.name}</h4>
                        <p>{item.menssage}</p>
                        <span>{item.creatDate.split('T')[0]}</span>
                    </div>
                ))}
            </div>
        </Container>
    )
}

export default ModalAlert
