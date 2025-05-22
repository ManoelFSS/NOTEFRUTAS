// fieldSchemas.js
import { z } from "zod";

export const nameSchema = z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, "O nome não pode conter números");

export const emailSchema = z.string().email("Insira um e-mail válido.");

export const phoneSchema = z
    .string()
    .min(14, "O telefone deve ter 14 caracteres.")
    .regex(/^\(\d{2}\)\d{5}-\d{4}$/, "O telefone deve estar no formato (XX)XXXXX-XXXX.");

export const cpfSchema = z
    .string()
    .min(11, "O CPF deve ter 11 dígitos")
    .max(11, "O CPF deve ter 11 dígitos")
    .regex(/^\d{11}$/, "O CPF deve conter apenas números")
    .optional();

export const passwordSchema = z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres.")
    .regex(/[A-Z]/, "A senha deve ter pelo menos uma letra maiúscula.")
    .regex(/[a-z]/, "A senha deve ter pelo menos uma letra minúscula.")
    .regex(/[0-9]/, "A senha deve ter pelo menos um número.")
    .regex(/[\W_]/, "A senha deve ter pelo menos um caractere especial (ex: !, @, #, etc.).");

export const termoSchema = z
    .boolean()
    .refine((value) => value === true, "Você precisa aceitar os termos e condições.");

export const  checkboxSchema = z
    .boolean()
    .refine((value) => value === true, "Você precisa aceitar os termos e condições.");

export const city = z
    .string()
    .min(2, "A cidade deve ter pelo menos 2 letras")
    .max(100, "Nome da cidade muito longo")
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, "A cidade não pode conter números")
    .optional();

export const state = z
    .string()
    .min(2, "O estado deve ter pelo menos 2 letras")
    .max(50, "Nome do estado muito longo")
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, "O estado não pode conter números")
    .optional();



// schema de cadastro
export const registerSchema = z.object({
    name: nameSchema,
    phone: phoneSchema,
    email: emailSchema,
    password: passwordSchema,
    acceptTerms: termoSchema,
    isAdmin:  z.boolean().optional(),
    lastPaymentDate: z.date().optional(),
    status: z.string().optional(),
});

export const registerClientSchema = z.object({
    name: nameSchema,
    phone: phoneSchema,
    cpf: cpfSchema,
    city: city,
    state: state,
    adminid: z.string().optional(),
    status: z.string().optional(),
});

export const registerProductSchema = z.object({
    url_image: z.string().optional(),
    name: nameSchema,
    stock: z.number().optional(),
    description: z.string().optional(),
    category: z.string(),
    status: z.string().optional(),
    
});


// schema de recuperação de senha
export const recoverySchema = z.object({
    password: passwordSchema,
});

