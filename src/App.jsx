import { useEffect, useState } from "react"
// pages
import Layout from "./pages/painel/layout"
import Login from "./pages/login"
// components
import Loadingpage from "./components/loadingpage"
// hooks
import useToogleMenu from "./hooks/useToogleMenu"
// context  
import { useAuthContext } from "./context/AuthContext"
// Routes
import AppRouters from "./appRouters"


function App() {
  const { toogleMenu, setToogleMenu } = useToogleMenu(false)
  const { authenticated } = useAuthContext()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const largura = window.innerWidth;
      if (largura <= 600) {
        setToogleMenu(false); // Fecha o menu em telas pequenas
      }
    };

    handleResize(); // Verifica ao carregar

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [setToogleMenu]);

  useEffect(() => {
      setLoading(true);

      setTimeout(() => {
        setLoading(false); 
      }, 3000);
  }, [authenticated]);

  if (loading) {
    return <Loadingpage />;
  }
  
  return (
    <>
      {authenticated ? 
        <Layout $setToogleMenu={setToogleMenu} $toogleMenu={toogleMenu}> 
          <AppRouters $setToogleMenu={setToogleMenu} $toogleMenu={toogleMenu}  />
        </Layout> : <Login />}
    </>
  )
}

export default App
