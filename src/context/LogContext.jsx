// context/LogsContext.js
import { createContext, use, useContext, useEffect, useState } from "react";
import { supabase } from '../services/supabase';
// context
import { useAuthContext } from "./AuthContext";

const LogsContext = createContext();

export const LogsProvider = ({ children }) => {

    const { user, userId } = useAuthContext();
    console.log( 'userId:', userId);

    const [logs, setLogs] = useState([]); // Lista de logs
    const [caunterLogs, setCaunterLogs] = useState(0); // Contador de logs
    const [idLog, setIdLog] = useState(''); // Controle do campo id do log

  // Função para contar documentos (adaptada para Supabase)
    const contarDocumentos = async (userId) => {
        try {
            const { count, error } = await supabase
                .from('logs_sistema')
                .select('*', { count: 'exact', head: true }) // Apenas conta os registros
                .eq('adminid', userId);

            if (error) throw error;

            setCaunterLogs(count);
            return count;
        } catch (error) {
            console.error('Erro ao contar logs:', error.message);
            throw error;
        }
    };

  // Função para cadastrar um novo log
    const cadastrarLog = async (logData) => {
        
        try {
            // Inserir o log no Supabase
            const { data, error } = await supabase
                .from('logs_sistema')
                .insert([logData]);
            
            if (error) {
                throw error;
            }
            
        } catch (error) {
            console.error('Erro ao cadastrar log:', error);
        } 
    };

    // Função para editar um log
    const editarLog = async (novosDados, id) => {
        setLoading(true);
        
        try {
            const { error } = await supabase
                .from('logs_sistema')
                .update(novosDados)
                .eq('id', id);

            if (error) {
                throw error;
            }

        } catch (error) {
            console.error('Erro ao atualizar log:', error.message);
        }
    };

    // Função para buscar logs do usuário com paginação
    const buscarLogsPorPorAdmin = async (userId, limitepage, paginacao) => {
        try {

            const totalLogs = await contarDocumentos(userId);
            setCaunterLogs(totalLogs);

            if (!userId || limitepage <= 0 || paginacao < 1) {
                throw new Error('Parâmetros inválidos');
            }

            const page = paginacao;
            const pageSize = limitepage;
            const from = (page - 1) * pageSize;
            const to = from + pageSize - 1;

            // Gera a data do primeiro dia do mês atual (ex: 2025-05-01T00:00:00Z)
            const now = new Date();
            const primeiroDiaMes = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

            const { data, error, count } = await supabase
                .from('logs_sistema')
                .select('*', { count: 'exact' })
                .eq('adminid', userId)
                .gte('created_at', primeiroDiaMes)
                .order('created_at', { ascending: false })
                .range(from, to);

            if (error) {
                throw error;
            }

            setLogs(data);
            setCaunterLogs(count);
            
            return data;
        } catch (error) {
            console.error('Erro ao buscar logs:', error.message);
            return [];
        }
    };

    // Configurar assinatura Realtime
    useEffect(() => {
        const setupRealtime = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
            console.error('Usuário não está logado');
            return;
            }

            const userId = user.id;
            console.log('Usuário logado:', userId);

            // Carrega os logs iniciais (se necessário)
            await buscarLogsPorPorAdmin(userId, 100, 1);

            // Assinatura do canal com filtro
            const subscription = supabase
                .channel('logs_sistema_schema_changes') // Nome do canal específico
                .on(
                    'postgres_changes',
                    {
                        event: 'INSERT', // Escuta apenas INSERT
                        schema: 'public',
                        table: 'logs_sistema', // Tabela específica
                        filter: `adminid=eq.${userId}`, // Filtro para o usuário logado
                    },
                    (payload) => {
                        console.log('Novo log em logs_sistema_duplicate:', payload);
                        setLogs((prev) => [payload.new, ...prev]);
                    }
                )
                .subscribe();

            return () => {
            supabase.removeChannel(subscription);
            };
        };

        setupRealtime();
    }, []);




    return (
        <LogsContext.Provider
        value={{
            cadastrarLog,
            buscarLogsPorPorAdmin,
            editarLog,
            logs, setLogs,
            caunterLogs, setCaunterLogs,
            idLog, setIdLog,
        }}
        >
        {children}
        </LogsContext.Provider>
    );
};

// Hook para usar o contexto

// Hook para usar o contexto
export const useLogs = () => useContext(LogsContext);