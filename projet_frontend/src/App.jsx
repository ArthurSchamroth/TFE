import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import Navbar from './components/navbar/navbar';

function App(){
    const [token, setToken] = useCookies([('mr-token')]);

    return(
        <>
            <Navbar/>
        </>
    )
}

export default App;