import { useState } from "react";
import { Container } from "./styles"
// // componentes
import Select from "../../select"
import Pagination from "../../pagination"
import useSelect from "../../../hooks/useSelect"
import MonthYearSelector from "../../MonthYearSelector"

import React from 'react';
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

const StockProductChart = ({ $height, $ocult }) => {
    
    const items = [
        { fruta: 'Mamão', stock: 1000, sold: 200, minStock: 100, moneyTotal: 2000, category: 'Frutas' },
        { fruta: 'Melancia', stock: 1500, sold: 3000, minStock: 100, moneyTotal: 44000, category: 'Frutas' },
        { fruta: 'Meçã', stock: 3000, sold: 3000, minStock: 100, moneyTotal: 20000, category: 'Frutas' },
        { fruta: 'Melão', stock: 2000, sold: 3000, minStock: 100, moneyTotal: 15000, category: 'Frutas' },
        { fruta: 'Menga', stock: 4000, sold: 3000, minStock: 100, moneyTotal: 15000, category: 'Frutas' },
        { fruta: 'Moranga', stock: 15000, sold: 3000, minStock: 100, moneyTotal: 30000, category: 'Frutas' },
        { fruta: 'Laranja', stock: 1500, sold: 3000, minStock: 100, moneyTotal: 24000, category: 'Frutas' },
        { fruta: 'Banana', stock: 3000, sold: 3000, minStock: 100, moneyTotal: 20000, category: 'Frutas' },
        { fruta: 'Abacaxi', stock: 2000, sold: 3000, minStock: 100, moneyTotal: 15000, category: 'Frutas' },
        { fruta: 'Uva', stock: 4000, sold: 3000, minStock: 100, moneyTotal: 15000, category: 'Frutas' },

        { fruta: 'Cebola', stock: 5000, sold: 10000, minStock: 100, moneyTotal: 30000, category: 'Legumes' },
        { fruta: 'Pepino', stock: 1500, sold: 10000, minStock: 100, moneyTotal: 24000, category: 'Legumes' },
        { fruta: 'Tomate', stock: 3000, sold: 10000, minStock: 100, moneyTotal: 20000, category: 'Legumes' },
        { fruta: 'Alface', stock: 2000, sold: 10000, minStock: 100, moneyTotal: 15000, category: 'Legumes' },
        { fruta: 'Pimentão', stock: 4000, sold: 10000, minStock: 100, moneyTotal: 15000, category: 'Legumes' },
        { fruta: 'Cenoura', stock: 5000, sold: 10000, minStock: 100, moneyTotal: 30000, category: 'Legumes' },
        { fruta: 'Cebolinha', stock: 1500, sold: 10000, minStock: 100, moneyTotal: 24000, category: 'Legumes' },
        { fruta: 'Batata', stock: 3000, sold: 10000, minStock: 100, moneyTotal: 20000, category: 'Legumes' },
        { fruta: 'Alcachofra', stock: 2000, sold: 10000, minStock: 100, moneyTotal: 15000, category: 'Legumes' },
        { fruta: 'Beterraba', stock: 4000, sold: 10000, minStock: 100, moneyTotal: 15000, category: 'Legumes' },

        
        { fruta: 'Cebola', stock: 5000, sold: 10000, minStock: 100, moneyTotal: 30000, category: 'Legumes' },
        { fruta: 'Pepino', stock: 1500, sold: 10000, minStock: 100, moneyTotal: 24000, category: 'Legumes' },
        { fruta: 'Tomate', stock: 3000, sold: 10000, minStock: 100, moneyTotal: 20000, category: 'Legumes' },
        { fruta: 'Alface', stock: 2000, sold: 10000, minStock: 100, moneyTotal: 15000, category: 'Legumes' },
        { fruta: 'Pimentão', stock: 4000, sold: 10000, minStock: 100, moneyTotal: 15000, category: 'Legumes' },
        { fruta: 'Cenoura', stock: 5000, sold: 10000, minStock: 100, moneyTotal: 30000, category: 'Legumes' },
        { fruta: 'Cebolinha', stock: 1500, sold: 10000, minStock: 100, moneyTotal: 24000, category: 'Legumes' },
        { fruta: 'Batata', stock: 3000, sold: 10000, minStock: 100, moneyTotal: 20000, category: 'Legumes' },
        { fruta: 'Alcachofra', stock: 2000, sold: 10000, minStock: 100, moneyTotal: 15000, category: 'Legumes' },
        { fruta: 'Beterraba', stock: 4000, sold: 10000, minStock: 100, moneyTotal: 15000, category: 'Legumes' },
    ]

    const { select, setSelect  } = useSelect()
    const [paginacao, setPaginacao] = useState(1);

    const itemsPerPage = 15;
    const startIndex = (paginacao - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // fiter e mimite 12 items
    const filteredItems = items.filter(item => select !== "Todos" ? item.category === select : item)
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const labels = filteredItems.slice(startIndex, endIndex).map(item => item.fruta);

    const estoque = items.map(item =>
        item.stock 
    );
    
    const vendidos = items.map(item =>
        item.sold 
    );
    
    const valorEmDinheiro = items.map(item =>
        item.moneyTotal 
    );
    
    const esgotado = items.map(item =>
        item.stock <= 0 && item.sold > 0 ? item.sold : null
    );
    

    const data = {
        labels,
        datasets: [
            {
                label: '',
                data: estoque,
                backgroundColor: 'rgba(255, 157, 0, 0)',
                minBarLength:3, 
                // barThickness: 10,
            },
            {
                label: 'Estoque atual',
                data: estoque,
                backgroundColor: ' #FF9D00',
                minBarLength:3, 
                // barThickness: 10,
            },
            {
                label: 'vendidas | Mês',
                data: vendidos,
                backgroundColor: 'rgb(0, 72, 255)',
                minBarLength:3,
                // barThickness: 10,
            },
            {
                label: 'Valor total em Vendas | Mês',
                data: valorEmDinheiro,
                backgroundColor: 'rgb(4, 184, 37)',    
                minBarLength: 3, 
                // barThickness: 10,
            },
        ],
    };

    // Plugin para desenhar os nomes na vertical
    const verticalLabelPlugin = {
        id: 'verticalLabels',
        afterDatasetsDraw(chart) {
        const { ctx } = chart;
        const datasetMeta = chart.getDatasetMeta(0); // Índice 2 = 'Vendidos'
    
        ctx.save();
    
        chart.data.labels.forEach((label, index) => {
            const bar = datasetMeta.data[index];
    
            if (bar) {
            const barX = bar.x + 5 ;
    
            ctx.save();
            ctx.translate(barX , chart.chartArea.bottom - 20);
            ctx.rotate(-Math.PI / 2);
            ctx.textAlign = 'left';
            ctx.fillStyle = '#000';
            ctx.font = ' 14px sans-serif';
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
                    
                    // Se for o dataset "Esgotado", mostra valor negativo
                    if (label === 'Valor total em Vendas') {
                        return `${label}: R$ ${value.toLocaleString('pt-BR')} reais`;
                    }else {
                        return `${label}: ${value} Unidades`; 
                    }
                    
                    // Outros normais
                    return `${label}: ${value}`;
                },
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    display:false, // esconde os nomes padrões
                },
                grid: {
                    display: false,
                },
                barPercentage: 1.0,
                categoryPercentage: 0.8,
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
        // Aqui você pode chamar seu hook com os dados
    };


    return (
        <Container >
            <div className="chart-header">
                <Select 
                    data={items} 
                    select={select} 
                    setSelect={setSelect}
                    $setPaginacao={setPaginacao}
                    $width={"140px"}
                />
                <Pagination 
                    $totalPages={totalPages} 
                    $paginacao={paginacao} 
                    $setPaginacao={setPaginacao}
                />
                <h3>Controle de Estoque</h3>

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
            <div className="chart-main" style={{ height:  "285px"}}>
                <Bar data={data} options={options} plugins={[verticalLabelPlugin]} />
            </div>
        </Container>
    );
};

export default StockProductChart;



