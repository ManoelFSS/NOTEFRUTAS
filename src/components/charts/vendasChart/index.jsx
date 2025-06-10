import { Container } from "./styles"
// componentes
import MonthYearSelector from "../../MonthYearSelector"
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Função para agrupar vendas por dia
const agruparVendasPorDia = (vendas) => {
    const grouped = {};

    // Agrupar vendas por data
    vendas.forEach(({ data, sold, moneyTotal }) => {
        if (!grouped[data]) {
            grouped[data] = { data, sold: 0, moneyTotal: 0 };
        }
        grouped[data].sold += sold;
        grouped[data].moneyTotal += moneyTotal;
    });

    // Converter para array e garantir todos os dias do mês
    const result = [];
    for (let day = 1; day <= 31; day++) {
        const data = `2025-05-${day.toString().padStart(2, '0')}`;
        result.push(
            grouped[data] || { data, sold: 0, moneyTotal: 0 }
        );
    }
    return result;
};

const VendasChart = ({ $height, $ocult }) => {
    
    // Dados simulando retorno de banco de dados com múltiplas vendas por dia
    const items = [
        // Dia 1 (4 vendas)
        { data: "2025-05-01", sold: 10, moneyTotal: 3000 },
        { data: "2025-05-01", sold: 340, moneyTotal: 300 },
        { data: "2025-05-01", sold: 20, moneyTotal: 200 },
        { data: "2025-05-01", sold: 10, moneyTotal: 100 },
        // Dia 2 (3 vendas)
        { data: "2025-05-02", sold: 1044, moneyTotal: 2100 },
        { data: "2025-05-02", sold: 10, moneyTotal: 100 },
        { data: "2025-05-02", sold: 10, moneyTotal: 100 },
    ];

    // Agrupar vendas por dia
    const vendasAgrupadas = agruparVendasPorDia(items);

    // Mapeamento dos dados agrupados
    const labels = vendasAgrupadas.map(item => `Dia ${parseInt(item.data.split('-')[2])}`);
    const vendidos = vendasAgrupadas.map(item => item.sold);
    const valorEmDinheiro = vendasAgrupadas.map(item => item.moneyTotal);

    const data = {
        labels,
        datasets: [
            {
                label: 'Vendidas | Dia',
                data: vendidos,
                backgroundColor: 'rgba(0, 72, 255, 0)',
                minBarLength: 0,
            },
            {
                label: 'Vendidas | Dia',
                data: vendidos,
                backgroundColor: 'rgb(0, 72, 255)',
                minBarLength: 0,
            },
            {
                label: 'Valor total em Vendas | Dia',
                data: valorEmDinheiro,
                backgroundColor: 'rgb(4, 184, 37)',    
                minBarLength:0,
            },
        ],
    };

    // Plugin para desenhar os nomes na vertical
    const verticalLabelPlugin = {
        id: 'verticalLabels',
        afterDatasetsDraw(chart) {
            const { ctx } = chart;
            const datasetMeta = chart.getDatasetMeta(0);
    
            ctx.save();
    
            chart.data.labels.forEach((label, index) => {
                const bar = datasetMeta.data[index];
    
                if (bar) {
                    const barX = bar.x - 2;
    
                    ctx.save();
                    ctx.translate(barX + 3, chart.chartArea.bottom - 5);
                    ctx.rotate(-Math.PI / 2);
                    ctx.textAlign = 'left';
                    ctx.fillStyle = '#000';
                    ctx.font = '12px sans-serif';
                    ctx.fillText(label, 0, 0);
                    ctx.restore();
                }
            });
    
            ctx.restore();
        }
    };
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.dataset.label || '';
                        const value = context.raw;
                        if (label.includes('Valor total')) {
                            return `${label}: R$ ${value.toLocaleString('pt-BR')} reais`;
                        } else {
                            return `${label}: ${value} Unidades`;
                        }
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    display: false,
                },
                grid: {
                    display: false,
                },
                barPercentage: 0.9,
                categoryPercentage: 0.7,
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: true,
                },
            },
        },
    };

    const handleDateChange = ({ month, year }) => {
        console.log('Mês:', month, 'Ano:', year);
    };

    return (
        <Container>
            <div className="chart-header">
                <h3>Controle de Vendas</h3>
                <div className="selects-ano-mes">
                    <MonthYearSelector userRegisterYear={2023} onChange={handleDateChange} />
                </div>
                
                <div className="custom-legend">
                    {data.datasets.map((dataset, index) => (
                        dataset.label && (
                            <div key={index} className="legend-item">
                                <span
                                    className="legend-color"
                                    style={{ backgroundColor: dataset.backgroundColor }}
                                ></span>
                                {dataset.label}
                            </div>
                        )
                    ))}
                </div>
            </div>
            <div className="chart-main" style={{ height: "140px" }}>
                <Bar data={data} options={options} plugins={[verticalLabelPlugin]} />
            </div>
        </Container>
    );
};

export default VendasChart;
