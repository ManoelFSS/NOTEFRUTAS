import { supabase } from '../../../services/supabase';


export const getResumoFinanceiro = async (adminid) => {
    const now = new Date()
    const mesAtual = now.getMonth() + 1
    const anoAtual = now.getFullYear()
    const lastDayOfMonth = new Date(anoAtual, mesAtual, 0).getDate()

    // Buscar vendas do mês atual filtradas por adminid
    const { data: vendas, error: vendasError } = await supabase
        .from('vendas')
        .select('id, valor_total, created_at')
        .eq('adminid', adminid)
        .gte('created_at', `${anoAtual}-${mesAtual.toString().padStart(2, '0')}-01`)
        .lte('created_at', `${anoAtual}-${mesAtual.toString().padStart(2, '0')}-${lastDayOfMonth.toString().padStart(2, '0')}`)

    if (vendasError) throw vendasError

    let totalVendasMes = 0
    let totalParcelasNaoPagasMes = 0

    for (const venda of vendas) {
        totalVendasMes += venda.valor_total

        const { data: parcelas, error: parcelasError } = await supabase
            .from('parcelas_venda')
            .select('valor_parcela, status')
            .eq('venda_id', venda.id)
            .not('status', 'in', '(Paga,Cancelada)')

        if (parcelasError) throw parcelasError

        for (const parcela of parcelas) {
            totalParcelasNaoPagasMes += parcela.valor_parcela
        }
    }

    console.log('totalVendasMes', totalVendasMes)
    console.log('totalParcelasNaoPagasMes', totalParcelasNaoPagasMes)

    return totalVendasMes - totalParcelasNaoPagasMes

}


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
        { name: 'Novos | Mês', value: novosMes}        // Azul
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
        { name: 'Novos | Mês', value: novosMes }        // Azul
    ];
};


export const getResumoVendas = async (adminid) => {
    const now = new Date();
    const primeiroDia = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const ultimoDia = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString();
    const hoje = new Date().toISOString().slice(0, 10);

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
        .gte('created_at', `${hoje}T00:00:00`)
        .lte('created_at', `${hoje}T23:59:59`);
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

    // IDs de vendas no mês para buscar parcelas "A vencer"
    const { data: vendasMes, error: errorVendasMes } = await filtroMes(
        supabase
        .from('vendas')
        .select('id')
        .eq('adminid', adminid)
    );
    if (errorVendasMes) throw errorVendasMes;

    const idsVendasMes = vendasMes.map(v => v.id);

    // Parcelas com status "A vencer"
    const { data: parcelasAVencer, error: errorParcelas } = await supabase
        .from('parcelas_venda')
        .select('venda_id')
        .eq('status', 'A vencer');
    if (errorParcelas) throw errorParcelas;

    const vendasAReceber = [
        ...new Set(
            parcelasAVencer
            .filter(p => idsVendasMes.includes(p.venda_id))
            .map(p => p.venda_id)
        )
    ];


    // Parcelas com status "Atrasada"
    const { data: parcelasAtrasadas, error: errorAtrasadas } = await supabase
        .from('parcelas_venda')
        .select('venda_id')
        .eq('status', 'Atrasada');
    if (errorAtrasadas) throw errorAtrasadas;

    const vendasAtrasadas = [
        ...new Set(
            parcelasAtrasadas
            .filter(p => idsVendasMes.includes(p.venda_id))
            .map(p => p.venda_id)
        )
    ];



    return [
        { name: 'Total', value: total },
        { name: 'Vendas Hoje', value: hojeCount },
        { name: 'Vendas com parcelas a vencer hoje', value: vendasAReceber.length },
        { name: 'Vendas Pagas', value: pagas },
        { name: 'Vendas com pagamento pendente', value: pendentes },
        { name: 'Vendas com parcelas atrasadas', value: vendasAtrasadas.length },
        { name: 'Vendas cancelada', value: canceladas }
    ];
};


