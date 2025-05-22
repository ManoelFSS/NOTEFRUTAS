import { getDocs, collection } from "firebase/firestore";
import {  db } from "../services/firebase";
const checkEmailExists = async (email,  setMessege) => {
    try {
        // Verifica se o e-mail existe na coleção "users"
        const querySnapshot = await getDocs(collection(db, "users"));
        // Verifica se algum dos documentos contém o e-mail desejado
        const exists = querySnapshot.docs.some(doc => doc.data().email === email);
        return exists; // Retorna true se o e-mail existir, false caso contrário
    } catch (error) {
        console.error("Erro ao verificar o e-mail:");
        setTimeout(() => {
            setMessege({success: false, title: "Erro email não encontrado", message: "Por favor, verifique o email e tente novamente"});
        }, 2000);
        return;
    }
};


// envio de email
export const sendEmail = async (email, recoveryCode, setMessege, setLoading) => {
    setLoading(true);
    
    try {
        const exists = await checkEmailExists(email, setMessege);
        if (!exists) return { success: false, title: "Erro email não encontrado", message: "Por favor, verifique o email e tente novamente" };
        
        const htmlContent = `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f9;
                            color: #333;
                            padding: 20px;
                        }
                        h1 {
                            font-size: 0.9rem;
                            color: #1E90FF;
                        }
                        h2 {
                            color: #FF9D00;
                            padding-left:25px;
                        }
                        .content {
                            background-color:rgb(255, 255, 255);
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
                        }
                        .img {
                            display: block;
                            width: 150px;
                            heigth: 150px;
                        }
                        .code {
                            color: #FF9D00;
                            font-size: 40px;
                            font-weight: 900;
                        }
                        b {
                            color: #FF9D00;
                            font-size: 20px;
                            font-weight: 900;
                        }
                    </style>
                </head>
                <body>
                    <div class="content">
                        <img class="img" src="https://trin-flow.netlify.app/assets/logo-a64r1GgQ.png" alt="Logo do Site" />
                        <h2>Trin-Flow</h2>
                        <h1>Código de Recuperação</h1>
                        <p>Olá... Seu código de recuperação é: ⬇️</p>
                        <p class="code">${recoveryCode}</p>
                        <p>Por favor, use este código para recuperar sua conta.</p>
                        <p>Atenciosamente ➡️ Equipe <b>Trin-Flow</b> </p>
                    </div>
                </body>
            </html>
        `;
    
        // Configuração do e-mail
        const mailOptions = {
            from: import.meta.env.VITE_EMAIL_USER, // Acessando variáveis do Vite
            to: email,
            subject: "Código de Recuperação",
            html: htmlContent,
        };
    
        // Enviar o e-mail com o Nodemailer
        const response = await fetch("https://trin-flow.netlify.app/.netlify/functions/sendEmail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(mailOptions), // Passa os dados do e-mail
        });
    
        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro ao enviar o e-mail: ${response.statusText}`);
        }
        
        return { success: true };
    } catch (error) {
        setMessege({success: false, title: "Erro ao enviar o e-mail", message: " por favor, tente novamente"});
        console.error("Erro ao tentar enviar o e-mail:", error.message);
    } finally {
        setLoading(false);
    }
};

export const gerarCodigo = async () => {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let codigo = "";
    for (let i = 0; i < 8; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres[indiceAleatorio];
    }
    return codigo;
}
