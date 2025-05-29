
// SDK do Mercado Pago
import { MercadoPagoConfig, Preference,} from 'mercadopago';
// Adicione credenciais
const client = new MercadoPagoConfig({ accessToken: 'APP_USR-7241294086332546-052809-0d9e00bf08ea40d6f64c2a9dc47f9c9c-37589419' });
const preference = new Preference(client);

preference.create({
    body: {
        items: [
        {
            title: 'Meu produto',
            quantity: 1,
            unit_price: 2000
        }
        ],
    }
    })
.then(console.log)
.catch(console.log);



const Checkout = () => {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
        <h1>Botão de Pagamento</h1>
        {/* <p>Clique no botão para realizar o pagamento.</p>
        {/* Renderize o botão de pagamento */}
        {/* <div style={{ width: '300px' }}>
            <Wallet initialization={{ preferenceId: "7241294086332546" }} />
        </div> */} */
        </div>
    );
}
export default Checkout;
