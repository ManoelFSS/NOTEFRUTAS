import { useState } from "react";
import { Container } from "./styles";
// componentes
import MonthYearSelector from "../../MonthYearSelector";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';
// context 
import { useDashboard } from "../../../context/DashboardContext";
import { useAuthContext } from "../../../context/AuthContext";


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const VendasChart = ({ vendas, $height, $ocult }) => {

    const {setMonth, setYear, comparativoVendas} = useDashboard();
    const { user } = useAuthContext();
    console.log(comparativoVendas);

    // vendas[0] = dados do mês anterior
    // vendas[1] = dados do mês atual
    const vendaAnterior = vendas[0];
    const vendaAtual = vendas[1];

    // Criar labels "Dia 1", "Dia 2", ... baseado no tamanho do array de dados
    const labels = comparativoVendas[2]?.map((_, index) => `Dia ${String(index + 1).padStart(2, '0')}`);

    const data = {
        labels,
        datasets: [
            {
                label: '',
                data: vendaAnterior,
                backgroundColor: 'rgba(0, 72, 255, 0)',  // invisível
                minBarLength: 0,
                // barThickness: 10,
            },
            {
                label: 'Vendas do mês anterior',
                data: vendaAnterior,
                backgroundColor: 'rgb(91, 113, 114)',
                minBarLength: 0,
                // barThickness: 10,
            },
            {
                label: 'Vendas do mês atual',
                data: vendaAtual,
                backgroundColor: ' #00A91F',
                minBarLength: 0,
                // barThickness: 10,
            },
        ],
    };

    // Plugin para desenhar os nomes na vertical com os labels "Dia 1", "Dia 2", ...
    const verticalLabelPlugin = {
        id: 'verticalLabels',
        afterDatasetsDraw(chart) {
            const { ctx } = chart;
            const datasetMeta = chart.getDatasetMeta(0); // pegar posição das barras invisíveis para base do x

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
                        return `${label}:  ${value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
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
        setMonth(month + 1);
        setYear(year);
    };

    return (
        <Container>
            <div className="chart-header">
                <h3>Vendas</h3>
                <div className="selects-ano-mes">
                    <MonthYearSelector userRegisterYear={user?.createdat?.slice(0, 4)} onChange={handleDateChange} />
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
            <div className="chart-main" style={{ height: "180px" }}>
                <Bar data={data} options={options} plugins={[verticalLabelPlugin]} />
            </div>
        </Container>
    );
};

export default VendasChart;
