import React, {useState, useEffect} from 'react';
import {API} from '../../api-service';
import {useCookies} from 'react-cookie';
import './auth.css'

function Auth(){

    const [password, setPassword] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [token, setToken] = useCookies([('mr-token')]);
    const [listeToken, setListeToken] = useState([]);
    const [username, setUsername] = useState("");
    const [username_login, setUsername_login] = useState("");
    const test = []

    useEffect( async () => {
        const tokens = await API.listingTokens()
        setListeToken(tokens)
        API.listingUser()
        .then(function(resp){
            return resp.json()
        }).then(function (resp){
            const liste = resp
            for(const i of liste){
                test.push(i["username"])
            }
        })
        
    }, []);

    useEffect(()=>{
        const pseudo = first_name + last_name;
        setUsername(pseudo);
    }, [first_name, last_name])

    const onLoading = async () =>{
        const tokens = await API.listingTokens()
        setListeToken(tokens)
        return listeToken
    }

    const loginClicked = async () => {
        API.loginUser({username, password})
            .then(response => {
                for(let i of listeToken){
                    if(response.token === (i['key'])){
                        setToken('mr-token', response.token)
                        window.location.href = '/'
                    }
                }
            })
            //.then(resp => setToken(, resp.token))
            .catch(error => console.log(error))
    }



    return(
        <div className='App'>
            <div className="login-container" onLoad={onLoading}>
                <h1>Connexion</h1>
                    <label htmlFor="username">Pseudo</label><br/>
                    <input id='username' type="text" placeholder="Votre pseudo a été créé lors de votre. Il s'agit de votre PrénomNom." value={username}
                    onChange={evt => setUsername(evt.target.value)}/><br/>
                    <label htmlFor="password">Mot de Passe</label><br/>
                    <input id="password" type="password" placeholder='MotDePasse123'value={password}
                    onChange={evt=>setPassword(evt.target.value)}/><br/>
                    <button className='btn_co_re' onClick={loginClicked}>Connexion</button>

                <p className="redirection_log-reg" onClick={()=>window.location.href = '/inscription'}>You don't have an account ? <u>Click here!</u></p>
            </div>
        </div>
    )
}

export default Auth;