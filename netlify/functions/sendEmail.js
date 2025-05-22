import nodemailer from "nodemailer";

export const handler = async (event) => {
    try {
        // Log do corpo da requisição
        console.log("Corpo da requisição:", event.body);

        // Verifica se o corpo está vazio
        if (!event.body) {
            throw new Error("Corpo da requisição está vazio!");
        }

        // Parse do corpo para obter os dados do e-mail
        const { from, to, subject, html } = JSON.parse(event.body);

        // Verifica se todos os campos necessários estão presentes
        if (!from || !to || !subject || !html) {
            throw new Error("Faltando parâmetros essenciais!");
        }

        const emailUser = process.env.VITE_EMAIL_USER;
        const emailPass = process.env.VITE_EMAIL_PASS;

        if (!emailUser || !emailPass) {
            throw new Error("As variáveis de ambiente não estão configuradas corretamente...");
        }

        // Configuração do transporte para o envio do e-mail
        let transporter = nodemailer.createTransport({
            service: "gmail", // Ou outro serviço de e-mail
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        });

        // Opções do e-mail
        let mailOptions = {
            from: emailUser,
            to,
            subject,
            html,
        };

        // Envio do e-mail
        let info = await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "E-mail enviado com sucesso!", info }),
        };
    } catch (error) {
        // Log de erro
        console.error("Erro ao enviar e-mail:", error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Erro ao enviar e-mail", error: error.message }),
        };
    }
}
