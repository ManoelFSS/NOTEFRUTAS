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


