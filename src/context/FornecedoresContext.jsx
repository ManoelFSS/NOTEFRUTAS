import { createContext, useContext, useState } from "react";
import { registerClientSchema, compraSchema} from "../validationSchemas/Schemas";
import { supabase } from '../services/supabase';
import { useLogs } from './LogContext';
import { useAuthContext } from "./AuthContext";

const FornecedoresContext = createContext();

export const FornecedoresProvider = ({ children }) => {

    const { user, userId } = useAuthContext();
    const { cadastrarLog } = useLogs();

    const [loading, setLoading] = useState(false);
    const [messege, setMessege] = useState(null);
    const [closeModal, setCloseModal] = useState(false);
    const [fornecedores, setFornecedores] = useState([]);
    const [caunterFornecedores, setCaunterFornecedores] = useState(0);
    const [caunterCompras, setCaunterCompras] = useState(0);
    const [modalCompras, setModalCompras] = useState(false);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [cpf, setCpf] = useState('');
    const [city, setCity] = useState('');
    const [estadoFornecedor, setEstadoFornecedor] = useState('Escolha o estado');
    const [idFornecedor, setIdFornecedor] = useState('');
    const [formaDEPagamento, setFormaDEPagamento] = useState("A prazo");
    const [dataDeRecebimento, setDataDeRecebimento] = useState('');
    const [status_pagamento, setStatus_pagamento] = useState('Pendente');
    const [valorTotalDaCompra, setValorTotalDaCompra] = useState('');
    const [valorRestante, setValorRestante] = useState('');
    const [valorRecebido, setValorRecebido] = useState(0);
    const [valorDaEntrada, setValorDaEntrada] = useState('');
    const [tipoPagamento, setTipoPagamento] = useState('');
    const [qtParcelas, setQtParcelas] = useState(1);
    const [tipoCobranca, setTipoCobranca] = useState('');

    const [itensCompra, setItensCompra] = useState([]);
    const [parcelasItensCompra, setParcelasItensCompra] = useState([]);
    const [textBtn, setTextBtn] = useState("Cancelar");

    const contarFornecedores = async (adminId) => {
        try {
            const { count, error } = await supabase
                .from("fornecedores")
                .select("", { count: "exact", head: true })
                .eq("adminid", adminId);

            if (error) {
                console.error("Erro ao contar compras:", error.message);
                return null; // ou `null`, ou lançar novamente se for o caso
            }

            console.log("Contagem de compras:", count);
            return count;
        } catch (err) {
            console.error("Erro inesperado ao contar compras:", err.message);
            return null; // ou lançar o erro, dependendo do que você preferir
        }
    };


    const contarCompras = async (adminId) => {
        try {
            const { count, error } = await supabase
                .from("compras")
                .select("", { count: "exact", head: true })
                .eq("adminid", adminId);

            if (error) {
                console.error("Erro ao contar compras:", error.message);
                return null; // ou `null`, ou lançar novamente se for o caso
            }

            console.log("Contagem de compras:", count);
            return count;
        } catch (err) {
            console.error("Erro inesperado ao contar compras:", err.message);
            return null; // ou lançar o erro, dependendo do que você preferir
        }
    };


    const cadastrarFornecedor = async (fornecedorData) => {
        setLoading(true);
        console.log(fornecedorData);

        try {
            const validatedFornecedor = registerClientSchema.parse(fornecedorData);

            if (!validatedFornecedor) {
                return validatedFornecedor.errors;
            }

            if (validatedFornecedor.cpf === undefined) {
                validatedFornecedor.cpf = "Não informado";
            }

            const { data, error } = await supabase
                .from("fornecedores")
                .insert([fornecedorData]);
            if (error) throw error;

            setMessege({
                success: true,
                title: "✅ Fornecedor cadastrado com sucesso",
                message: `O Fornecedor, ${validatedFornecedor.name}, foi salvo com sucesso.`
            });
            setTextBtn("OK")

            console.log("Fornecedor cadastrado com ID:", data);
            setCloseModal(false);
            setName('');
            setPhone('');
            setCpf('');
            setCity('');
            setEstadoFornecedor('Escolha o estado');///////////////

        } catch (error) {
            console.error("Erro ao cadastrar fornecedor:", error);
            setTimeout(() => {
                setMessege({
                    success: false,
                    title: "❌ Erro ao Cadastrar",
                    message: error?.errors?.[0]?.message || error.message || "Erro desconhecido",
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

    const deletarFornecedor = async (idDoFornecedor) => {
        try {
            const { error } = await supabase
                .from("fornecedores")
                .delete()
                .eq("id", idDoFornecedor);

            if (error) throw error;

            console.log("Fornecedor deletado com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar fornecedor:", error.message || error);
        }
    };

    const inserirParcelasCompra = async (parcelas) => {
        try {
            const { data, error } = await supabase
                .from("parcelas_compra")
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

    const atualizarEstoqueProdutos = async (itensComCompraId) => {

        try {
            for (const item of itensComCompraId) {
                const { produto_id, quantidade } = item;

                const { data: produto, error: erroBusca } = await supabase
                    .from("produtos")
                    .select("stock,  peso_medio")
                    .eq("id", produto_id)
                    .single();

                console.log(produto);

                if (erroBusca) {
                    console.error(`Erro ao buscar produto ${produto_id}:`, erroBusca.message);
                    continue;
                }

                const novoEstoque = Math.max(produto.stock + quantidade, 0);
                const novoPesoTotal = Math.max(produto.peso_medio * novoEstoque, 0);
                const statusAtualizado = novoEstoque === 0 ? "Indisponivel" : "Disponivel";

                const { error: erroUpdate } = await supabase
                    .from("produtos")
                    .update({
                        stock: novoEstoque,
                        status: statusAtualizado,
                        peso_total: novoPesoTotal
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

    const atualizarStatusParaDebitos = async (fornecedor_id, status) => {
        setCloseModal(null);
        const { data, error } = await supabase
            .from('fornecedores')
            .update({ status: status })
            .eq('id', fornecedor_id);

        if (error) {
            console.error('Erro ao atualizar status:', error);
        } else {
            console.log('Débito do fornecedor atualizado com sucesso:', data);
        }
    };

    // Função para cadastrar vendas
    const cadastrarCompra = async (compraData) => {
        setLoading(true);

        try {

            const cauntCompra = await contarCompras(userId);
            if(cauntCompra === null) return setMessege({
                success: false,
                title: "❌ Erro ao Cadastrar",
                message: "Tente novamente em alguns instantes",
            })
            compraData.contador_compras = cauntCompra + 1;

            const validatedCompra = compraSchema.parse(compraData);

            if (itensCompra.length === 0) {
                setMessege({
                    success: false,
                    title: "❌ Erro ao Cadastrar",
                    message: "Nenhum produto foi adicionado na venda.",
                });
                return;
            }

            if (validatedCompra.valor_entrada > 0 || validatedCompra.forma_pagamento === "A vista") {
                if (!validatedCompra.tipo_pagamento) {
                    setMessege({
                        success: false,
                        title: "❌ Erro ao Cadastrar",
                        message: `Você informou um valor de entrada de R$ ${validatedCompra.valor_entrada}, mas ainda não selecionou a forma de pagamento. Por favor, escolha o tipo de pagamento para continuar.`
                    });
                    return;
                }
            }

            // 1. Inserir a compra e obter o ID
            const { data: compraInserida, error: vendaErro } = await supabase
                .from("compras")
                .insert([compraData])
                .select(); // <- Importante: usar select() para retornar os dados inseridos, incluindo o id

            if (vendaErro) throw vendaErro;

            const compraId = compraInserida?.[0]?.id;
            console.log("Compra cadastrada com ID:", compraId);

            // 2. Inserir os itens da compra usando o compra_id
            const itensCompraId = itensCompra.map((item) => ({
                ...item,
                compra_id: compraId
            }));

            const { error: itensErro } = await supabase
                .from("itens_compra")
                .insert(itensCompraId);
            if (itensErro) throw itensErro;

            // 3. Atualizar o estoque dos produtos
            await atualizarEstoqueProdutos(itensCompraId);

            // 4. Inserir as parcelas da compra usando o compra_id
            if(parcelasItensCompra.length > 0) {
                const parcelasItems = parcelasItensCompra.map((item) => ({
                    ...item,
                    compra_id: compraId
                }))
                await inserirParcelasCompra(parcelasItems);
                await atualizarStatusParaDebitos(compraData.fornecedor_id, "Débitos a Pagar" );
            }

            // 3. Resetar os campos e fechar modal
            setModalCompras(false);
            setItensCompra([]);
            setFormaDEPagamento("A prazo");
            setValorRestante('');
            setValorRecebido(0);
            setValorDaEntrada('');
            setDataDeRecebimento('');
            setStatus_pagamento('Pendente');
            setValorTotalDaCompra('');
            setCloseModal(false);
            setName('');
            setPhone('');
            setCpf('');
            setCity('');
            setEstadoFornecedor('Escolha o estado');


            setMessege({
                success: true,
                title: "✅ Compra cadastrada com sucesso",
                message: "A compra e os itens foram salvos com sucesso.",
            });

            if(compraData.forma_pagamento === 'A vista') {
                const log = {
                    adminid: userId,    
                    colaborador_id: user.id, 
                    name: user.name,   
                    titulo: '✅ Compra a vista',   
                    mensagem: `Compra realizada com sucesso! no valor de R$ ${compraData.valor_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`, 
                    status: 'Não lida',   
                    referencia_id: compraId, 
                    created_at: new Date().toISOString()
                };
    
                await cadastrarLog(log);
            }

            if(compraData.forma_pagamento === 'A prazo') {
                const log = {
                    adminid: userId,    
                    colaborador_id: user.id, 
                    name: user.name,   
                    titulo: '✅ Compra a prazo',  
                    mensagem: ` 
                        Valor total: ${compraData.valor_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}.
                        Entrada: ${compraData.valor_entrada.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}.
                        Restante: ${compraData.valor_restante.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}.
                        em ${compraData.qtd_parcelas} parcelas de ${(compraData.valor_restante / compraData.qtd_parcelas).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`, 
                    status: 'Não lida',   
                    referencia_id:  compraId, 
                    created_at: new Date().toISOString()
                };
    
                await cadastrarLog(log);
            }

        } catch (error) {
            console.error("Erro ao cadastrar compra:", error);
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


    const buscarFornecedorSeach = async (searchText, adminId) => {
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
            console.error("Erro ao buscar fornecedor:", error.message || error);
            return [];
        }
    };



    return (
        <FornecedoresContext.Provider
            value={{
                loading, closeModal, setCloseModal,
                fornecedores, setFornecedores,
                caunterFornecedores, setCaunterFornecedores,
                name, setName, phone, setPhone, cpf, setCpf,
                city, setCity,
                cadastrarFornecedor, editarFornecedor, deletarFornecedor,
                contarFornecedores, cadastrarCompra, atualizarStatusParaDebitos,
                valorTotalDaCompra, setValorTotalDaCompra,
                valorRestante, setValorRestante,
                valorRecebido, setValorRecebido,
                formaDEPagamento, setFormaDEPagamento,
                tipoPagamento, setTipoPagamento,
                valorDaEntrada, setValorDaEntrada,
                qtParcelas, setQtParcelas,
                tipoCobranca, setTipoCobranca,
                itensCompra, setItensCompra,
                parcelasItensCompra, setParcelasItensCompra,
                modalCompras, setModalCompras,
                buscarFornecedorSeach,
                buscarFornecedoresPorAdmin,
                idFornecedor, setIdFornecedor,
                dataDeRecebimento, setDataDeRecebimento,
                status_pagamento, setStatus_pagamento,
                caunterCompras, setCaunterCompras,
                estadoFornecedor, setEstadoFornecedor,
                textBtn, setTextBtn,
                messege,setMessege, 
            }}
        >
            {children}
        </FornecedoresContext.Provider>
    );
};

export const useFornecedores = () => useContext(FornecedoresContext);
