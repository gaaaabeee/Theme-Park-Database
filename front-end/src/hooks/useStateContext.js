import React, { useEffect, createContext, useContext, useState } from 'react';

export const stateContext = createContext();

const getFreshContext = () => {
    if (localStorage.getItem('context') === null) {
        localStorage.setItem('context',JSON.stringify({customer_id: 0}));
    }
    return JSON.parse(localStorage.getItem('context'));
}

function useStateContext() {
    const {context, setContext} = useContext(stateContext);
    return {context, setContext: obj => { setContext({...context,...obj})}};
}

function ContextProvider({children}) {
    const [context,setContext] = useState(getFreshContext());

    useEffect(() => {
        localStorage.setItem('context', JSON.stringify(context));
    },[context]);
    
    return (
        <stateContext.Provider value={{context, setContext}}>
            {children}
        </stateContext.Provider>
    );
}

export {ContextProvider};
export default useStateContext;