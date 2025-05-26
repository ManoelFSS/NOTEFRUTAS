// context/ClientesContext.js
import { createContext, useContext, useState } from "react";
import { registerClientSchema } from "../validationSchemas/Schemas"
import { supabase } from '../services/supabase';

const ClientesContext = createContext();

export const ClientesProvider = ({ children }) => {
    
    const [loading, setLoading] = useState(false);
    const [messege, setMessege] = useState(null);// controle do componente messege
    const [closeModal, setCloseModal] = useState(false);
    const [clientes, setClientes] = useState([]);// lista de clientes
    const [caunterClientes, setCaunterClientes] = useState(0);
    const [caunterVendas, setCaunterVendas] = useState(0);
    const [modalVendas, setModalVendas,] = useState(false);

    const [name, setName] = useState('');// controle do campo name
    const [phone, setPhone] = useState('');// controle do campo phone
    const [cpf, setCpf] = useState('');
    const [city, setCity] = useState('');
    const [estado, setEstado] = useState('Escolha o estado');
    const [idClient, setIdClient] = useState('');// controle do campo idClient
    const [formaDEPagamento, setFormaDEPagamento] = useState("A prazo");// controle do campo idClient
    const [itensVenda, setItensVenda] = useState([]); // produtos vendidos e seus respectivos quantidades
    const [dataDeRecebimento, setDataDeRecebimento] = useState('');
    const [status_pagamento, setStatus_pagamento] = useState('Pendente');
    const [valorTotalDaVenda, setValorTotalDaVenda] = useState('');
    const [valorRestante, setValorRestante] = useState('');
    const [valorRecebido, setValorRecebido] = useState(0);
    const [valorDaEntrada, setValorDaEntrada] = useState('');
    const [tipoPagamento, setTipoPagamento] = useState('');




    // Função para cadastrar cliente
    const cadastrarCliente = async (clienteData) => {
        setLoading(true);
        console.log(clienteData);

        try {
            // Valida o objeto com Zod
            const validatedClient = registerClientSchema.parse(clienteData);

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
            .from("clientes")
            .insert([clienteData]);

            if (error) throw error;

            console.log("Cliente cadastrado com ID:", data);
            setCloseModal(false);
            setName('');
            setPhone('');
            setCpf('');
            setCity('');
            setEstado('Escolha o estado');

        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error);
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


    const editarCliente = async (novosDados, id) => {
        setLoading(true);

        try {
            const { error } = await supabase
            .from("clientes")
            .update(novosDados)
            .eq("id", id);

            if (error) throw error;

            console.log("Cliente atualizado com sucesso!");
            setCloseModal(false);
        } catch (error) {
            console.error("Erro ao atualizar o cliente:", error.message || error);
        } finally {
            setTimeout(() => {
            setLoading(false);
            }, 2000);
        }
    };


    const deletarCliente = async (idDoCliente) => {
        try {
            const { error } = await supabase
            .from("clientes")
            .delete()
            .eq("id", idDoCliente);

            if (error) throw error;

            console.log("Cliente deletado com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar Cliente:", error.message || error);
        }
    };



   // Função para contar total de clientes de um admin
    const contarClientes = async (adminId) => {
        const { count, error } = await supabase
            .from("clientes")
            .select("*", { count: "exact", head: true })
            .eq("adminid", adminId);

        if (error) {
            throw error;
        }

        return count;
    };

     // Função para contar total de Vendas de um admin
    const contarVendas = async (adminId) => {
        const { count, error } = await supabase
            .from("clientes")
            .select("*", { count: "exact", head: true })
            .eq("adminid", adminId);

        if (error) {
            throw error;
        }

        return count;
    };

     // Função para cadastrar vendas
    const cadastrarVenda = async (clienteData) => {
        setLoading(true);
        console.log(clienteData);

        try {

            // Insere o a venda na tabela "vendas"
            const { data, error } = await supabase
            .from("vendas")
            .insert([clienteData]);

            if (error) throw error;

            console.log("venda  cadastrado com ID:", data);
            setModalVendas(false);
            setItensVenda([]);
            setFormaDEPagamento("A prazo");
            setValorRestante('');
            setValorRecebido(0);
            setValorDaEntrada('');
            setDataDeRecebimento('');
            setStatus_pagamento('Pendente');
            setValorTotalDaVenda('');
            
        } catch (error) {
            console.error("Erro ao cadastrar Venda:", error);
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

     // Função principal para buscar vendas de um admin com paginação
    const buscarVendaPorAdmin = async (adminId, limitepage, paginacao) => {
        try {
            // Validar parâmetros
            if (!adminId || limitepage <= 0 || paginacao < 1) {
            throw new Error("Parâmetros inválidos: adminId, limitepage ou paginacao");
            }

            // Contar total de clientes
            const totalClientes = await contarVendas(adminId);
            setCaunterVendas(totalClientes); // <-- setar em seu estado

            // Calcular range para paginação
            const page = paginacao;
            const limit = limitepage;
            const from = (page - 1) * limit;
            const to = from + limit - 1;

            // Buscar clientes do admin com paginação e ordenação
            const { data, error } = await supabase
            .from("clientes")
            .select("*")
            .eq("adminid", adminId)
            .order("caunterclient", { ascending: true })
            .range(from, to);

            if (error) throw error;

            return data;
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
            throw error;
        }
    };

    // Função principal para buscar clientes de um admin com paginação
    const buscarClientesPorAdmin = async (adminId, limitepage, paginacao) => {
        try {
            // Validar parâmetros
            if (!adminId || limitepage <= 0 || paginacao < 1) {
            throw new Error("Parâmetros inválidos: adminId, limitepage ou paginacao");
            }

            // Contar total de clientes
            const totalClientes = await contarClientes(adminId);
            setCaunterClientes(totalClientes); // <-- setar em seu estado

            // Calcular range para paginação
            const page = paginacao;
            const limit = limitepage;
            const from = (page - 1) * limit;
            const to = from + limit - 1;

            // Buscar clientes do admin com paginação e ordenação
            const { data, error } = await supabase
            .from("clientes")
            .select("*")
            .eq("adminid", adminId)
            .order("caunterclient", { ascending: true })
            .range(from, to);

            if (error) throw error;

            return data;
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
            throw error;
        }
    };

    
    const buscarClienteSeach = async (searchText, adminId) => {
        if (!searchText || !adminId) return [];

        try {
            // Normaliza o texto
            const texto = `%${searchText.toLowerCase()}%`;

            // Busca múltiplas colunas com `or`
            const { data, error } = await supabase
            .from("clientes")
            .select("*")
            .eq("adminid", adminId)
            .or(`name.ilike.${texto},cpf.ilike.${texto},phone.ilike.${texto},city.ilike.${texto}`);

            if (error) throw error;

            return data;
        } catch (error) {
            console.error("Erro ao buscar clientes:", error.message || error);
            return [];
        }
    };


    return (
        <ClientesContext.Provider value={{ 
                cadastrarCliente, 
                buscarClientesPorAdmin,
                loading, setLoading,
                messege, setMessege,
                closeModal, setCloseModal,
                clientes, setClientes,
                caunterClientes,
                buscarClienteSeach,
                editarCliente,
                deletarCliente,
                name, setName,
                phone, setPhone,
                cpf, setCpf,
                city, setCity,
                estado, setEstado,
                idClient, setIdClient,
                itensVenda, setItensVenda,
                formaDEPagamento, setFormaDEPagamento,
                dataDeRecebimento, setDataDeRecebimento,
                status_pagamento, setStatus_pagamento,
                valorTotalDaVenda, setValorTotalDaVenda,
                valorRestante, setValorRestante,
                valorRecebido, setValorRecebido,
                valorDaEntrada, setValorDaEntrada,
                caunterVendas, setCaunterVendas,
                cadastrarVenda,
                modalVendas, setModalVendas,
                tipoPagamento, setTipoPagamento
            }}>
        {children}
        </ClientesContext.Provider>
    );
    };

// Hook para usar o contexto
export const useClientes = () => useContext(ClientesContext);
