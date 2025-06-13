import { createContext, useContext, useState } from "react";
import { supabase } from '../services/supabase';
// context
import { useAuthContext } from "./AuthContext";
import { useFornecedores } from "./FornecedoresContext";


const BuysContext = createContext();

export const BuysProvider = ({ children }) => {

    const { idFornecedor, atualizarStatusParaDebitos, setCaunterCompras } = useFornecedores();
    const { userId} = useAuthContext();

    
    const [loading, setLoading] = useState(false);
    const [messege, setMessege] = useState(null);// controle do componente messege
    const [closeModal, setCloseModal] = useState(false);
    const [compras, setCompras] = useState([]);// lista de clientes

    const [name, setName] = useState('');// controle do campo name
    const [phone, setPhone] = useState('');// controle do campo phone
    const [idCompra, setIdCompra] = useState('');// controle do campo idClient


    const editarCompra = async (compra_id, status) => {
        try {
            const { data: compraAtualizada, error: erroCompra } = await supabase
                .from('compras')
                .update({ status })
                .eq('id', compra_id);

            if (erroCompra) {
                console.error('[ERRO VENDA] Falha ao atualizar status da compra:', {
                    compra_id,
                    status,
                    erro: erroCompra.message,
                });
                return;
            }

            console.log('[SUCESSO COMPRA] compra atualizada com sucesso:', compraAtualizada);

            if (status === "Cancelada") {
                const { data: parcelasAtualizadas, error: erroParcelas } = await supabase
                    .from('parcelas_compra')
                    .update({ status: "Cancelada" })
                    .eq('compra_id', compra_id);

                if (erroParcelas) {
                    console.error('[ERRO PARCELAS] Falha ao cancelar parcelas da compra:', {
                        compra_id,
                        erro: erroParcelas.message,
                    });
                } else {
                    console.log('[SUCESSO PARCELAS] Parcelas canceladas com sucesso:', parcelasAtualizadas);
                }

                console.log(userId)
                console.log(idFornecedor)

                const getNumeroDeVendasDoFornecedor = await contarCompraPendentesOuAtrasadas(userId, idFornecedor);
                console.log("contarCompra", getNumeroDeVendasDoFornecedor);
                if(getNumeroDeVendasDoFornecedor === 0) {
                    await atualizarStatusParaDebitos(idFornecedor, "Nada a Pagar");
                    console.log("Fornecedor nao tem nemhuma venda pendente, status Em Dias"); ///////////////////
                }
            }

        } catch (err) {
            console.error('[ERRO GERAL] Erro inesperado ao editar a compra:', {
                compra_id,
                status,
                erro: err.message,
            });
        }
    };


   // Função principal para buscar vendas de um admin com paginação, incluindo pendentes ou atrasadas
    const buscarComprasPorAdmin = async (adminId, limitepage, paginacao, ano, mes) => {
        try {
            // Validar parâmetros
            if (!adminId || limitepage <= 0 || paginacao < 1 || !ano || !mes) {
                throw new Error("Parâmetros inválidos: adminId, limitepage, paginacao, ano ou mes");
            }

            // Construir intervalo de datas (do primeiro ao último dia do mês)
            const inicioMes = new Date(ano, mes - 1, 1).toISOString(); // dia 1
            const fimMes = new Date(ano, mes, 0, 23, 59, 59, 999).toISOString(); // último dia do mês

            // Calcular range para paginação
            const from = (paginacao - 1) * limitepage;
            const to = from + limitepage - 1;

            // Contar total de vendas do mês ou com status pendente/atrasada com created_at <= fimMes
            const { count, error: countError } = await supabase
                .from("compras")
                .select("id", { count: "exact", head: true })
                .eq("adminid", adminId)
                .or(
                    `and(created_at.gte.${inicioMes},created_at.lte.${fimMes}),and(status.eq.Pendente,created_at.lte.${fimMes}),and(status.eq.Atrasada,created_at.lte.${fimMes})`
                );

            if (countError) throw countError;

            // Atualiza o contador
            setCaunterCompras(count);

            // Buscar vendas com dados das parcelas e itens
            const { data, error } = await supabase
                .from("compras")
                .select(`
                    *,
                    parcelas_compra(*),
                    itens_compra(*)
                `)
                .eq("adminid", adminId)
                .or(
                    `and(created_at.gte.${inicioMes},created_at.lte.${fimMes}),and(status.eq.Pendente,created_at.lte.${fimMes}),and(status.eq.Atrasada,created_at.lte.${fimMes})`
                )
                .order("contador_compras", { ascending: true })
                .range(from, to);

            if (error) throw error;

            return data;
        } catch (error) {
            console.error("Erro ao buscar compras:", error);
            throw error;
        }
    };
    
    const buscarComprasSeach = async (searchText, adminId) => {
        if (!searchText || !adminId) return [];

        try {
            // Normaliza o texto
            const texto = `%${searchText.toLowerCase()}%`;
            // Busca múltiplas colunas com `or`
            const { data, error } = await supabase
            .from("compras")
            .select("*")
            .eq("adminid", adminId)
            .or(`name.ilike.${texto},phone.ilike.${texto}`);

            if (error) throw error;

            return data;
        } catch (error) {
            console.error("Erro ao buscar compra:", error.message || error);
            return [];
        }
    };

    const editarParcelaStatus = async (parcela_id, status)  => {
        const { data, error } = await supabase
            .from('parcelas_venda') // substitua pelo nome correto da sua tabela
            .update({ status: status })
            .eq('id', parcela_id); // ou 'parcela_id', dependendo do nome do campo

        if (error) {
            console.error('Erro ao atualizar status de pagamento da parcela:', error);
        } else {
            console.log('Parcela paga e atualizado com sucesso:', data);
        }
    }

    
    const contarCompraPendentesOuAtrasadas = async (adminId, fornecedorId) => {
        const { count, error } = await supabase
            .from('compras')
            .select('*', { count: 'exact', head: true }) // não retorna dados, só conta
            .eq('adminid', adminId)
            .eq('fornecedor_id', fornecedorId)
            .in('status', ['Pendente', 'Atrasada']); // status igual a um dos dois

        if (error) {
            console.error('Erro ao contar compras:', error);
            throw error;
        }
        return count;
    }


    return (
        <BuysContext.Provider value={{ 
                buscarComprasPorAdmin,
                loading, setLoading,
                messege, setMessege,
                closeModal, setCloseModal,
                compras, setCompras,
                buscarComprasSeach,
                editarCompra,
                name, setName,
                phone, setPhone,
                idCompra, setIdCompra,
                editarParcelaStatus,
                contarCompraPendentesOuAtrasadas 
            }}>
        {children}
        </BuysContext.Provider>
    );
};

// Hook para usar o contexto
export const useBuys = () => useContext(BuysContext);
