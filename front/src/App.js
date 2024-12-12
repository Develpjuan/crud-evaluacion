import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Autores from './pages/autores';
import ActualizarAutor from './pages/actualizarAutores';
import CrearAutor from './pages/crearUsuario';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='/autores' element={  } />
        <Route path='/libros' element={  } /> */}
        <Route path='/autores' element={ <Autores /> }/>
        <Route path='/actualizarAutores/:id' element={ <ActualizarAutor /> } />
        <Route path='/crearUsuario' element={ <CrearAutor /> } />
        
      </Routes>
    </Router>
  );
}

export default App;
