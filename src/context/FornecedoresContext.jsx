import { createContext, useContext, useState } from "react";
import { registerClientSchema } from "../validationSchemas/Schemas"
import { supabase } from '../services/supabase';


const FornecedoresContext = createContext();

export const FornecedoresProvider = ({ children }) => {
    
    const [loading, setLoading] = useState(false);
    const [messege, setMessege] = useState(null);// controle do componente messege
    const [closeModal, setCloseModal] = useState(false);
    const [fornecedores, setFornecedores] = useState([]);// lista de clientes
    const [caunterFornecedores, setCaunterFornecedores] = useState(0);

    const [name, setName] = useState('');// controle do campo name
    const [phone, setPhone] = useState('');// controle do campo phone
    const [cpf, setCpf] = useState('');
    const [city, setCity] = useState('');
    const [estadoFornecedor, setEstadoFornecedor] = useState('Escolha o estado');
    const [idFornecedor, setIdFornecedor] = useState('');// controle do campo idClient


    // Função para cadastrar cliente
    const cadastrarFornecedor = async (FornecedorData) => {
        setLoading(true);
        
        const tamanhoEmBytes = new TextEncoder().encode(JSON.stringify(FornecedorData)).length;
        const tamanhoEmKB = (tamanhoEmBytes / 1024).toFixed(2);
        console.log(`Tamanho: ${tamanhoEmKB} KB`);

        try {
            // Valida o objeto com Zod
            const validatedClient = registerClientSchema.parse(FornecedorData);

            if (!validatedClient) {
            // Se invalidado, retorna os erros do Zod (aqui só para referência, geralmente parse lança erro)
            return validatedClient.errors;
            }

            // Se cpf for undefined, define como "Não informado"
            if (validatedClient.cpf === undefined) {
            validatedClient.cpf = "Não informado";
            }

            // Insere o cliente na tabela "clientes"
            const { data, error } = await supabase
            .from("fornecedores")
            .insert([FornecedorData]);

            if (error) throw error;

            console.log("fornecedor cadastrado com ID:", data);
            setCloseModal(false);
            setName('');
            setPhone('');
            setCpf('');
            setCity('');
            setEstadoFornecedor('Escolha o estado');

        } catch (error) {
            console.error("Erro ao cadastrar fornecedor:", error);
            setTimeout(() => {
            setMessege({
                success: false,
                title: "❌ Erro ao Cadastrar",
                message:
                error?.errors?.[0]?.message || error.message || "Erro desconhecido",
            });
            }, 2000);
            throw error;
        } finally {
            setTimeout(() => {
            setLoading(false);
            }, 2000);
        }
    };


    const editarFornecedor = async (novosDados, id) => {
        setLoading(true);

        try {
            const { error } = await supabase
            .from("fornecedores")
            .update(novosDados)
            .eq("id", id);

            if (error) throw error;

            console.log("Fornecedor atualizado com sucesso!");
            setCloseModal(false);
        } catch (error) {
            console.error("Erro ao atualizar o fornecedor:", error.message || error);
        } finally {
            setTimeout(() => {
            setLoading(false);
            }, 2000);
        }
    };


    const deletarFornecedor = async (idDoCliente) => {
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
    const contarFornecedores = async (adminId) => {
        const { count, error } = await supabase
            .from("fornecedores")
            .select("*", { count: "exact", head: true })
            .eq("adminid", adminId);

        if (error) {
            throw error;
        }

        return count;
    };

    // Função principal para buscar clientes de um admin com paginação
    const buscarFornecedoresPorAdmin = async (adminId, limitepage, paginacao) => {
        try {
            // Validar parâmetros
            if (!adminId || limitepage <= 0 || paginacao < 1) {
                throw new Error("Parâmetros inválidos: adminId, limitepage ou paginacao");
            }

            // Contar total de clientes
            const totalClientes = await contarFornecedores(adminId);
            setCaunterFornecedores(totalClientes); // <-- setar em seu estado

            // Calcular range para paginação
            const page = paginacao;
            const limit = limitepage;
            const from = (page - 1) * limit;
            const to = from + limit - 1;

            // Buscar clientes do admin com paginação e ordenação
            const { data, error } = await supabase
            .from("fornecedores")
            .select("*")
            .eq("adminid", adminId)
            .order("caunterfornecedor", { ascending: true })
            .range(from, to);

            if (error) throw error;

            return data;
        } catch (error) {
            console.error("Erro ao buscar fornecedores:", error);
            throw error;
        }
    };

    
    const buscarFornecedoresSeach = async (searchText, adminId) => {
        if (!searchText || !adminId) return [];

        try {
            // Normaliza o texto
            const texto = `%${searchText.toLowerCase()}%`;

            // Busca múltiplas colunas com `or`
            const { data, error } = await supabase
            .from("fornecedores")
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
        <FornecedoresContext.Provider value={{ 
                cadastrarFornecedor, 
                buscarFornecedoresPorAdmin,
                loading, setLoading,
                messege, setMessege,
                closeModal, setCloseModal,
                fornecedores, setFornecedores,
                caunterFornecedores, setCaunterFornecedores,
                buscarFornecedoresSeach,
                editarFornecedor,
                deletarFornecedor,
                name, setName,
                phone, setPhone,
                cpf, setCpf,
                city, setCity,
                estadoFornecedor, setEstadoFornecedor,
                idFornecedor, setIdFornecedor,
            }}>
        {children}
        </FornecedoresContext.Provider>
    );
};

// Hook para usar o contexto
export const useFornecedores = () => useContext(FornecedoresContext);
