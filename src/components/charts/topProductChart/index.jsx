import { Container } from "./styles"

const TopProductChart= ({children, title, text, icon, width,  height}) => {
    
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
                <p>Ver Mais</p>
            </div>
        </Container>
    )
}

export default TopProductChart
