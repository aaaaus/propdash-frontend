import React from 'react';

import './App.css';

import Nav from './Nav';
import PropertyContainer from './PropertyContainer'
import UnitDetail from './UnitDetail'
import FilterContainer from './FilterContainer'
import UnitContainer from './UnitContainer'

const App = () => {

  return (
    <div className="App">

      <Nav />
      <div id="nav-offset" />
      <div id="dashContainer">

        <div id="sidebar">
          <PropertyContainer />
          <UnitDetail />
        </div>

        <div id="contentContainer">
          <FilterContainer />
          <UnitContainer />
        </div>

      </div>

    </div>
  )
};

export default App;
