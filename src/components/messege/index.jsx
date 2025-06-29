import { Container_messege } from "./styles"
// context 
import Btn from "../btns/btnSubmit"

const Messege = ({$title, $text, $setMessege, button, $buttonText, setTextBtn, setIdVenda}) => {
    
    return (
        <Container_messege>
            <div className="messege-container">
                <h3>{$title}</h3>
                <p>{$text}</p>
                <Btn 
                    $text={$buttonText}
                    onClick={() => { 
                        $setMessege(null); 
                        setTextBtn && setTextBtn("Cancelar"); 
                        setIdVenda && setIdVenda(null)
                    }}
                />
                { button }
            </div>
        </Container_messege>
    )
}

export default Messege;
