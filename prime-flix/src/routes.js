import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home';
import Filmes from './pages/Filmes';

function RoutesApp(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home/> }/>
        <Route path="/filmes/:id" element={ <Filmes/> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesApp;