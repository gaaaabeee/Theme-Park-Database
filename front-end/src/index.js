import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import {ContextProvider} from './hooks/useStateContext.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContextProvider>
        <App />
    </ContextProvider>
);

