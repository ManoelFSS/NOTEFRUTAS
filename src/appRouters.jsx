import {Routes, Route} from "react-router-dom"
// pages
import Dashboard from "./pages/painel/dashboard"
import Client from "./pages/painel/client"
import Suppliers from "./pages/painel/suppliers"
import Product from "./pages/painel/product"
import Sales from "./pages/painel/sales"
import Buys  from "./pages/painel/buys"
import VendasDetails from "./components/vendasDetails"
// import Finances from "./pages/painel/finances"
// import Reportes from "./pages/painel/reportes"
import Company from "./pages/painel/company"
// import Adm from "./pages/painel/adm"

const AppRouters = ({$toogleMenu, $setToogleMenu}) => {
    return (
        <Routes>
            <Route exact path="/" element={<Dashboard $toogleMenu={$toogleMenu} $setToogleMenu={$setToogleMenu} />}/>
            <Route exact path="/dashboard" element={<Dashboard $toogleMenu={$toogleMenu} $setToogleMenu={$setToogleMenu} />}/>
            <Route  path="/clients" element={<Client $toogleMenu={$toogleMenu} $setToogleMenu={$setToogleMenu} />}/>
            <Route  path="/products" element={<Product $toogleMenu={$toogleMenu} $setToogleMenu={$setToogleMenu} />}/>
            <Route  path="/suppliers" element={<Suppliers $toogleMenu={$toogleMenu} $setToogleMenu={$setToogleMenu} />}/>
            <Route  path="/sales" element={<Sales $toogleMenu={$toogleMenu} $setToogleMenu={$setToogleMenu} />}/>
            <Route  path="/buys" element={<Buys $toogleMenu={$toogleMenu} $setToogleMenu={$setToogleMenu} />}/>
            {/* <Route path="/sales/details" element={<VendasDetails $toogleMenu={$toogleMenu} $setToogleMenu={$setToogleMenu} />} /> */}
            <Route  path="/company" element={<Company $toogleMenu={$toogleMenu} $setToogleMenu={$setToogleMenu} />}/>

        </Routes>
    )
}

export default AppRouters
