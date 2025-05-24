import { Container } from "./styles"
// context
import { useAuthContext } from "../../../context/AuthContext"
import { useClientes } from "../../../context/ClientesContext"
import { useProduct } from "../../../context/ProductContext"
import { useFornecedores } from "../../../context/FornecedoresContext"

const FormLayout = ({ children, $height, state, $color }) => {

    const { cadastrarProduct, editarProduto, caunterProduct, idProduct, category } = useProduct()
    const { cadastrarCliente, caunterClientes, caunterVendas, idClient, estado, editarCliente, valorRestante, dataDeRecebimento, valorTotalDaVenda, formaDEPagamento, status_pagamento, valorRecebido, name, phone, cpf, city, cadastrarVenda  } = useClientes()
    const { cadastrarFornecedor, idFornecedor, editarFornecedor, estadoFornecedor, caunterFornecedores} = useFornecedores()
    const { signInUser, registerUser, updateUserPassword, selectForm, userId } = useAuthContext()

    const handleSubmit = async (event) => {
        event.preventDefault();

        const getEmail = localStorage.getItem("email");

        const userAdm = {
            name: event.target.name?.value || "",
            phone: event.target.phone?.value || "",
            email: event.target.email?.value || "",
            password: event.target.senha?.value || "",
            acceptTerms: event.target.termo?.checked || true,
            isAdmin: true,
            createdAt: new Date(),
            lastPaymentDate: new Date(),
            status: "active"
        };

        const userAdmRecovery = {
            email: getEmail || "",
            password: event.target.senha?.value || "", 
        };

        const userClient = {
            name: event.target.name?.value || "",
            cpf: event.target.cpf?.value || undefined ,
            phone: event.target.phone?.value || "",
            city: event.target.city?.value || "",
            state: estado  || "",
            createdat: new Date(),
            status: "Em Dias",
            adminid: userId,
            caunterclient: caunterClientes + 1,
            divided:false,
        };

        const editClient = {
            name: event.target.name?.value || "",
            cpf: event.target.cpf?.value || undefined ,
            phone: event.target.phone?.value || "",
            city: event.target.city?.value || "",
            state: estado  || "",
        };

        const editFornecedor = {
            name: event.target.name?.value || "",
            cpf: event.target.cpf?.value || undefined ,
            phone: event.target.phone?.value || "",
            city: event.target.city?.value || "",
            state: estadoFornecedor || "",
        };


        const userFornecedor = {
            name: event.target.name?.value || "",
            cpf: event.target.cpf?.value || undefined ,
            phone: event.target.phone?.value || "",
            city: event.target.city?.value || "",
            state: estadoFornecedor  || "",
            createdat: new Date(),
            status: "Nada a Pagar",
            adminid: userId,
            caunterfornecedor: caunterFornecedores + 1,
            divided:false,
        };

        const Product = {
            url_image: event.target.img?.value || "",
            name: event.target.name?.value || "",
            description: event.target.description?.value || "",
            category: category || "",
            stock: event.target.stock?.value || 0,
            createdat: new Date(),
            status: "Indesponivel",
            adminid: userId,
            caunterproduct: caunterProduct + 1,
        };

        const editProduct = {
            url_image: event.target.img?.value || "",
            name: event.target.name?.value || "",
            description: event.target.description?.value || "",
            category: category || "",
        };

        const venda = {
            name: name || "",
            phone: phone || "",
            createdat: new Date(),
            datereception: dataDeRecebimento || "",
            typepagament: formaDEPagamento || "",
            status: status_pagamento || "",
            cauntervendas: caunterVendas + 1,
            adminid: userId,
            clientid: idClient,
            valordaentrada: valorRecebido || 0,
            valortotaldavenda: valorTotalDaVenda || 0,
            valorrestante: formaDEPagamento === "A vista" ? 0 : valorRestante ,
        };

        
        
        switch (selectForm) {
            case "login":
                await signInUser(userAdm.email, userAdm.password);
                break;
            case "register":
                await registerUser(userAdm);
                break;
            case "password":
                await updateUserPassword(userAdmRecovery);
                break;
            case "cadastrar cliente":
                if(estado === "Escolha o estado") return alert("Escolha um estado");
                await cadastrarCliente(userClient);
                break;  
            case "editar cliente":
                await editarCliente(editClient, idClient);
                break;   
            case "cadastrar fornecedor":
                if(  estadoFornecedor  === "Escolha o estado") return alert("Escolha um estado");
                await cadastrarFornecedor(userFornecedor);
                break;  
            case "editar fornecedor":
                await editarFornecedor(editFornecedor, idFornecedor);
                break;
            case "cadastrar produto":
                if(category === "Escolha uma categoria") return alert("Escolha uma categoria");
                await cadastrarProduct(Product);
                break; 
            case "editar produto":
                await editarProduto(editProduct, idProduct);
                break; 
            case "cadastrar venda":
                console.log(venda);
                await cadastrarVenda(venda);
                // await cadastrarProduct(Product);
                break; 
            default:
                break;
        }
    }

    return (
        <Container style={{backgroundColor: $color }}> 
            <form onSubmit={handleSubmit}>
                {children}
            </form>
        </Container>
    )
}

export default FormLayout
