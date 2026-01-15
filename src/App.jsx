import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import HeroInicio from './pages/HeroInicio'
import Recetas from './pages/Recetas/Recetas'
import Contact from './pages/incio/Contact'
import Licor from './pages/Recetas/Licor'
import Detalle from './pages/Detalle'
import Busquedas from './pages/Busquedas'
import Error404 from './pages/incio/Error404'

import WOW from 'wow.js';
import { useEffect } from 'react'
import CarritoProvider from './context/CarritoProvider'

const App = () => {
  // inicializar WOW.js para las animaciones
  useEffect(() => {
    const wow = new WOW({
      live: true // detecta elementos dinámicos
    });
    wow.init();
  }, []);

  return (
    <CarritoProvider>
      <BrowserRouter>
        <div className='app'>
          <Header />
          <Routes>
            <Route path='/' element={<Inicio />} />
            <Route path='/inicio' element={<Inicio />} />
            <Route path='/heroinicio' element={<HeroInicio />} />
            <Route path='/recetas' element={<Recetas />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/coctelesreactetapa1y2/licor/:id/:tipo' element={<Licor />} />
            <Route path='coctelesreactetapa1y2/detalle/:id' element={<Detalle />} />
            <Route path='/busquedas' element={<Busquedas />} />
            <Route path='/error404' element={<Error404 />} />

            <Route path='*' element={<Inicio />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </CarritoProvider>
  )
}

export default App