// context/ClientesContext.js
import { createContext, useContext, useState } from "react";
import { registerClientSchema, vendaSchema } from "../validationSchemas/Schemas"
import { supabase } from '../services/supabase';
import {useLogs} from './LogContext';
import { useAuthContext } from "./AuthContext";

const ClientesContext = createContext();

export const ClientesProvider = ({ children }) => {

    const {user, userId} = useAuthContext();
    const {cadastrarLog} = useLogs();
    
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
    const [dataDeRecebimento, setDataDeRecebimento] = useState('');
    const [status_pagamento, setStatus_pagamento] = useState('Pendente');
    const [valorTotalDaVenda, setValorTotalDaVenda] = useState('');
    const [valorRestante, setValorRestante] = useState('');
    const [valorRecebido, setValorRecebido] = useState(0);
    const [valorDaEntrada, setValorDaEntrada] = useState('');
    const [tipoPagamento, setTipoPagamento] = useState('');
    const [qtParcelas , setQtParcelas] = useState(1);
    const [tipoCobranca, setTipoCobranca] = useState('');

    const [itensVenda, setItensVenda] = useState([]); // produtos vendidos e seus respectivos quantidades
    const [parcelasItensVenda, setParcelasItensVenda] = useState([]); 

     // Função para contar total de clientes de um admin
    const contarClientes = async (adminId) => {
        const { count, error } = await supabase
            .from("clientes")
            .select("*", { count: "exact", head: true })
            .eq("adminid", adminId);
        if (error) {throw error;}
        return count;
    };

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

            setMessege({
                success: true,
                title: "✅ Cliente cadastrado com sucesso",
                message: `O cliente,  ${validatedClient.name}, foi salvos com sucesso.`
            });

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

    const inserirParcelasVenda = async (parcelas) => {
        try {
            const { data, error } = await supabase
            .from("parcelas_venda")
            .insert(parcelas);

            if (error) {
            console.error("Erro ao inserir parcelas:", error.message);
            throw error;
            }

            console.log("Parcelas registradas com sucesso:", data);
            return data;
        } catch (err) {
            console.error("Erro inesperado ao registrar parcelas:", err.message);
            throw err;
        }
    };

    const atualizarEstoqueProdutos = async (itensComVendaId) => {
        try {
            for (const item of itensComVendaId) {
            const { produto_id, quantidade } = item;

            // Buscar o produto atual no banco
            const { data: produto, error: erroBusca } = await supabase
                .from("produtos")
                .select("stock")
                .eq("id", produto_id)
                .single();

            if (erroBusca) {
                console.error(`Erro ao buscar produto ${produto_id}:`, erroBusca.message);
                continue;
            }

            if (!produto || produto.stock <= 0) {
                console.warn(`Produto ${produto_id} sem estoque. Nenhuma alteração feita.`);
                continue;
            }

            const novoEstoque = Math.max(produto.stock - quantidade, 0);

            const statusAtualizado = novoEstoque === 0 ? "Indisponivel" : "Disponivel";

            // Atualizar o estoque e status
            const { error: erroUpdate } = await supabase
                .from("produtos")
                .update({ 
                stock: novoEstoque,
                status: statusAtualizado
                })
                .eq("id", produto_id);

            if (erroUpdate) {
                console.error(`Erro ao atualizar produto ${produto_id}:`, erroUpdate.message);
            } else {
                console.log(`Produto ${produto_id} atualizado: estoque=${novoEstoque}, status=${statusAtualizado}`);
            }
            }
        } catch (err) {
            console.error("Erro geral ao atualizar estoques:", err.message);
            throw err;
        }
    };

     // Função para cadastrar vendas
    const cadastrarVenda = async (vendaData) => {
        setLoading(true);

        try {
            const validatedVenda = vendaSchema.parse(vendaData);

            if (itensVenda.length === 0) {
                setMessege({
                    success: false,
                    title: "❌ Erro ao Cadastrar",
                    message: "Nenhum produto foi adicionado na venda.",
                });
                return;
            }

            if (validatedVenda.valor_entrada > 0 || validatedVenda.forma_pagamento === "A vista") {
                if (!validatedVenda.tipo_pagamento) {
                    setMessege({
                        success: false,
                        title: "❌ Erro ao Cadastrar",
                        message: `Você informou um valor de entrada de R$ ${validatedVenda.valor_entrada}, mas ainda não selecionou a forma de pagamento. Por favor, escolha o tipo de pagamento para continuar.`
                    });
                    return;
                }
            }

            // 1. Inserir a venda e obter o ID
            const { data: vendaInserida, error: vendaErro } = await supabase
                .from("vendas")
                .insert([vendaData])
                .select(); // <- Importante: usar select() para retornar os dados inseridos, incluindo o id

            if (vendaErro) throw vendaErro;

            const vendaId = vendaInserida?.[0]?.id;
            console.log("Venda cadastrada com ID:", vendaId);

            // 2. Inserir os itens da venda usando o venda_id
            const itensComVendaId = itensVenda.map((item) => ({
                ...item,
                venda_id: vendaId
            }));

            const { error: itensErro } = await supabase
                .from("itens_venda")
                .insert(itensComVendaId);
            if (itensErro) throw itensErro;

            // 3. Atualizar o estoque dos produtos
            await atualizarEstoqueProdutos(itensComVendaId);

            // 4. Inserir as parcelas da venda usando o venda_id
            if(parcelasItensVenda.length > 0) {
                const parcelasItems = parcelasItensVenda.map((item) => ({
                    ...item,
                    venda_id: vendaId
                }))
                await inserirParcelasVenda(parcelasItems);
            }

            // 3. Resetar os campos e fechar modal
            setModalVendas(false);
            setItensVenda([]);
            setFormaDEPagamento("A prazo");
            setValorRestante('');
            setValorRecebido(0);
            setValorDaEntrada('');
            setDataDeRecebimento('');
            setStatus_pagamento('Pendente');
            setValorTotalDaVenda('');

            setMessege({
                success: true,
                title: "✅ Venda cadastrada com sucesso",
                message: "A venda e os itens foram salvos com sucesso.",
            });

            const log = {
                adminid: userId,    
                colaborador_id: user.id, 
                name: user.name,   
                titulo: '✅ Venda',   
                mensagem: 'Venda realizada com sucesso!', 
                status: 'Não lida',   
                referencia_id: vendaId, 
                created_at: new Date().toISOString()
            };

            await cadastrarLog(log);

        } catch (error) {
            console.error("Erro ao cadastrar Venda:", error);
            setMessege({
                success: false,
                title: "❌ Erro ao Cadastrar",
                message: error?.errors?.[0]?.message || error.message || "Erro desconhecido",
            });
        } finally {
            setLoading(false);
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
                tipoPagamento, setTipoPagamento,
                qtParcelas , setQtParcelas,
                tipoCobranca, setTipoCobranca,
                parcelasItensVenda, setParcelasItensVenda
            }}>
        {children}
        </ClientesContext.Provider>
    );
    };

// Hook para usar o contexto
export const useClientes = () => useContext(ClientesContext);
