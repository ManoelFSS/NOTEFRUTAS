import { createContext, useContext, useEffect, useState } from 'react';
import {
    getResumoFinanceiro,
    getResumoVendas,
    getResumoCompras,
    getResumoClientes,
    getResumoFornecedores,
    getProdutosMaisVendidos,
    getClientesQueMaisCompraram,
    getTotalParcelasVencimentoHoje,
    getParcelasAtrasadas,
    getComparativoVendasPorDia,
    getComparativoComprasPorDia,
    getResumoProdutosPorPeriodo
} from './dashboard_data';
// context
import { useAuthContext } from "./AuthContext";
import { get } from 'mongoose';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {

    const { userId } = useAuthContext();
    
    const [month, setMonth] = useState(new Date().getMonth() + 1); // obtendo o mês atual para o chart
    const [year, setYear] = useState(new Date().getFullYear()); // obtendo o ano atual para o chart
    const [monthproduto, setMonthProduto] = useState(new Date().getMonth() + 1); // obtendo o mês atual para o chart
    const [yearProdutos, setYearProduto] = useState(new Date().getFullYear()); // obtendo o ano atual para o chart


    const [loading, setLoading] = useState(true);
    const [dados, setDados] = useState({});
    const [comparativoVendas, setComparativoVendas] = useState([]);
    const [comparativoCompras, setComparativoCompras] = useState([]);
    const [comparativoProduto, setComparativoProduto] = useState([]);
    const [reloadDashboard, setReloadDashboard] = useState(null);

    useEffect(() => {
        if (!userId) return;

        const fetchDashboard = async () => {
            setLoading(true);
            try {
                const [
                    financeiro,
                    parcelasVendasHoje,
                    parcelasComprasHoje,
                    parcelasAtrasadasVendas,
                    parcelasAtrasadasCompras,
                    clientes,
                    fornecedores,
                    compras,
                    vendas,
                    produtos,
                    clientesMais,
                ] = await Promise.all([
                    getResumoFinanceiro(userId),
                    getTotalParcelasVencimentoHoje(userId, "parcelas_venda"),
                    getTotalParcelasVencimentoHoje(userId, "parcelas_compra"),
                    getParcelasAtrasadas(userId, "vendas", "parcelas_venda", "venda_id"),
                    getParcelasAtrasadas(userId, "compras", "parcelas_compra", "compra_id"),
                    getResumoClientes(userId),
                    getResumoFornecedores(userId),
                    getResumoCompras(userId),
                    getResumoVendas(userId),
                    getProdutosMaisVendidos(userId),
                    getClientesQueMaisCompraram(userId),
                ]);

                setDados({
                    financeiro,
                    parcelasVendasHoje,
                    parcelasComprasHoje,
                    parcelasAtrasadasVendas,
                    parcelasAtrasadasCompras,
                    clientes,
                    fornecedores,
                    compras,
                    vendas,
                    produtos,
                    clientesMais,
                });
            } catch (err) {
                console.error("Erro no dashboard:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, [userId, reloadDashboard]);

    useEffect(() => {
        if (!userId) return;
        const getComparativoVendas = async () => {
            const getComparativoVendas = await getComparativoVendasPorDia(userId, year, month);
            setComparativoVendas(getComparativoVendas || []);
            setLoading(false);
        }
        getComparativoVendas();
    }, [year , month, userId, reloadDashboard ]);

    useEffect(() => {
        if (!userId) return;
        const getComparativoCompras = async () => {
            const getComparativoCompras = await getComparativoComprasPorDia(userId, year, month);
            setComparativoCompras(getComparativoCompras || []);
            setLoading(false);
        }
        getComparativoCompras();
    }, [year , month, userId, reloadDashboard ]);



    useEffect(() => {
        if (!userId) return;
        const getComparativoprodutos = async () => {
            const getComparativo = await  getResumoProdutosPorPeriodo(userId, yearProdutos, monthproduto)
            setComparativoProduto(getComparativo || []);
        }
        getComparativoprodutos();
    }, [ userId,  yearProdutos, monthproduto, reloadDashboard]);

    useEffect(() => {
        console.log(dados);
        console.log(comparativoVendas);
        console.log(comparativoProduto);
    }, [dados]);

    return (
        <DashboardContext.Provider value={{ 
                month, setMonth, 
                year, setYear, 
                monthproduto, setMonthProduto,
                yearProdutos, setYearProduto,
                loading, setLoading, 
                comparativoVendas,
                comparativoCompras,
                comparativoProduto,
                dados, 
                reloadDashboard, setReloadDashboard
            }}>
        {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => useContext(DashboardContext);
