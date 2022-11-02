import React from 'react';
import {BrowserRouter} from "react-router-dom";
import useStateContext from './hooks/useStateContext.js';
import {TopHeader,BottomFooter} from './components/Layout.js';
import WebRoutes from './components/WebRoutes.js';


function App() {
    const {context,setContext} = useStateContext();
    console.log(context);

    return (
        <BrowserRouter>
            <TopHeader />
            <main>
                <WebRoutes />
            </main>
            <BottomFooter />
        </BrowserRouter>
    )
}

export default App;