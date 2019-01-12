import React from 'react';

import Nav from './Nav';
import './App.css';

const App = () => {

  return (
    <div>
      <Nav />
      <div id="nav-offset" />
      <div id="dashContainer">
        <div id="sidebar">
          <div id="propSelector">
            PropSelector
          </div>
          <div id="unitDetail">
            UnitDetail
          </div>
        </div>
        <div id="contentContainer" />
          <div id="contentNav" />
          <div id="unitContainer" />
      </div>
    </div>
  )
};

export default App;
