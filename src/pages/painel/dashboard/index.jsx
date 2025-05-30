import { Container_dashboard } from "./styles";
//companents
import TopProductsChart from "../../../components/charts/topProductChart";
import BarChart_x from "../../../components/charts/barChart_x";
import ChartPizza from "../../../components/charts/chartPizza";
import CardDashboard from "../../../components/cards/cardDashboard";
import StockProductChart from "../../../components/charts/stockProductChart";
import VendasChart from "../../../components/charts/vendasChart";
import Checkout from "../../../components/checkount";
// icons 
import { FaChartSimple, FaArrowUpRightDots, FaHandshake   } from "react-icons/fa6";
import { FaHandHoldingUsd, FaCartArrowDown  } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
//db
import { vendas, clientes, fornecedores } from "../../../DB";

const data = [{value:1000000}]

const Dashboard = ({$toogleMenu, $setToogleMenu}) => {

    return (
        <Container_dashboard >
            <section className="cards" style={{width: $toogleMenu ? "100%" : ""}}>
                <CardDashboard 
                    $toogleMenu={$toogleMenu}
                    $money={data[0]?.value} 
                    text="Vendas Total | Mês" 
                    cor={"rgb(255, 255, 255)"}
                    cor2={"rgb(3, 205, 114)"}
                    icon={
                        <FaArrowUpRightDots  
                            className="icon "
                            style={{ color: "rgb(3, 205, 114)" }}
                        />
                    } 
                />

                <CardDashboard 
                    $toogleMenu={$toogleMenu}
                    $money={data[0]?.value} 
                    text="Despesas Total | Mês" 
                    cor={"rgb(255, 255, 255)"}
                    cor2={"rgb(206, 12, 12)"}
                    icon={
                        <FaArrowUpRightDots  
                            className="icon rotate-icon"
                            style={{ color: "rgb(206, 12, 12)" }}
                        />
                    } 
                />

                <CardDashboard 
                    $toogleMenu={$toogleMenu}
                    $money={data[0]?.value} 
                    text="Pagar Hoje" 
                    cor={"rgb(255, 255, 255)"}
                    cor2={" #FF9D00"}
                    icon={
                        <RiMoneyDollarCircleFill  
                            className="icon"
                            style={{ color: " #FF9D00" }}
                        />
                    } 
                />
                
                <CardDashboard 
                    $toogleMenu={$toogleMenu}
                    $money={data[0]?.value} 
                    text="Receber Hoje" 
                    cor={"rgb(255, 255, 255)"}
                    cor2={"rgb(2, 119, 16)"}
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
                            <BarChart_x />
                        </TopProductsChart>

                        <TopProductsChart 
                            title="Clientes" 
                            text="Que mais Compraram no Mês"
                            icon={<FaChartSimple className="icon" />}
                        >
                            <BarChart_x />
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
                            data={vendas} 
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
                            data={clientes} 
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
                            data={fornecedores} 
                            pizzHeight={180}
                            pizzWidth={220}
                            innerRadius={30}
                            outerRadius={60}
                        />
                    </TopProductsChart>
                </section>
                <section className="chart-stock">
                    <VendasChart  />
                </section>
            </section>
            <section className="charts-container-vendas">
                <section className="chart-vendas"> 
                    <StockProductChart />
                </section>
            </section>
            {/* <Checkout /> */}
            
        </Container_dashboard>
    )
}

export default Dashboard
