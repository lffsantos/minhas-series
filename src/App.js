import React from 'react';
import Header from './Header.js'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Generos from './Generos';
import Home from './Home';
import NovoGenero from './NovoGenero';
import EditarGenero from './EditarGenero.js';
import Series from './Series.js';
import NovaSerie from './NovaSerie.js';
import InfoSerie from './InfoSerie.js';

function App() {
  
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path='/' exact component={Home}></Route>
          <Route path='/generos' exact component={Generos}></Route>
          <Route path='/generos/novo' exact component={NovoGenero}></Route>
          <Route path='/generos/:id' exact component={EditarGenero}></Route>
          <Route path='/series' exact component={Series}></Route>
          <Route path='/series/novo' exact component={NovaSerie}></Route>
          <Route path='/series/:id' exact component={InfoSerie}></Route>
        </Switch>
      </div>
    </Router>
    
  )
}

export default App;