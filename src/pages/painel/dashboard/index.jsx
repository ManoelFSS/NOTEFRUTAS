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
import Checkout from "../../../components/checkount";
// icons 
import { FaChartSimple, FaArrowUpRightDots, FaHandshake   } from "react-icons/fa6";
import { FaHandHoldingUsd, FaCartArrowDown  } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
// context
import { useAuthContext } from "../../../context/AuthContext"
import { useProduct } from "../../../context/ProductContext"
// data
import { 
    getResumoFinanceiro, 
    getTotalParcelasVencimentoHoje, 
    getParcelasAtrasadas,
    getResumoClientes,
    getResumoFornecedores,
    getResumoVendas,
    getProdutosMaisVendidos,
    getClientesQueMaisCompraram,
    getComparativoVendasPorDia
} from "./dashboard_data";

const data = [{value:1000000}]

const Dashboard = ({$toogleMenu, $setToogleMenu}) => {

    const { month, year} = useProduct();
    const { userId } = useAuthContext();

    const [financeiro, setFinanceiro  ] = useState([0])
    const [totalDeParcelasAReceberHoje , setTotalDeParcelasAReceberHoje  ] = useState([0])
    const [totalDeParcelasAtrasadas , setTotalDeParcelasAtrasadas  ] = useState([0])
    const [totalDeClientes , setTotalDeClientes  ] = useState([0])
    const [totalDeFornecedores , setTotalDeFornecedores  ] = useState([0])
    const [totalDeVendas , setTotalDeVendas  ] = useState([0])
    const [totalDeProdutos , setTotalDeProdutos  ] = useState([])
    const [comparativoVendas , setComparativoVendas  ] = useState([])
    const [totalDeClientsMaisCompraram , setTotalDeClientsMaisCompraram  ] = useState([])

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;

        const hendleFinanceiro = async () => {
                console.log(userId, year, month);
                setLoading(true);
            try {
                const getFinanceiro = await getResumoFinanceiro(userId);
                const getParcelasDoDia = await getTotalParcelasVencimentoHoje(userId);
                const getTotalPacerlasAtrasadas = await getParcelasAtrasadas(userId);
                const getTotalData = await getResumoClientes(userId);
                const getTotalFornecedores = await getResumoFornecedores(userId);
                const getTotalVendas = await getResumoVendas(userId);
                const getTotalProdutos = await getProdutosMaisVendidos(userId);
                const getTotalClientsMaisCompraram = await getClientesQueMaisCompraram(userId);
                
                setFinanceiro(getFinanceiro || [0]);
                setTotalDeParcelasAReceberHoje(getParcelasDoDia || [0]);
                setTotalDeParcelasAtrasadas(getTotalPacerlasAtrasadas || [0]);
                setTotalDeClientes(getTotalData || [0]);
                setTotalDeFornecedores(getTotalFornecedores || [0]);
                setTotalDeVendas(getTotalVendas || [0]);
                setTotalDeClientsMaisCompraram(getTotalClientsMaisCompraram || []);
                setTotalDeProdutos(getTotalProdutos || []);
                
            } catch (error) {
            console.error('Erro ao carregar dados do dashboard:', error);
                setTotalDeProdutos([]);
            }finally {
                setLoading(false);
            }
        };
        hendleFinanceiro();
    }, []);

    useEffect(() => {
        const getComparativoVendas = async () => {
            const getComparativoVendas = await getComparativoVendasPorDia(userId, year, month);
            setComparativoVendas(getComparativoVendas || []);
        }
        getComparativoVendas();

    }, [ year, month]);

    useEffect(() => {
        console.log(financeiro)
        console.log(totalDeParcelasAReceberHoje)
        console.log(totalDeParcelasAtrasadas)
        console.log(totalDeClientes)
        console.log(totalDeFornecedores)
        console.log(totalDeVendas)
        console.log(totalDeProdutos)
        console.log(totalDeClientsMaisCompraram)
        console.log(comparativoVendas)
    }, [financeiro])

    if (loading) {
        return <Loading />
    }


    return (
        <Container_dashboard >
            <section className="cards" style={{width: $toogleMenu ? "100%" : ""}}>
                <CardDashboard 
                    $toogleMenu={$toogleMenu}
                    $money={financeiro} 
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
                    $money={data[0]?.value} 
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
                    $money={data[0]?.value} 
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
                    $moneyHoje={totalDeParcelasAReceberHoje} 
                    $moneyAtrasado={totalDeParcelasAtrasadas}
                    $moneyTotal={totalDeParcelasAReceberHoje + totalDeParcelasAtrasadas}
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
                                data={totalDeProdutos}
                            />
                        </TopProductsChart>

                        <TopProductsChart 
                            title="Clientes" 
                            text="Que mais Compraram no Mês"
                            icon={<FaChartSimple className="icon" />}
                        >
                            <BarChart_x 
                                data={totalDeClientsMaisCompraram}
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
                            data={totalDeVendas} 
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
                            data={totalDeClientes} 
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
                            data={totalDeFornecedores} 
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
                    <StockProductChart />
                </section>
            </section>
            {/* <Checkout /> */}
            
        </Container_dashboard>
    )
}

export default Dashboard
