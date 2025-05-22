import { createContext, useContext, useState, useEffect } from "react";
// schema
import { registerSchema, recoverySchema  } from "../validationSchemas/Schemas"
// services
import { encryptPassword, decryptPassword } from "../services/encryptionService";
import { useNavigate } from 'react-router-dom'
//supabase
import { supabase } from '../services/supabase'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(null);// loading do form
    const [messege, setMessege] = useState(null);// controle do componente messege
    const [selectForm, setSelectForm] = useState("login");


    // const handlePasswordReset = async (email) => {
    //     const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    //         redirectTo: 'https://notefrutas.netlify.app/', // opcional: onde o usuário será redirecionado após clicar no link
    //     });

    //     if (error) {
    //         console.error('Erro ao enviar e-mail de recuperação:', error.message);
    //         return;
    //     }

    //     console.log('E-mail de recuperação enviado!');
    // };


useEffect(() => {
    const getSession = async () => {
        try {
        const { data, error } = await supabase.auth.getSession()

        if (error) {
            console.error('Erro ao obter a sessão:', error.message)
            setAuthenticated(false)
            return
        }

        const session = data.session

        if (session?.user) {
            const user = session.user
            setUser(user)
            setUserId(user.id)
            setAuthenticated(true)
            getuser(user.id)
            localStorage.setItem('email', user.email)
        } else {
            setUser(null)
            setUserId(null)
            setAuthenticated(false)
        }
        } catch (err) {
        console.error('Erro inesperado ao recuperar sessão:', err)
            setUser(null)
            setUserId(null)
            setAuthenticated(false)
        }
    }

    getSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
            setUser(session.user)
            setUserId(session.user.id)
            setAuthenticated(true)
            getuser(session.user.id)
            localStorage.setItem('email', session.user.email)
        } else {
            setUser(null)
            setUserId(null)
            setAuthenticated(false)
        }
    })

    return () => {
        listener?.subscription?.unsubscribe()
    }
}, [])


     // Função de login
    const signInUser = async (email, password) => {
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                throw error;
            }

            const user = data.user;
            console.log('Usuário autenticado com sucesso:', user);

            // Busca os dados do usuário da tabela "users"
            // await getuser(user.id);

            console.log("Login realizado com sucesso!");
            setAuthenticated(true);
            setUserId(user.id)
            navigate("/dashboard");
            localStorage.setItem('email', user.email)

            return { success: true };
        } catch (error) {
            console.error("Erro ao fazer login:", error.message);
            setTimeout(() => {
                setMessege({ 
                    success: false,
                    title: "Email ou Senha Incorreto", 
                    message: "Email ou senha incorretos. Verifique seus dados e tente novamente." 
                });
            }, 2000);
            return { success: false };
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };


    const logoutUser = async () => {
    try {
        console.log("Iniciando logout...");
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Erro ao deslogar no Supabase:", error);
            throw error;
        }

        console.log("Logout realizado com sucesso!");
        setUser(null);
        setUserId(null);
        setAuthenticated(false);
        setSelectForm("login");
        localStorage.removeItem('email');
        navigate("/");

        // Verificar se a sessão foi realmente limpa
        const { data: sessionData } = await supabase.auth.getSession();
        console.log("Sessão após logout:", sessionData);
    } catch (error) {
        console.error("Erro ao deslogar:", error.message);
        setMessege({
            success: false,
            title: "Erro ao deslogar",
            message: "Não foi possível deslogar. Tente novamente."
        });
    }
};


    // Função de cadastro
    const registerUser = async (data) => {
        setLoading(true);

        try {
            const validatedUser = registerSchema.parse(data);
            if (!validatedUser) return validatedUser.errors;

            // Criar usuário no Supabase Auth
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
            });

            if (signUpError) throw signUpError;

            const user = signUpData.user;
            console.log('Usuário criado com sucesso:', user);

            const getEncryptedPassword = await encryptPassword( data.password ); // Senha criptografada

            // Se quiser guardar mais dados do usuário, use uma tabela (ex: "users")
            // Como Supabase Auth não salva outros campos além do email e senha
            const { error: insertError } = await supabase
            .from('users')
            .insert([
                {
                    id: user.id,             // chave PK, para linkar com auth
                    name: data.name,
                    phone: data.phone,
                    email: data.email,
                    lastpaymentdate: data.lastPaymentDate,
                    acceptterms: data.acceptTerms,
                    isadmin: data.isAdmin,
                    createdat: new Date(),
                    status: data.status,
                    password: getEncryptedPassword
                },
            ]);

            if (insertError) throw insertError;

            setTimeout(() => {
            setMessege({
                success: true,
                title: 'Cadastro Realizado com sucesso ✅',
                message: `
                ✅ Bem-vindo ao Trin-Flow! 🎉\n
                Estamos felizes por ter você com a gente!
                Agora você faz parte de uma plataforma que vai transformar sua experiência.\n
                Explore, aproveite e conte conosco nessa jornada.\n
                💚 Vamos começar? 😉
                `,
            });
            }, 2000);

            return { success: true };
        } catch (error) {
            console.error('Erro ao cadastrar:', error);

            if (error.status === 400 || error.message?.includes('already registered')) {
            setTimeout(() => {
                setMessege({
                success: false,
                title: '❌ Erro ao Cadastrar',
                message: 'O e-mail já está em uso!\n\n Tente fazer login ou recuperar sua senha.',
                });
            }, 2000);
            } else {
            setTimeout(() => {
                setMessege({
                success: false,
                title: '❌ Erro ao Cadastrar',
                message: error.message || 'Erro desconhecido',
                });
            }, 2000);
            }

            return { success: false };
        } finally {
            setTimeout(() => {
            setLoading(false);
            }, 2000);
        }
    };

    // Função para buscar o usuário e alterar a senha
    const updateUserPassword = async (data) => {
        setLoading(true);
        

        try {
            const validatedUserRecovery = recoverySchema.parse(data);
            if (!validatedUserRecovery) return validatedUserRecovery.errors;

            // 1️⃣ Buscar o usuário pelo e-mail na tabela users
            const { data: userQuery, error: userError } = await supabase
                .from('users')
                .select('*')
                .eq('email', data.email)
                .single();

            // handlePasswordReset(data.email );

            if (userError || !userQuery) {
                throw new Error("❌ Usuário não encontrado.");
            }

            const userData = userQuery;

            if (!userData.password) {
                throw new Error("❌ Senha não encontrada.");
            }

            // 2️⃣ Descriptografar a senha salva no banco
            const decryptedPassword = await decryptPassword(userData.password);

            if (decryptedPassword === data.password) {
                throw new Error(" Erro ao atualizar, a senha muito semelhante. Por favor, escolha uma senha diferente.");
                
            }


            // 3️⃣ Autenticar o usuário com o Supabase Auth
            const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: decryptedPassword
            });

            if (signInError || !authData?.user) {
                throw new Error("❌ Falha ao autenticar o usuário.");
            }

            // 4️⃣ Atualizar a senha no Supabase Auth
            const { error: updateError } = await supabase.auth.updateUser({
                password: data.password
            });

            if (updateError) {
                console.log(updateError)
                throw new Error("❌ Erro ao atualizar a senha no Auth.");
            }else {
                console.log("Senha atualizada com sucesso!");
            }

            // 5️⃣ Criptografar a nova senha e atualizar no banco de dados
            const encryptedNewPassword =  await encryptPassword(data.password); // Sua função
            console.log("Nova senha criptografada:", encryptedNewPassword);


            const { error: updateDbError } = await supabase
                .from('users')
                .update({ password: encryptedNewPassword })
                .eq('email', data.email);

            if (updateDbError) {
                throw new Error("❌ Erro ao atualizar a senha no banco.");
            }

            setTimeout(() => {
                setMessege({ 
                    success: true,
                    title: "Senha Redefinida com sucesso! ✅",
                    message: `
                        🔒 Sua senha foi atualizada com sucesso!\n
                        Agora você pode acessar sua conta com segurança e tranquilidade.\n
                        Atenciosamente Equipe ➡️ Trin-Flow!
                    `
                });
            }, 2000);

            return { success: true };

        } catch (error) {
            console.error("Erro ao atualizar a senha:", error);
            setTimeout(() => {
                setMessege({ 
                    success: false,
                    title: "❌ Erro ao atualizar a senha", 
                    message: error.message || "Erro inesperado"
                });
            }, 2000);
            return { success: false };
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };



    // Função para obter os dados do usuário
    const getuser = async (userId) => {
        if (!userId) return { success: false, message: "userId não encontrado." };

        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !sessionData.session) {
            console.error("Sessão não encontrada ou expirada.");
            setAuthenticated(false);
            setUser(null);
            setUserId(null);
            return { success: false, message: "Sessão não encontrada." };
        }

        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", userId)
            .single();

        if (error) {
            console.error("❌ Erro ao buscar usuário:", error);
            return { success: false, message: "Erro ao buscar usuário." };
        }

        if (!data) {
            console.log("❌ Usuário não encontrado.");
            return { success: false, message: "Usuário não encontrado." };
        }

        // Armazenar email localmente e atualizar estados
        localStorage.setItem("email", JSON.stringify(data.email));
        setAuthenticated(true);
        setUserId(userId);
        setUser(data);

        return { success: true };
    };
    
    return (
        <AuthContext.Provider value=
            {{ 
                authenticated, setAuthenticated, 
                signInUser, logoutUser,
                userId, setUserId,
                user, getuser,
                loading, setLoading,
                messege, setMessege,
                selectForm, setSelectForm,
                registerUser,
                updateUserPassword
            }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para acessar o contexto de autenticação
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext deve ser usado dentro de um AuthProvider");
    }
    return context;
};
