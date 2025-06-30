import { Container } from "./styles"
import {Link} from 'react-router-dom'

const TopProductChart= ({children, title, text, icon, width,  height, link}) => {
    
    return (
        <Container style={{ height: height}} >
            <div className="chart-header">
                <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                </div>
                <div>
                    {icon}
                </div>
            </div>
            <div className="chart-main">
                {children}  
            </div>
            <div className="chart-footer">
                <Link className="link" to={link}><p>Ver Mais</p></Link> 
            </div>
        </Container>
    )
}

export default TopProductChart
