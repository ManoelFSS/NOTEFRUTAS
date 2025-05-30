import { createContext, useContext, useState } from "react";
import { registerClientSchema } from "../validationSchemas/Schemas"
import { supabase } from '../services/supabase';


const VendasContext = createContext();

export const VendasProvider = ({ children }) => {
    
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



   // Função para contar total de clientes de um admin
    const contarVendas = async (adminId) => {
        const { count, error } = await supabase
            .from("vendas")
            .select("*", { count: "exact", head: true })
            .eq("adminid", adminId);

        if (error) {
            throw error;
        }

        return count;
    };

    // Função principal para buscar clientes de um admin com paginação
    const buscarVendasPorAdmin = async (adminId, limitepage, paginacao) => {
        try {
            // Validar parâmetros
            if (!adminId || limitepage <= 0 || paginacao < 1) {
                throw new Error("Parâmetros inválidos: adminId, limitepage ou paginacao");
            }

            // Contar total de clientes
            const totalVendas = await contarVendas(adminId);
            setCaunterVendas(totalVendas); // <-- setar em seu estado

            // Calcular range para paginação
            const page = paginacao;
            const limit = limitepage;
            const from = (page - 1) * limit;
            const to = from + limit - 1;

            // Buscar clientes do admin com paginação e ordenação
            const { data, error } = await supabase
            .from("vendas")
            .select("*")
            .eq("adminid", adminId)
            .order("contador_vendas", { ascending: true })
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

        try {
            // Normaliza o texto
            const texto = `%${searchText.toLowerCase()}%`;
            // Busca múltiplas colunas com `or`
            const { data, error } = await supabase
            .from("vendas")
            .select("*")
            .eq("adminid", adminId)
            .or(`name.ilike.${texto},cpf.ilike.${texto},phone.ilike.${texto},city.ilike.${texto}`);

            if (error) throw error;

            return data;
        } catch (error) {
            console.error("Erro ao buscar Fornecedores:", error.message || error);
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
