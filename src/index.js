//React and other outside dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; //Chrome extension, helps with viewing state
import thunk from 'redux-thunk'; //required for async actions
import { BrowserRouter as Router } from 'react-router-dom' //watches changes in URL and supplies changes as props

//my components and code
import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

console.log(`%c INITIAL REDUX STORE`, 'color: orange', store.getState()); //check on initial state

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  , document.querySelector('#root')
);
