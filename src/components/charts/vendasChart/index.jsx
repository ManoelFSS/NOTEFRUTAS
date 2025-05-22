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
        { data: "2025-05-01", sold: 10, moneyTotal: 100 },
        { data: "2025-05-01", sold: 30, moneyTotal: 300 },
        { data: "2025-05-01", sold: 20, moneyTotal: 200 },
        { data: "2025-05-01", sold: 10, moneyTotal: 100 },
        // Dia 2 (3 vendas)
        { data: "2025-05-02", sold: 10, moneyTotal: 100 },
        { data: "2025-05-02", sold: 10, moneyTotal: 100 },
        { data: "2025-05-02", sold: 10, moneyTotal: 100 },
        // // Dia 3 (5 vendas, sábado)
        // { data: "2025-05-03", sold: 80, moneyTotal: 1200 },
        // { data: "2025-05-03", sold: 70, moneyTotal: 1050 },
        // { data: "2025-05-03", sold: 50, moneyTotal: 750 },
        // { data: "2025-05-03", sold: 60, moneyTotal: 900 },
        // { data: "2025-05-03", sold: 40, moneyTotal: 600 },
        // // Dia 4 (4 vendas, domingo)
        // { data: "2025-05-04", sold: 65, moneyTotal: 975 },
        // { data: "2025-05-04", sold: 55, moneyTotal: 825 },
        // { data: "2025-05-04", sold: 45, moneyTotal: 675 },
        // { data: "2025-05-04", sold: 35, moneyTotal: 525 },
        // // Dia 5 (3 vendas)
        // { data: "2025-05-05", sold: 40, moneyTotal: 600 },
        // { data: "2025-05-05", sold: 30, moneyTotal: 450 },
        // { data: "2025-05-05", sold: 20, moneyTotal: 300 },
        // // Dia 6 (4 vendas)
        // { data: "2025-05-06", sold: 45, moneyTotal: 675 },
        // { data: "2025-05-06", sold: 35, moneyTotal: 525 },
        // { data: "2025-05-06", sold: 25, moneyTotal: 375 },
        // { data: "2025-05-06", sold: 15, moneyTotal: 225 },
        // // Dia 7 (3 vendas)
        // { data: "2025-05-07", sold: 50, moneyTotal: 750 },
        // { data: "2025-05-07", sold: 40, moneyTotal: 600 },
        // { data: "2025-05-07", sold: 30, moneyTotal: 450 },
        // // Dia 8 (5 vendas)
        // { data: "2025-05-08", sold: 55, moneyTotal: 825 },
        // { data: "2025-05-08", sold: 45, moneyTotal: 675 },
        // { data: "2025-05-08", sold: 35, moneyTotal: 525 },
        // { data: "2025-05-08", sold: 25, moneyTotal: 375 },
        // { data: "2025-05-08", sold: 20, moneyTotal: 300 },
        // // Dia 9 (4 vendas)
        // { data: "2025-05-09", sold: 60, moneyTotal: 900 },
        // { data: "2025-05-09", sold: 50, moneyTotal: 750 },
        // { data: "2025-05-09", sold: 40, moneyTotal: 600 },
        // { data: "2025-05-09", sold: 30, moneyTotal: 450 },
        // // Dia 10 (5 vendas, sábado)
        // { data: "2025-05-10", sold: 90, moneyTotal: 1350 },
        // { data: "2025-05-10", sold: 80, moneyTotal: 1200 },
        // { data: "2025-05-10", sold: 70, moneyTotal: 1050 },
        // { data: "2025-05-10", sold: 60, moneyTotal: 900 },
        // { data: "2025-05-10", sold: 50, moneyTotal: 750 },
        // // Dia 11 (4 vendas, domingo)
        // { data: "2025-05-11", sold: 75, moneyTotal: 1125 },
        // { data: "2025-05-11", sold: 65, moneyTotal: 975 },
        // { data: "2025-05-11", sold: 55, moneyTotal: 825 },
        // { data: "2025-05-11", sold: 45, moneyTotal: 675 },
        // // Dia 12 (3 vendas)
        // { data: "2025-05-12", sold: 40, moneyTotal: 600 },
        // { data: "2025-05-12", sold: 30, moneyTotal: 450 },
        // { data: "2025-05-12", sold: 20, moneyTotal: 300 },
        // // Dia 13 (4 vendas)
        // { data: "2025-05-13", sold: 45, moneyTotal: 675 },
        // { data: "2025-05-13", sold: 35, moneyTotal: 525 },
        // { data: "2025-05-13", sold: 25, moneyTotal: 375 },
        // { data: "2025-05-13", sold: 15, moneyTotal: 225 },
        // // Dia 14 (3 vendas)
        // { data: "2025-05-14", sold: 50, moneyTotal: 750 },
        // { data: "2025-05-14", sold: 40, moneyTotal: 600 },
        // { data: "2025-05-14", sold: 30, moneyTotal: 450 },
        // // Dia 15 (5 vendas)
        // { data: "2025-05-15", sold: 55, moneyTotal: 825 },
        // { data: "2025-05-15", sold: 45, moneyTotal: 675 },
        // { data: "2025-05-15", sold: 35, moneyTotal: 525 },
        // { data: "2025-05-15", sold: 25, moneyTotal: 375 },
        // { data: "2025-05-15", sold: 20, moneyTotal: 300 },
        // // Dia 16 (4 vendas)
        // { data: "2025-05-16", sold: 60, moneyTotal: 900 },
        // { data: "2025-05-16", sold: 50, moneyTotal: 750 },
        // { data: "2025-05-16", sold: 40, moneyTotal: 600 },
        // { data: "2025-05-16", sold: 30, moneyTotal: 450 },
        // // Dia 17 (5 vendas, sábado)
        // { data: "2025-05-17", sold: 100, moneyTotal: 1500 },
        // { data: "2025-05-17", sold: 90, moneyTotal: 1350 },
        // { data: "2025-05-17", sold: 80, moneyTotal: 1200 },
        // { data: "2025-05-17", sold: 70, moneyTotal: 1050 },
        // { data: "2025-05-17", sold: 60, moneyTotal: 900 },
        // // Dia 18 (4 vendas, domingo)
        // { data: "2025-05-18", sold: 85, moneyTotal: 1275 },
        // { data: "2025-05-18", sold: 75, moneyTotal: 1125 },
        // { data: "2025-05-18", sold: 65, moneyTotal: 975 },
        // { data: "2025-05-18", sold: 55, moneyTotal: 825 },
        // // Dia 19 (3 vendas)
        // { data: "2025-05-19", sold: 40, moneyTotal: 600 },
        // { data: "2025-05-19", sold: 30, moneyTotal: 450 },
        // { data: "2025-05-19", sold: 20, moneyTotal: 300 },
        // // Dia 20 (4 vendas)
        // { data: "2025-05-20", sold: 45, moneyTotal: 675 },
        // { data: "2025-05-20", sold: 35, moneyTotal: 525 },
        // { data: "2025-05-20", sold: 25, moneyTotal: 375 },
        // { data: "2025-05-20", sold: 15, moneyTotal: 225 },
        // // Dia 21 (3 vendas)
        // { data: "2025-05-21", sold: 40, moneyTotal: 600 },
        // { data: "2025-05-21", sold: 30, moneyTotal: 450 },
        // { data: "2025-05-21", sold: 20, moneyTotal: 300 },
        // // Dia 22 (5 vendas)
        // { data: "2025-05-22", sold: 50, moneyTotal: 750 },
        // { data: "2025-05-22", sold: 40, moneyTotal: 600 },
        // { data: "2025-05-22", sold: 30, moneyTotal: 450 },
        // { data: "2025-05-22", sold: 20, moneyTotal: 300 },
        // { data: "2025-05-22", sold: 15, moneyTotal: 225 },
        // // Dia 23 (4 vendas)
        // { data: "2025-05-23", sold: 45, moneyTotal: 675 },
        // { data: "2025-05-23", sold: 35, moneyTotal: 525 },
        // { data: "2025-05-23", sold: 25, moneyTotal: 375 },
        // { data: "2025-05-23", sold: 15, moneyTotal: 225 },
        // // Dia 24 (5 vendas, sábado)
        // { data: "2025-05-24", sold: 95, moneyTotal: 1425 },
        // { data: "2025-05-24", sold: 85, moneyTotal: 1275 },
        // { data: "2025-05-24", sold: 75, moneyTotal: 1125 },
        // { data: "2025-05-24", sold: 65, moneyTotal: 975 },
        // { data: "2025-05-24", sold: 55, moneyTotal: 825 },
        // // Dia 25 (4 vendas, domingo)
        // { data: "2025-05-25", sold: 80, moneyTotal: 1200 },
        // { data: "2025-05-25", sold: 70, moneyTotal: 1050 },
        // { data: "2025-05-25", sold: 60, moneyTotal: 900 },
        // { data: "2025-05-25", sold: 50, moneyTotal: 750 },
        // // Dia 26 (3 vendas)
        // { data: "2025-05-26", sold: 35, moneyTotal: 525 },
        // { data: "2025-05-26", sold: 25, moneyTotal: 375 },
        // { data: "2025-05-26", sold: 15, moneyTotal: 225 },
        // // Dia 27 (4 vendas)
        // { data: "2025-05-27", sold: 30, moneyTotal: 450 },
        // { data: "2025-05-27", sold: 20, moneyTotal: 300 },
        // { data: "2025-05-27", sold: 15, moneyTotal: 225 },
        // { data: "2025-05-27", sold: 10, moneyTotal: 150 },
        // // Dia 28 (3 vendas)
        // { data: "2025-05-28", sold: 25, moneyTotal: 375 },
        // { data: "2025-05-28", sold: 15, moneyTotal: 225 },
        // { data: "2025-05-28", sold: 10, moneyTotal: 150 },
        // // Dia 29 (4 vendas)
        // { data: "2025-05-29", sold: 20, moneyTotal: 300 },
        // { data: "2025-05-29", sold: 15, moneyTotal: 225 },
        // { data: "2025-05-29", sold: 10, moneyTotal: 150 },
        // { data: "2025-05-29", sold: 5, moneyTotal: 75 },
        // // Dia 30 (3 vendas)
        // { data: "2025-05-30", sold: 15, moneyTotal: 225 },
        // { data: "2025-05-30", sold: 10, moneyTotal: 150 },
        // { data: "2025-05-30", sold: 5, moneyTotal: 75 },
        // // Dia 31 (4 vendas)
        // { data: "2025-05-31", sold: 10, moneyTotal: 150 },
        // { data: "2025-05-31", sold: 8, moneyTotal: 120 },
        // { data: "2025-05-31", sold: 5, moneyTotal: 75 },
        // { data: "2025-05-31", sold: 3, moneyTotal: 45 },
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
                    const barX = bar.x;
    
                    ctx.save();
                    ctx.translate(barX + 3, chart.chartArea.bottom - 20);
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
            <div className="chart-main" style={{ height: $height }}>
                <Bar data={data} options={options} plugins={[verticalLabelPlugin]} />
            </div>
        </Container>
    );
};

export default VendasChart;
