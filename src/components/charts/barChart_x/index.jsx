import { Container_bar_x, BarActive  } from "./styles"

const BarChart_x = ({ data}) => {
    
    if (! data) return console.log('Sem produtos');
    const maxValue = Math.max(... data.map(item => item.value)) || 1;


    const formatValue = (value) => {
        if (value >= 1_000_000_000_000) return (value / 1_000_000_000_000).toFixed(1).replace('.0', '') + 'T';
        if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(1).replace('.0', '') + 'B';
        if (value >= 1_000_000) return (value / 1_000_000).toFixed(1).replace('.0', '') + 'M';
        if (value >= 1_000) return (value / 1_000).toFixed(1).replace('.0', '') + 'K';
        return value.toString();
    }

    return (
        <Container_bar_x>
                { data.sort((a, b) => b.value - a.value).slice(0, 3).map((item, index) => {
                    const percent = (item.value / maxValue) * 100;
                    return (
                        <div key={index}>
                            <h3>{item.name}</h3>
                            <section className="bar-area">
                                <div className="value-hover">
                                    <p>{item.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                </div>
                                <div className="bar">
                                    <div className="bar-fill">
                                        <BarActive style={{ width: `${percent}%` }} $delay={index * 0.2} ></BarActive>
                                    </div>
                                </div>
                                <p className="value">{formatValue(item.value)}</p>
                            </section>    
                        </div>                 
                    );
                })}
        </Container_bar_x>
    )
}

export default BarChart_x

