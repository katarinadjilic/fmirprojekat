import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import TopMenu from './components/TopMenu';
import StamparijaStrana from './components/StamparijaStrana';
import ProfakturaStrana from './components/ProfakturaStrana';
import PocetnaStrana from './components/PocetnaStrana';
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <TopMenu />
      
      <Switch>
        <Route path='/stamparija'>
          <StamparijaStrana />
        </Route>
        <Route path='/profaktura'>
          <ProfakturaStrana />
        </Route>
        <Route path='/'>
          <PocetnaStrana />
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
