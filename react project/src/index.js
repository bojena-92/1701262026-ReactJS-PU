import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { seedInitData } from './seedInitData';

if (!localStorage.getItem('initDataSeeded')) {
  seedInitData();
  localStorage.setItem('initDataSeeded', 'true');
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
