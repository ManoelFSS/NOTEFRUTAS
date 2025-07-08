import { supabase } from '../services/supabase';


// RESUMO FINANCEIRO
// Esta função busca o resumo financeiro do mês atual para um determinado adminid.
// Utiliza uma função SQL criada no Supabase (resumo_financeiro) para fazer a agregação diretamente no banco.
export const getResumoFinanceiro = async (adminid) => {
    // Obtemos a data atual
    const now = new Date();
    const mesAtual = now.getMonth() + 1; // Janeiro = 0, então somamos 1
    const anoAtual = now.getFullYear();  // Ano atual, ex: 2025

    // Chamamos a função RPC 'resumo_financeiro' no Supabase, passando admin_id, ano e mês
    // Essa função retorna:
    // - total_vendas: soma de todas as vendas do mês, exceto canceladas
    // - total_parcelas_nao_pagas: soma das parcelas que ainda não foram pagas nem canceladas
    const { data, error } = await supabase
        .rpc('resumo_financeiro', {
            admin_id: adminid,
            ano: anoAtual,
            mes: mesAtual
        });
    // Se houver erro na requisição, lançamos uma exceção
    if (error) throw error;
    // Extraímos os valores retornados da função
    const { total_vendas, total_parcelas_nao_pagas } = data[0];
    console.log("total_vendas", total_vendas);
    console.log("total_parcelas_nao_pagas", total_parcelas_nao_pagas);
    // Retornamos o valor líquido: total vendido - parcelas não pagas
    return total_vendas - total_parcelas_nao_pagas;
};


// Função que busca o total de parcelas atrasadas ligadas a vendas pendentes
// Usa uma função RPC criada no Supabase (parcelas_atrasadas_dinamico)
export const getParcelasAtrasadas = async (adminid, tabela1, tabela2, idRef) => {
    // Chama a função RPC no Supabase passando os parâmetros:
    // admin_id: ID do administrador (para filtrar os dados dele)
    // tabela1: nome da tabela de vendas (ex: 'vendas')
    // tabela2: nome da tabela de parcelas (ex: 'parcelas_venda')
    // id_ref: nome da coluna que liga a parcela à venda (ex: 'venda_id')
    const { data, error } = await supabase.rpc('parcelas_atrasadas_dinamico', {
        admin_id: adminid,
        tabela1,      // Tabela de vendas
        tabela2,      // Tabela de parcelas
        id_ref: idRef // Chave estrangeira que liga a parcela à venda
    });
    // Se houve erro na chamada da função RPC, lança o erro
    if (error) throw error;
    // Retorna o valor total de parcelas atrasadas
    return data;
};


// ==============================
// getTotalParcelasVencimentoHoje
// - Chama função RPC no banco para buscar o total de parcelas
//   com vencimento hoje, filtrando pelo admin e status não pago/cancelado
// - Evita trazer todas as parcelas para o frontend, só retorna o total somado
// - Usa SQL dinâmico para trabalhar com diferentes tabelas (ex: parcelas_venda, parcelas_compra)
// ==============================

// Função para obter o total das parcelas com vencimento hoje para um admin, usando RPC no banco
export const getTotalParcelasVencimentoHoje = async (adminid, tabela) => {
    // Chama a função SQL no banco para otimização e evitar trazer dados para aplicação
    const { data, error } = await supabase.rpc('total_parcelas_vencimento_hoje', {
        admin_id: adminid,
        tabela_name: tabela,
    });
    if (error) throw error;
    // data já traz o total somado das parcelas
    console.log(data);
    return data;
}


// getResumoClientes
// - Função que retorna um resumo de clientes para um admin:
//   total geral, total com débitos pendentes, total de novos clientes no mês atual
// - Chama função SQL no banco que faz as contagens otimizadas com 3 subqueries
// - Evita fazer múltiplas queries separadas no frontend, reduzindo latência
// ==============================
// getResumoClientes
// - Chama função RPC que retorna os totais desejados em uma só consulta
// - Retorna array com os valores para total, débitos pendentes e novos do mês
export const getResumoClientes = async (adminid) => {
    const { data, error } = await supabase.rpc('resumo_clientes', { admin_id: adminid });
    if (error) throw error;
    // data é array com um objeto que tem total, debitos_pendentes e novos_mes
    const resumo = data[0];
    return [
        { name: 'Total', value: resumo.total },
        { name: 'Débitos pendentes', value: resumo.debitos_pendentes },
        { name: 'Novos Clientes | Mês', value: resumo.novos_mes }
    ];
};


// getResumoFornecedores
// - Função que retorna um resumo de fornecedores para um admin:
//   total geral, total com débitos pendentes, total de novos fornecedores no mês atual
// - Utiliza função RPC no banco para fazer contagens em uma query só
// - Evita múltiplas consultas desnecessárias do frontend para melhorar performance
// ==============================
// getResumoFornecedores
// - Busca totais gerais, débitos pendentes e novos fornecedores no mês
// - Chama função SQL para melhor desempenho e menos queries
export const getResumoFornecedores = async (adminid) => {
    const { data, error } = await supabase.rpc('resumo_fornecedores', { admin_id: adminid });
    if (error) throw error;
    const resumo = data[0];
    return [
        { name: 'Total', value: resumo.total },
        { name: 'Débitos a Pagar', value: resumo.debitos_pendentes },
        { name: 'Novos Fornecedores | Mês', value: resumo.novos_mes }
    ];
};


export const getResumoVendas = async (adminid) => {
    // Chama a função RPC 'resumo_vendas' no banco, passando o adminid como parâmetro
    const { data, error } = await supabase.rpc('resumo_vendas', { admin_id: adminid });
    // Se houver erro na consulta, lança exceção
    if (error) throw error;
    // A função RPC retorna um array com um único objeto, pegamos o primeiro elemento
    const resumo = data[0];
    // Retorna um array de objetos, cada um com o nome do resumo e o respectivo valor obtido
    return [
            { name: 'Total', value: resumo.total },                              // Total de vendas no mês
            { name: 'Hoje', value: resumo.hoje },                                // Vendas criadas hoje
            { name: 'Parcelas a vencer hoje', value: resumo.parcelas_a_vencer_hoje },// Quantidade de parcelas com vencimento hoje
            { name: 'Pagas', value: resumo.pagas },                              // Vendas pagas no mês
            { name: 'Pagamento pendente', value: resumo.pendentes },             // Vendas com pagamento pendente no mês
            { name: 'Parcelas atrasadas', value: resumo.parcelas_atrasadas },    // Parcelas de vendas com status atrasado
            { name: 'Cancelada', value: resumo.canceladas },                     // Vendas canceladas no mês
    ];
};


export const getResumoCompras = async (adminid) => {
    // Chama a função RPC 'resumo_compras' no banco, passando o adminid como parâmetro
    const { data, error } = await supabase.rpc('resumo_compras', { admin_id: adminid });
    // Se houver erro na consulta, lança exceção
    if (error) throw error;
    // A função RPC retorna um array com um único objeto, pegamos o primeiro elemento
    const resumo = data[0];
    console.log(resumo);
    // Retorna um array de objetos, cada um com o nome do resumo e o respectivo valor obtido
    return [
            { name: 'Total', value: resumo.total },                              // Total de vendas no mês
            { name: 'Hoje', value: resumo.hoje },                                // Vendas criadas hoje
            { name: 'Parcelas a vencer hoje', value: resumo.parcelas_a_vencer_hoje },// Quantidade de parcelas com vencimento hoje
            { name: 'Pagas', value: resumo.pagas },                              // Vendas pagas no mês
            { name: 'Pagamento pendente', value: resumo.pendentes },             // Vendas com pagamento pendente no mês
            { name: 'Parcelas atrasadas', value: resumo.parcelas_atrasadas },    // Parcelas de vendas com status atrasado
            { name: 'Cancelada', value: resumo.canceladas },                     // Vendas canceladas no mês
    ];
};


export const getProdutosMaisVendidos = async (adminid) => {
    // Chama a função RPC 'get_produtos_mais_vendidos' no Supabase,
    // passando o admin_id como parâmetro
    const { data, error } = await supabase.rpc('get_produtos_mais_vendidos', {
        admin_id: adminid
    });
    // Se ocorrer algum erro na chamada, exibe no console e lança o erro
    if (error) {
        console.error('Erro ao buscar produtos mais vendidos:', error);
        throw error;
    }
    // Retorna os dados recebidos da função RPC
    return data;
};


export const getClientesQueMaisCompraram = async (adminid) => {
    // Chama a função RPC 'get_clientes_que_mais_compraram' no Supabase,
    // passando o admin_id como parâmetro
    const { data, error } = await supabase.rpc('get_clientes_que_mais_compraram', {
        admin_id: adminid
    });
    // Se ocorrer algum erro, exibe e lança erro
    if (error) {
        console.error('Erro ao buscar clientes que mais compraram:', error);
        throw error;
    }
    // Retorna a lista de clientes com seus valores totais de compras
    return data;
};


export const getComparativoVendasPorDia = async (adminid, anoSelecionado, mesSelecionado) => {
    const { data, error } = await supabase.rpc('get_comparativo_vendas_por_dia', {
        admin_id: adminid,
        ano: anoSelecionado,
        mes: mesSelecionado,
    });
    if (error) {
        console.error('Erro ao buscar comparativo de vendas por dia:', error);
        throw error;
    }
    // data vem como array de objetos { dia, vendas_mes_anterior, vendas_mes_atual }
    // Transformamos para arrays separados e labels para gráfico
    const vendasPorDiaAnterior = [];
    const vendasPorDiaAtual = [];
    const labels = [];
    data.forEach(({ dia, vendas_mes_anterior, vendas_mes_atual }) => {
        vendasPorDiaAnterior.push(Number(vendas_mes_anterior));
        vendasPorDiaAtual.push(Number(vendas_mes_atual));
        labels.push(`Dia ${dia}`);
    });
    return [vendasPorDiaAnterior, vendasPorDiaAtual, labels];
};



export const getComparativoComprasPorDia = async (adminid, anoSelecionado, mesSelecionado) => {
    const { data, error } = await supabase.rpc('get_comparativo_compras_por_dia', {
        admin_id: adminid,
        ano: anoSelecionado,
        mes: mesSelecionado,
    });
    if (error) {
        console.error('Erro ao buscar comparativo de compras por dia:', error);
        throw error;
    }
    // data vem como array de objetos { dia, compras_mes_anterior, compras_mes_atual }
    // Transformamos para arrays separados e labels para gráfico
    const comprasPorDiaAnterior = [];
    const comprasPorDiaAtual = [];
    const labels = [];
    data.forEach(({ dia, compras_mes_anterior, compras_mes_atual }) => {
        comprasPorDiaAnterior.push(Number(compras_mes_anterior));
        comprasPorDiaAtual.push(Number(compras_mes_atual));
        labels.push(`Dia ${dia}`);
    });
    return [comprasPorDiaAnterior, comprasPorDiaAtual, labels];
};


export const getResumoProdutosPorPeriodo = async (adminid, anoSelecionado, mesSelecionado) => {
    const { data, error } = await supabase
    .rpc('get_resumo_produtos_por_periodo', {
        p_adminid: adminid,
        p_ano: anoSelecionado,
        p_mes: mesSelecionado
    });

    if (error) throw error;

    return data;

};
