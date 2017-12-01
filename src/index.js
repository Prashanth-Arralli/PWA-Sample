import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NameForm from './components/NameForm.jsx' ;
import serviceWorkerScript from './scripts' ;
ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<NameForm />, document.getElementById('nameForm')) ;