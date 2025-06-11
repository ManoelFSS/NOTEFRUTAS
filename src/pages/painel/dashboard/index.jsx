import { useState, useEffect } from "react";
import { Container_dashboard } from "./styles";
//companents
import TopProductsChart from "../../../components/charts/topProductChart";
import BarChart_x from "../../../components/charts/barChart_x";
import ChartPizza from "../../../components/charts/chartPizza";
import CardDashboard from "../../../components/cards/cardDashboard";
import StockProductChart from "../../../components/charts/stockProductChart";
import VendasChart from "../../../components/charts/vendasChart";
import Loading from "../../../components/loading";
// icons 
import { FaChartSimple, FaArrowUpRightDots, FaHandshake   } from "react-icons/fa6";
import { FaHandHoldingUsd, FaCartArrowDown  } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
// cpontext
import {useDashboard} from "../../../context/DashboardContext"


const Dashboard = ({$toogleMenu, $setToogleMenu}) => {

    const {
        comparativoVendas, 
        comparativoProduto,
        dados 
    } = useDashboard();


    return (
        <Container_dashboard >
            <section className="cards" style={{width: $toogleMenu ? "100%" : ""}}>
                <CardDashboard 
                    $toogleMenu={$toogleMenu}
                    $money={dados.financeiro} 
                    text="Vendas Total | Mês" 
                    cor={"rgb(255, 255, 255)"}
                    cor2={"rgb(3, 205, 114)"}
                    visible={true}
                    icon={
                        <FaArrowUpRightDots  
                            className="icon "
                            style={{ color: "rgb(3, 205, 114)" }}
                        />
                    } 
                />

                <CardDashboard 
                    $toogleMenu={$toogleMenu}
                    $money={"0"} 
                    text="Despesas Total | Mês" 
                    cor={"rgb(255, 255, 255)"}
                    cor2={"rgb(206, 12, 12)"}
                    visible={true}
                    icon={
                        <FaArrowUpRightDots  
                            className="icon rotate-icon"
                            style={{ color: "rgb(206, 12, 12)" }}
                        />
                    } 
                />

                <CardDashboard 
                    $toogleMenu={$toogleMenu}
                    $money={"0"} 
                    text="Pagar Hoje" 
                    cor={"rgb(255, 255, 255)"}
                    cor2={" #FF9D00"}
                    visible={true}
                    icon={
                        <RiMoneyDollarCircleFill  
                            className="icon"
                            style={{ color: " #FF9D00" }}
                        />
                    } 
                />
                
                <CardDashboard 
                    $toogleMenu={$toogleMenu}
                    $moneyHoje={dados.parcelasHoje} 
                    $moneyAtrasado={dados.parcelasAtrasadas}
                    $moneyTotal={dados.parcelasHoje + dados.parcelasAtrasadas}
                    text="A Receber" 
                    cor={"rgb(255, 255, 255)"}
                    cor2={"rgb(2, 119, 16)"}
                    visible={false}
                    icon={
                        <FaHandHoldingUsd   
                            className="icon"
                            style={{ color:"rgb(2, 119, 16)"}}
                        />
                    } 
                />
            </section>
            
            <section className="charts-container">
                <section className="charts">
                    <section className="charts-x">
                        <TopProductsChart 
                            title="Produtos" 
                            text="Mais vendidos no Mês"
                            icon={<FaChartSimple className="icon" />}
                        >
                            <BarChart_x 
                                data={dados.produtos}
                            />
                        </TopProductsChart>

                        <TopProductsChart 
                            title="Clientes" 
                            text="Que mais Compraram no Mês"
                            icon={<FaChartSimple className="icon" />}
                        >
                            <BarChart_x 
                                data={dados.clientesMais}
                            />
                        </TopProductsChart>
                    </section>

                    <TopProductsChart 
                        title="Vendas" 
                        text="do Mês"
                        icon={<FaCartArrowDown  className="icon" />}
                        width="250px"
                        height="350px"
                    >
                        <ChartPizza 
                            data={dados.vendas} 
                            pizzHeight={140}
                            pizzWidth={220}
                            innerRadius={20}
                            outerRadius={50}
                        />
                    </TopProductsChart>

                    <TopProductsChart 
                        title="Clientes" 
                        text="Total cadastrados"
                        icon={<BsFillPersonLinesFill   className="icon" />}
                        width="250px"
                        height="350px"
                    >
                        <ChartPizza 
                            data={dados.clientes} 
                            pizzHeight={180}
                            pizzWidth={220}
                            innerRadius={30}
                            outerRadius={60}
                        />
                    </TopProductsChart>

                    <TopProductsChart 
                        title="Fornecedores" 
                        text="Total cadastrados"
                        icon={<FaHandshake   className="icon" />}
                        width="250px"
                        height="350px"
                    >
                        <ChartPizza 
                            data={dados.fornecedores} 
                            pizzHeight={180}
                            pizzWidth={220}
                            innerRadius={30}
                            outerRadius={60}
                        />
                    </TopProductsChart>
                </section>
                <section className="chart-stock">
                    <VendasChart vendas={comparativoVendas}  />
                </section>
            </section>
            <section className="charts-container-vendas">
                <section className="chart-vendas"> 
                    <StockProductChart vendas={comparativoProduto} />
                </section>
            </section>       
        </Container_dashboard>
    )
}

export default Dashboard
