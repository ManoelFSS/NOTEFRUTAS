import { supabase } from '../services/supabase';


export const getResumoFinanceiro = async (adminid) => {
    const now = new Date();
    const mesAtual = now.getMonth() + 1;
    const anoAtual = now.getFullYear();
    const lastDayOfMonth = new Date(anoAtual, mesAtual, 0).getDate();

    // Buscar vendas do mês atual filtradas por adminid e que não estejam canceladas
    const { data: vendas, error: vendasError } = await supabase
        .from('vendas')
        .select('id, valor_total, created_at')
        .eq('adminid', adminid)
        .neq('status', 'Cancelada') // <-- Aqui está o filtro novo
        .gte('created_at', `${anoAtual}-${mesAtual.toString().padStart(2, '0')}-01`)
        .lte('created_at', `${anoAtual}-${mesAtual.toString().padStart(2, '0')}-${lastDayOfMonth.toString().padStart(2, '0')}`);

    if (vendasError) throw vendasError;

    let totalVendasMes = 0;
    let totalParcelasNaoPagasMes = 0;

    for (const venda of vendas) {
        totalVendasMes += venda.valor_total;

        const { data: parcelas, error: parcelasError } = await supabase
            .from('parcelas_venda')
            .select('valor_parcela, status')
            .eq('venda_id', venda.id)
            .not('status', 'in', '(Paga,Cancelada)'); // Considera apenas parcelas não pagas e não canceladas

        if (parcelasError) throw parcelasError;

        for (const parcela of parcelas) {
            totalParcelasNaoPagasMes += parcela.valor_parcela;
        }
    }

    console.log('totalVendasMes', totalVendasMes);
    console.log('totalParcelasNaoPagasMes', totalParcelasNaoPagasMes);

    return totalVendasMes - totalParcelasNaoPagasMes;
};



export const getParcelasAtrasadas = async (adminid) => {
    // Buscar IDs das vendas PENDENTES desse admin
    const { data: vendasPendentes, error: vendasError } = await supabase
        .from('vendas')
        .select('id')
        .eq('adminid', adminid)
        .eq('status', 'Pendente');

    if (vendasError) throw vendasError;

    const idsVendas = vendasPendentes.map(v => v.id);

    if (idsVendas.length === 0) return 0; // Nenhuma venda pendente, retorna 0

    // Buscar parcelas com status "Atrasada" ligadas às vendas pendentes
    const { data: parcelasAtrasadas, error: parcelasError } = await supabase
        .from('parcelas_venda')
        .select('valor_parcela')
        .eq('status', 'Atrasada')
        .in('venda_id', idsVendas);

    if (parcelasError) throw parcelasError;

    const totalAtrasado = parcelasAtrasadas.reduce((soma, p) => soma + p.valor_parcela, 0);

    return totalAtrasado;
};



export const getTotalParcelasVencimentoHoje = async (adminid) => {
    const now = new Date()
    const diaAtual = now.getDate().toString().padStart(2, '0')
    const mesAtual = (now.getMonth() + 1).toString().padStart(2, '0')
    const anoAtual = now.getFullYear()

    const dataHoje = `${anoAtual}-${mesAtual}-${diaAtual}`

    const { data: parcelasHoje, error } = await supabase
        .from('parcelas_venda')
        .select('valor_parcela')
        .eq('adminid', adminid)
        .eq('data_vencimento', dataHoje)
        .not('status', 'in', '(Paga,Cancelada)')

    if (error) throw error

    const total = parcelasHoje.reduce((acc, parcela) => acc + parcela.valor_parcela, 0)

    return total
}


export const getResumoClientes = async (adminid) => {
    // Total geral
    const { count: total, error: errorTotal } = await supabase
        .from('clientes')
        .select('*', { count: 'exact', head: true })
        .eq('adminid', adminid);

    if (errorTotal) throw errorTotal;

    // Total com status "Débitos a Pagar"
    const { count: debitosPendentes, error: errorDebitos } = await supabase
        .from('clientes')
        .select('*', { count: 'exact', head: true })
        .eq('adminid', adminid)
        .eq('status', 'Débitos a Pagar');

    if (errorDebitos) throw errorDebitos;

    // Total do mês/ano atual
    const now = new Date();
    const primeiroDia = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const ultimoDia = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();

    const { count: novosMes, error: errorNovos } = await supabase
        .from('clientes')
        .select('*', { count: 'exact', head: true })
        .eq('adminid', adminid)
        .gte('created_at', primeiroDia)
        .lte('created_at', ultimoDia);

    if (errorNovos) throw errorNovos;

    return [
        { name: 'Total', value: total},               // Verde
        { name: 'Débitos pendentes', value: debitosPendentes}, // Vermelho
        { name: 'Novos Clientes | Mês', value: novosMes}        // Azul
    ];
};



export const getResumoFornecedores = async (adminid) => {
  // Total geral
    const { count: total, error: errorTotal } = await supabase
        .from('fornecedores')
        .select('id', { count: 'exact' })
        .eq('adminid', adminid);

    if (errorTotal) throw errorTotal;

    // Total com status "Débitos a Pagar"
    const { count: debitosPendentes, error: errorDebitos } = await supabase
        .from('fornecedores')
        .select('id', { count: 'exact' })
        .eq('adminid', adminid)
        .eq('status', 'Débitos a Pagar');

    if (errorDebitos) throw errorDebitos;

    // Total do mês/ano atual
    const now = new Date();
    const primeiroDia = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const ultimoDia = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();

    const { count: novosMes, error: errorNovos } = await supabase
        .from('fornecedores')
        .select('id', { count: 'exact' })
        .eq('adminid', adminid)
        .gte('created_at', primeiroDia)
        .lte('created_at', ultimoDia);

    if (errorNovos) throw errorNovos;

    return [
        { name: 'Total', value: total },                // Verde
        { name: 'Débitos a Pagar', value: debitosPendentes }, // Vermelho
        { name: 'Novos Fornecedores | Mês', value: novosMes }        // Azul
    ];
};



export const getResumoVendas = async (adminid) => {
    const now = new Date();
    const primeiroDia = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const ultimoDia = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString();
    
    const hoje = new Date().toISOString().slice(0, 10); // yyyy-mm-dd
    const hojeInicio = `${hoje}T00:00:00`;
    const hojeFim = `${hoje}T23:59:59`;

    const filtroMes = (query) =>
        query
            .gte('created_at', primeiroDia)
            .lte('created_at', ultimoDia);

    // Total de vendas no mês
    const { count: total, error: errorTotal } = await filtroMes(
        supabase
            .from('vendas')
            .select('*', { count: 'exact', head: true })
            .eq('adminid', adminid)
    );
    if (errorTotal) throw errorTotal;

    // Vendas criadas hoje
    const { count: hojeCount, error: errorHoje } = await supabase
        .from('vendas')
        .select('*', { count: 'exact', head: true })
        .eq('adminid', adminid)
        .gte('created_at', hojeInicio)
        .lte('created_at', hojeFim);
    if (errorHoje) throw errorHoje;

    // Vendas pagas no mês
    const { count: pagas, error: errorPagas } = await filtroMes(
        supabase
            .from('vendas')
            .select('*', { count: 'exact', head: true })
            .eq('adminid', adminid)
            .eq('status', 'Paga')
    );
    if (errorPagas) throw errorPagas;

    // Vendas pendentes no mês
    const { count: pendentes, error: errorPendentes } = await filtroMes(
        supabase
            .from('vendas')
            .select('*', { count: 'exact', head: true })
            .eq('adminid', adminid)
            .eq('status', 'Pendente')
    );
    if (errorPendentes) throw errorPendentes;

    // Vendas canceladas no mês
    const { count: canceladas, error: errorCanceladas } = await filtroMes(
        supabase
            .from('vendas')
            .select('*', { count: 'exact', head: true })
            .eq('adminid', adminid)
            .eq('status', 'Cancelada')
    );
    if (errorCanceladas) throw errorCanceladas;

    // IDs das vendas do mês
    const { data: vendasMes, error: errorVendasMes } = await filtroMes(
        supabase
            .from('vendas')
            .select('id')
            .eq('adminid', adminid)
    );
    if (errorVendasMes) throw errorVendasMes;

    const idsVendasMes = vendasMes.map(v => v.id);

    // Parcelas com status "A vencer" e vencendo HOJE
    const { data: parcelasHoje, error: errorParcelas } = await supabase
        .from('parcelas_venda')
        .select('venda_id')
        .in('status', ['A vencer', 'Hoje'])
        .gte('data_vencimento', hojeInicio)
        .lte('data_vencimento', hojeFim);
    if (errorParcelas) throw errorParcelas;

    // Filtrar apenas vendas do mês
    const vendasAReceberHoje = [
        ...new Set(
            parcelasHoje
                .filter(p => idsVendasMes.includes(p.venda_id))
                .map(p => p.venda_id)
        )
    ];

    // Parcelas "Atrasadas"
    const { data: parcelasAtrasadas, error: errorAtrasadas } = await supabase
        .from('parcelas_venda')
        .select('venda_id')
        .eq('status', 'Atrasada');
    if (errorAtrasadas) throw errorAtrasadas;

    const vendasAtrasadas = [...new Set(parcelasAtrasadas.map(p => p.venda_id))];

    return [
        { name: 'Total', value: total },
        { name: 'Vendas Hoje', value: hojeCount },
        { name: 'Vendas com parcelas a vencer hoje', value: vendasAReceberHoje.length },
        { name: 'Vendas Pagas', value: pagas },
        { name: 'Vendas com pagamento pendente', value: pendentes },
        { name: 'Vendas com parcelas atrasadas', value: vendasAtrasadas.length },
        { name: 'Vendas cancelada', value: canceladas }
    ];
};



export const getProdutosMaisVendidos = async (adminid) => {
    const now = new Date();
    const primeiroDia = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const ultimoDia = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString();

    // Buscar todos os produtos (apenas id e name)
    const { data: produtos, error: errorProdutos } = await supabase
        .from('produtos')
        .select('id, name')
        .eq('adminid', adminid); // se necessário filtrar por admin

    if (errorProdutos) throw errorProdutos;

    // Buscar todos os itens de venda do mês/ano atual
    const { data: itensVenda, error: errorItens } = await supabase
        .from('itens_venda')
        .select('produto_id, valor_total, created_at')
        .gte('created_at', primeiroDia)
        .lte('created_at', ultimoDia);

    if (errorItens) throw errorItens;

    // Montar um mapa com soma total por produto
    const mapaTotais = {};

    for (const item of itensVenda) {
        const id = item.produto_id;
        if (!mapaTotais[id]) {
        mapaTotais[id] = 0;
        }
        mapaTotais[id] += item.valor_total;
    }

    // Montar a resposta com nome do produto e valor total
    const resultado = produtos
        .filter(p => mapaTotais[p.id]) // Só produtos com venda
        .map(p => ({
            name: p.name,
            value: mapaTotais[p.id]
        }));

    return resultado;
};



export const getClientesQueMaisCompraram = async (adminid) => {
    const now = new Date();
    const primeiroDia = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const ultimoDia = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString();

    // Buscar todos os clientes (id e nome)
    const { data: clientes, error: errorClientes } = await supabase
        .from('clientes')
        .select('id, name')
        .eq('adminid', adminid); // se necessário

    if (errorClientes) throw errorClientes;

    // Buscar todas as vendas do mês atual com id do cliente e valor total
    const { data: vendas, error: errorVendas } = await supabase
        .from('vendas')
        .select('cliente_id, valor_total, created_at')
        .gte('created_at', primeiroDia)
        .lte('created_at', ultimoDia)
        .eq('adminid', adminid); // se necessário

    if (errorVendas) throw errorVendas;

    // Somar valor total por cliente
    const mapaTotais = {};

    for (const venda of vendas) {
        const id = venda.cliente_id;
        if (!mapaTotais[id]) {
            mapaTotais[id] = 0;
        }
        mapaTotais[id] += venda.valor_total;
    }

    // Montar a resposta com nome do cliente e valor total
    const resultado = clientes
        .filter(c => mapaTotais[c.id]) // Apenas clientes que compraram
        .map(c => ({
            name: c.name,
            value: mapaTotais[c.id]
        }))
        .sort((a, b) => b.value - a.value); // Opcional: ordenar por valor decrescente

    return resultado;
};


export const getComparativoVendasPorDia = async (adminid, anoSelecionado, mesSelecionado) => {
    // Ajusta mesSelecionado de 1-12 para 0-11 (ex.: 5 para maio vira 4)
    const mesAjustado = mesSelecionado - 1;

    // Ajusta o mês anterior considerando ano e mês selecionados
    const dataAtual = new Date(anoSelecionado, mesAjustado, 1);
    const dataAnterior = new Date(anoSelecionado, mesAjustado - 1, 1);
    
    const anoAtual = dataAtual.getFullYear();
    const mesAtual = dataAtual.getMonth();

    const anoAnterior = dataAnterior.getFullYear();
    const mesAnterior = dataAnterior.getMonth();

    const getLimitesDoMes = (ano, mes) => {
        const primeiro = new Date(ano, mes, 1);
        const ultimo = new Date(ano, mes + 1, 0, 23, 59, 59);
        return [primeiro.toISOString(), ultimo.toISOString()];
    };

    const [inicioAtual, fimAtual] = getLimitesDoMes(anoAtual, mesAtual);
    const [inicioAnterior, fimAnterior] = getLimitesDoMes(anoAnterior, mesAnterior);

    const { data: vendasAtual, error: erroAtual } = await supabase
        .from('vendas')
        .select('created_at, valor_total')
        .gte('created_at', inicioAtual)
        .lte('created_at', fimAtual)
        .eq('adminid', adminid);

    if (erroAtual) throw erroAtual;

    const { data: vendasAnterior, error: erroAnterior } = await supabase
        .from('vendas')
        .select('created_at, valor_total')
        .gte('created_at', inicioAnterior)
        .lte('created_at', fimAnterior)
        .eq('adminid', adminid);

    if (erroAnterior) throw erroAnterior;

    const agruparPorDia = (vendas, ano, mes) => {
        const diasNoMes = new Date(ano, mes + 1, 0).getDate();
        const totaisPorDia = Array(diasNoMes).fill(0);
        for (const venda of vendas) {
            const data = new Date(venda.created_at);
            const dia = data.getDate(); // 1 a 31
            totaisPorDia[dia - 1] += venda.valor_total;
        }
        return totaisPorDia;
    };

    const vendasPorDiaAtual = agruparPorDia(vendasAtual, anoAtual, mesAtual);
    const vendasPorDiaAnterior = agruparPorDia(vendasAnterior, anoAnterior, mesAnterior);

    // Gera os rótulos de 1 até o maior número de dias entre os dois meses
    const diasNoMesSelecionado = new Date(anoSelecionado, mesSelecionado, 0).getDate();
    const labels = Array.from({ length: diasNoMesSelecionado }, (_, i) => `Dia ${i + 1}`);

    while (vendasPorDiaAtual.length < diasNoMesSelecionado) vendasPorDiaAtual.push(0);
    while (vendasPorDiaAnterior.length < diasNoMesSelecionado) vendasPorDiaAnterior.push(0);

    return [
        vendasPorDiaAnterior, // índice 0: mês anterior
        vendasPorDiaAtual,    // índice 1: mês selecionado
        labels                // índice 2: labels do gráfico
    ];
};



export const getResumoProdutosPorPeriodo = async (adminid, anoSelecionado, mesSelecionado) => {
    const mesAjustado = mesSelecionado - 1; // Ajusta 1-12 para 0-11
    const primeiroDia = new Date(anoSelecionado, mesAjustado, 1).toISOString();
    const ultimoDia = new Date(anoSelecionado, mesAjustado + 1, 0, 23, 59, 59).toISOString();

    // Buscar produtos
    const { data: produtos, error: errorProdutos } = await supabase
        .from('produtos')
        .select('id, name, category, stock')
        .eq('adminid', adminid);

    if (errorProdutos) throw errorProdutos;

    // Buscar itens de venda no período
    const { data: itensVenda, error: errorItens } = await supabase
        .from('itens_venda')
        .select('produto_id, valor_total, quantidade, created_at')
        .gte('created_at', primeiroDia)
        .lte('created_at', ultimoDia);

    if (errorItens) throw errorItens;

    // Agrupar totais por produto
    const mapaTotais = {};

    for (const item of itensVenda) {
        const id = item.produto_id;
        if (!mapaTotais[id]) {
        mapaTotais[id] = {
            valor_total: 0,
            quantidade: 0,
        };
        }
        mapaTotais[id].valor_total += item.valor_total;
        mapaTotais[id].quantidade += item.quantidade;
    }

    // Montar resultado final
    const resultado = produtos
        .filter(p => mapaTotais[p.id])
        .map(p => ({
        id: p.id,
        name: p.name,
        category: p.category,
        stock: p.stock,
        valor_total: mapaTotais[p.id].valor_total,
        quantidade: mapaTotais[p.id].quantidade,
        }));

    return resultado;
};
