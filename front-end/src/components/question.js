import React from 'react';

//only for testing

function Question() {
    const {context,setContext} = useStateContext();

    setContext({timeTaken: 1});

    return (
        <div>Question</div>
    );
}

export default Question;