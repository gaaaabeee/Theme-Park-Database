import React, { useEffect, createContext, useContext, useState } from 'react';

export const stateContext = createContext();

const getFreshContext = () => {
    if (sessionStorage.getItem('context') === null) {
        sessionStorage.setItem('context',JSON.stringify({login_id: 0, account: ""}));
    }
    return JSON.parse(sessionStorage.getItem('context'));
}

function useStateContext() {
    const {context, setContext} = useContext(stateContext);
    return {context, setContext: obj => { setContext({...context,...obj})}};
}

function ContextProvider({children}) {
    const [context,setContext] = useState(getFreshContext());

    useEffect(() => {
        sessionStorage.setItem('context', JSON.stringify(context));
    },[context]);
    
    return (
        <stateContext.Provider value={{context, setContext}}>
            {children}
        </stateContext.Provider>
    );
}

export {ContextProvider};
export default useStateContext;