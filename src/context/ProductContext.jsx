// context/ClientesContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc, query, where, getDocs, getCountFromServer, deleteDoc, limit, orderBy, doc, updateDoc  } from "firebase/firestore";
import { registerProductSchema } from "../validationSchemas/Schemas"
//supabase 
import { supabase } from '../services/supabase';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    
    const [loading, setLoading] = useState(false);
    const [messege, setMessege] = useState(null);// controle do componente messege
    const [closeModal, setCloseModal] = useState(false);
    const [product, setProduct] = useState([]);// lista de clientes
    const [caunterProduct, setCaunterProduct] = useState(0);

    const [name, setName] = useState('');// controle do campo name
    const [description, setDescription] = useState('');// controle do campo description
    const [category, setCategory] = useState('Escolha uma categoria');// controle do campo category
    const [idProduct, setIdProduct] = useState('');// controle do campo idProduct
    const[ state, setState] = useState('');// controle do campo state

    const [images, setImages] = useState([]);// controle do campo images

// counter para paginacao
    const contarDocumentos = async (colecaoNome, adminId, ativo) => {
        try {
            const filtros = [where("adminId", "==", adminId)];

            if (ativo !== undefined && ativo !== null) {
                filtros.push(where("ativo", "==", ativo));
            }

            const colRef = query(collection(db, colecaoNome), ...filtros);
            const snapshot = await getCountFromServer(colRef);

            return snapshot.data().count;
        } catch (error) {
            console.error("Erro ao contar documentos:", error);
            throw error;
        }
    };

    // Função cadastrarProduct
    const cadastrarProduct = async (productData) => {
        setLoading(true);
        

        try {
            const validatedClient = registerProductSchema.parse(productData); // Valida o objeto
            if (!validatedClient) return validatedClient.errors; // Corrigido: estava usando "validatedUser"

            if (productData.description === undefined) {
                productData.description = "Não informado";
            }

            const { data, error } = await supabase
                .from('produtos') // nome da tabela no Supabase
                .insert([productData]);

            if (error) {
                throw error;
            }

            console.log("Produto cadastrado com ID:", data?.[0]?.id);
            setCloseModal(false);
            setCategory('Escolha uma categoria');
            setDescription('');
            setName('');

        } catch (error) {
            console.error("Erro ao cadastrar produto:", error);
            setTimeout(() => {
                setMessege({
                    success: false,
                    title: "❌ Erro ao Cadastrar",
                    message: error?.message || "Erro desconhecido",
                });
            }, 2000);
            throw error;
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };


    const editarProduto = async (novosDados, id) => {
        setLoading(true);

        try {
            const { error } = await supabase
            .from('produtos')
            .update(novosDados)
            .eq('id', id);

            if (error) {
            throw error;
            }

            console.log('Produto atualizado com sucesso!');
            setCloseModal(false);
            setCategory('Escolha uma categoria');
            setDescription('');
            setName('');
        } catch (error) {
            console.error('Erro ao atualizar o produto:', error.message);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };


    const deletarProduto = async (idDoProduto) => {
        try {
            const { error } = await supabase
            .from('produtos')
            .delete()
            .eq('id', idDoProduto);

            if (error) {
            throw error;
            }

            console.log('Produto deletado com sucesso!');
        } catch (error) {
            console.error('Erro ao deletar produto:', error.message);
        }
    };


     // Função para buscar clientes de um admin com paginação
    const buscarProductPorAdmin = async (adminId, limitepage, paginacao) => {
            console.log(adminId, limitepage, paginacao);
        try {
            if (!adminId || limitepage <= 0 || paginacao < 1) {
            throw new Error("Parâmetros inválidos");
            }

            const page = paginacao;
            const pageSize = limitepage;
            const from = (page - 1) * pageSize;
            const to = from + pageSize - 1;

            const { data, error, count } = await supabase
            .from("produtos")
            .select("*", { count: "exact" }) // retorna os dados + total
            .eq("adminid", adminId)
            .order("caunterproduct", { ascending: true })
            .range(from, to);

            if (error) throw error;

            // Se estiver usando React e quiser usar o total
            setCaunterProduct(count);

            return data;
        } catch (error) {
            console.error("Erro ao buscar produtos:", error.message);
            return [];
        }
    };

    const  buscarImagens = async () => {

        try {
            const imagensRef = collection(db, 'imagems');
            const snapshot = await getDocs(imagensRef);

            const imagens = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            }));

            setImages(imagens);
        } catch (error) {
            console.error('Erro ao buscar imagens:', error);
            return [];
        }
    }

    useEffect(() => {
        buscarImagens();
    }, []);


    return (
        <ProductContext.Provider value={{ 
                cadastrarProduct, 
                buscarProductPorAdmin,
                loading, setLoading,
                messege, setMessege,
                closeModal, setCloseModal,
                product, setProduct,
                caunterProduct, setCaunterProduct,
                name, setName,
                description, setDescription,
                category, setCategory,
                idProduct, setIdProduct,
                editarProduto,
                deletarProduto,
                buscarImagens,
                images, setImages,
                state, setState
            }}>
        {children}
        </ProductContext.Provider>
    );
    };

// Hook para usar o contexto
export const useProduct = () => useContext(ProductContext);
