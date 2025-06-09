export const handler = async () => {
    const SUPABASE_FUNCTION_URL = process.env.VITE_SUPABASE_FUNCTION_URL;
    
    const res = await fetch(SUPABASE_FUNCTION_URL, {
        method: "POST", // ou "GET" conforme sua função
        headers: {
        "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        return {
        statusCode: res.status,
        body: JSON.stringify({ error: "Erro ao chamar função Supabase" }),
        };
    }

    const data = await res.json();

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Função executada com sucesso", data }),
    };
};
