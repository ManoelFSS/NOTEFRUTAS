import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Container_chart_pizza } from "./styles";
import IndicadorColor from "../../indicadorColor";

// ✅ Label customizado — só o número, centralizado
const renderLabel = ({ cx, cy, midAngle, outerRadius, value }) => {
    if (value === 0) return null;
    
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 14; // 👈 desloca 5px pra fora da fatia
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="#000"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={14}
            fontWeight="bold"
        >
            {value}
        </text>
    );
};

const ChartPizza = ({data,  pizzHeight, pizzWidth, innerRadius, outerRadius}) => {

    const hendleColor = (color) => {
        
        if (color === "Total") {
            return 'rgb(120, 133, 119)';
        } else if (["Hoje",].includes(color)) {
            return 'rgb(4, 36, 141)';
        }  else if (["Parcelas a vencer hoje"].includes(color)) {
            return 'rgb(43, 36, 254)';
        } 
        else if (["Pagas",].includes(color)) {
            return 'rgb(0, 191, 10)';
        } else if (["Pagamento pendente",].includes(color)) {
            return 'rgb(255, 203, 31)';
        } else if ([ "Parcelas atrasadas"].includes(color))  {
            return 'rgb(247, 132, 0)';
        } else if (["Débitos pendentes"].includes(color))  {
            return 'rgb(255, 208, 0)';
        } else if (["Novos Clientes | Mês"].includes(color))  {
            return 'rgb(135, 194, 162)';
        } else if (["Novos Fornecedores | Mês"].includes(color))  {
            return 'rgb(3, 186, 150)';
        } else if (["Débitos a Pagar"].includes(color)) {
            return 'rgb(233, 158, 20)';
        } else if (["Cancelada"].includes(color)) {
            return 'rgb(255, 0, 0)';
        }else {
            return color;
        }
    }
    

    return (
        <Container_chart_pizza>
            <PieChart 
                key={setTimeout(() => {})} // 👈 força a remontagem quando os dados mudam
                width={ pizzWidth } 
                height={ pizzHeight }
            >
                <Pie
                    data={data}
                    cx="48%"
                    cy="50%"
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    paddingAngle={2}
                    dataKey={data => data.value === 0 ? data.value : data.value}
                    label={renderLabel} // 👈 usando o label customizado
                    labelLine={false}
                    minAngle={15}
                    isAnimationActive={true}        // Ativa a animação
                    animationBegin={500}           // ⏱️ atraso de 1000ms (1 segundo)
                    animationDuration={1000} 
                >
                    {data?.map((entry, index) => (
                        <Cell key={index} fill={hendleColor(entry.name)} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>

            <ul style={{ width: "100%" }}>
                {data?.map((entry, index) => (
                    <IndicadorColor
                        color={hendleColor(entry.name)}
                        width="10px"
                        height="10px"
                        text={entry.name}
                        key={index}
                    />
                ))}
            </ul>
        </Container_chart_pizza>
    );
};

export default ChartPizza;
