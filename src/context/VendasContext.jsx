import { createContext, useContext, useState } from "react";
import { supabase } from '../services/supabase';
// context
import { useAuthContext } from "./AuthContext";


const VendasContext = createContext();

export const VendasProvider = ({ children }) => {

    const {user, userId} = useAuthContext();
    
    const [loading, setLoading] = useState(false);
    const [messege, setMessege] = useState(null);// controle do componente messege
    const [closeModal, setCloseModal] = useState(false);
    const [vendas, setVendas] = useState([]);// lista de clientes
    const [caunterVendas, setCaunterVendas] = useState(0);

    const [name, setName] = useState('');// controle do campo name
    const [phone, setPhone] = useState('');// controle do campo phone
    const [idVenda, setIdVenda] = useState('');// controle do campo idClient


    const editarVenda = async (novosDados, id) => {
        setLoading(true);

        try {
            const { error } = await supabase
            .from("fornecedores")
            .update(novosDados)
            .eq("id", id);

            if (error) throw error;

            console.log("Fornecedor atualizado com sucesso!");
            setCloseModal(false);
            setName('');
            setPhone('');
            setCpf('');
            setCity('');
            setEstadoFornecedor('Escolha o estado');
        } catch (error) {
            console.error("Erro ao atualizar o fornecedor:", error.message || error);
        } finally {
            setTimeout(() => {
            setLoading(false);
            }, 2000);
        }
    };


    const deletarVenda = async (idDoCliente) => {
        try {
            const { error } = await supabase
            .from("fornecedores")
            .delete()
            .eq("id", idDoCliente);

            if (error) throw error;

            console.log("Fornecedor deletado com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar fornecedor:", error.message || error);
        }
    };



    // Função para contar total de Vendas de um admin
    const contarVendas = async (adminId) => {
        const { count, error } = await supabase
            .from("vendas")
            .select("*", { count: "exact", head: true })
            .eq("adminid", adminId);

        if (error) { throw error;}
        return count;
    };


   // Função principal para buscar vendas de um admin com paginação, incluindo pendentes ou atrasadas
    const buscarVendasPorAdmin = async (adminId, limitepage, paginacao, ano, mes) => {
        try {
            // Validar parâmetros
            if (!adminId || limitepage <= 0 || paginacao < 1 || !ano || !mes) {
                throw new Error("Parâmetros inválidos: adminId, limitepage, paginacao, ano ou mes");
            }

            const totalVendas = await contarVendas(adminId);
            setCaunterVendas(totalVendas); // <-- setar em seu estado

            // Construir intervalo de datas (do primeiro ao último dia do mês)
            const inicioMes = new Date(ano, mes - 1, 1).toISOString(); // dia 1
            const fimMes = new Date(ano, mes, 0, 23, 59, 59, 999).toISOString(); // último dia do mês

            // Calcular range para paginação
            const from = (paginacao - 1) * limitepage;
            const to = from + limitepage - 1;

            // Contar total de vendas do mês ou com status pendente/atrasada
            const { count, error: countError } = await supabase
                .from("vendas")
                .select("id", { count: "exact", head: true })
                .eq("adminid", adminId)
                .or(
                    `and(created_at.gte.${inicioMes},created_at.lte.${fimMes}),status.eq.pendente,status.eq.atrasada`
                );

            if (countError) throw countError;

            // Atualiza o contador
            setCaunterVendas(count);

            // Buscar vendas com dados das parcelas e itens
            const { data, error } = await supabase
                .from("vendas")
                .select(`
                    *,
                    parcelas_venda(*),
                    itens_venda(*)
                `)
                .eq("adminid", adminId)
                .or(
                    `and(created_at.gte.${inicioMes},created_at.lte.${fimMes}),status.eq.pendente,status.eq.atrasada`
                )
                .order("contador_vendas", { ascending: false})// ordena pelo contador - false de forma decrescente
                .range(from, to);

            if (error) throw error;

            return data;
        } catch (error) {
            console.error("Erro ao buscar vendas:", error);
            throw error;
        }
    };

    
    const buscarVendasSeach = async (searchText, adminId) => {
        if (!searchText || !adminId) return [];

        console.log("vendasSeach");
        try {
            // Normaliza o texto
            const texto = `%${searchText.toLowerCase()}%`;
            // Busca múltiplas colunas com `or`
            const { data, error } = await supabase
            .from("vendas")
            .select("*")
            .eq("adminid", adminId)
            .or(`name.ilike.${texto},phone.ilike.${texto}`);

            if (error) throw error;

            return data;
        } catch (error) {
            console.error("Erro ao buscar venda:", error.message || error);
            return [];
        }
    };


    return (
        <VendasContext.Provider value={{ 
                buscarVendasPorAdmin,
                loading, setLoading,
                messege, setMessege,
                closeModal, setCloseModal,
                vendas, setVendas,
                caunterVendas, setCaunterVendas,
                buscarVendasSeach,
                editarVenda,
                deletarVenda,
                name, setName,
                phone, setPhone,
                idVenda, setIdVenda,
            }}>
        {children}
        </VendasContext.Provider>
    );
};

// Hook para usar o contexto
export const useVendas = () => useContext(VendasContext);
