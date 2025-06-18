import { Container } from "./styles"
// context
import { useAuthContext } from "../../../context/AuthContext"
import { useClientes } from "../../../context/ClientesContext"
import { useProduct } from "../../../context/ProductContext"
import { useFornecedores } from "../../../context/FornecedoresContext"
import { useVendas } from "../../../context/VendasContext"
import { useDashboard } from "../../../context/DashboardContext"

const FormLayout = ({event, children, $height, state, $color }) => {

    const { 
        signInUser, 
        registerUser, 
        updateUserPassword,
        selectForm, 
        userId 
    } = useAuthContext()

    const {setReloadDashboard, reloadDashboard} = useDashboard()
    const { cadastrarProduct, editarProduto, caunterProduct, idProduct, category } = useProduct()

    const { 
            cadastrarCliente, 
            caunterClientes, 
            idClient, 
            estado, 
            editarCliente, 
            valorRestante, //
            dataDeRecebimento, 
            valorTotalDaVenda, //
            formaDEPagamento, //
            status_pagamento, //
            valorRecebido, //
            name, phone, cpf, city, 
            cadastrarVenda,
            tipoPagamento,//
            qtParcelas,//
            tipoCobranca,//
            itensVenda,
            setTextBtn,
            caunterVendas,
            contarVendas,
        } = useClientes()

    const { 
            cadastrarFornecedor, 
            idFornecedor, 
            editarFornecedor, 
            estadoFornecedor, 
            caunterFornecedores, 
            cadastrarCompra, 
            caunterCompras,
            valorTotalDaCompra
        } = useFornecedores()

    const handleSubmit = async (event) => {
        event.preventDefault();

        const getEmail = localStorage.getItem("email");
        const tipoVenda = event?.target["type-venda"].value;


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
            created_at: new Date(),
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
            created_at: new Date(),
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
            Type_sales: tipoVenda || "",
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
            Type_sales: tipoVenda || "",
        };

        const venda = {
            cliente_id:idClient,
            name: name || "",
            phone: phone || "",
            adminid: userId,
            contador_vendas: "",
            status: status_pagamento || "",
            created_at: new Date(),
            forma_pagamento:formaDEPagamento || "",
            tipo_pagamento: tipoPagamento || "",
            tipo_cobranca: tipoCobranca || "",
            valor_entrada: valorRecebido || 0,
            valor_total: valorTotalDaVenda || 0,
            valor_restante:  formaDEPagamento === "A vista" ? 0 : valorRestante ,
            qtd_parcelas: qtParcelas || 0,
        };

        const compra = {
            fornecedor_id: idFornecedor,
            name: name || "",
            phone: phone || "",
            adminid: userId,
            contador_compras: "",
            status: status_pagamento || "",
            created_at: new Date(),
            forma_pagamento:formaDEPagamento || "",
            tipo_pagamento: tipoPagamento || "",
            tipo_cobranca: tipoCobranca || "",
            valor_entrada: valorRecebido || 0,
            valor_total: valorTotalDaCompra || 0,
            valor_restante:  formaDEPagamento === "A vista" ? 0 : valorRestante ,
            qtd_parcelas: qtParcelas || 0,
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
                setTextBtn("OK");
                setReloadDashboard(!reloadDashboard);
                break;  
            case "editar cliente":
                await editarCliente(editClient, idClient);
                break;   
            case "cadastrar fornecedor":
                if(  estadoFornecedor  === "Escolha o estado") return alert("Escolha um estado");
                await cadastrarFornecedor(userFornecedor);
                setReloadDashboard(!reloadDashboard);
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
                await cadastrarVenda(venda);
                setReloadDashboard(!reloadDashboard);
                break; 
            case "cadastrar compra":
                await cadastrarCompra(compra);
                setReloadDashboard(!reloadDashboard);
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
