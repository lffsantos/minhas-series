import React from 'react';
import Header from './Header.js'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Generos from './Generos';
import Home from './Home';
import NovoGenero from './NovoGenero';
import EditarGenero from './EditarGenero.js';

function App() {
  
  return (
    <Router>
      <div>
        <Header />
        <Route path='/' exact component={Home}></Route>
        <Route path='/generos/:id' exact component={EditarGenero}></Route>
        <Route path='/generos/novo' exact component={NovoGenero}></Route>
        <Route path='/generos' exact component={Generos}></Route>
        
      </div>
    </Router>
    
  )
}

export default App;