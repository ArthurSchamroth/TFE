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
    const [isInvalidLogin, setIsInvalidLogin] = useState(false);
    const [isInputNull, setIsInputNull] = useState(false);
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
        //.then(resp => setToken(, resp.token))
        .catch(error => console.log(error))
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
                if(username == "" || password == ""){
                    setIsInputNull(true);
                    setIsInvalidLogin(false);
                }
                if(response['non_field_errors']){
                    setIsInvalidLogin(true);
                    setIsInputNull(false);
                }
                for(let i of listeToken){
                    if(response.token === (i['key'])){
                        setToken('mr-token', response.token)
                        window.location.href = '/'
                    }
                }
            })
    }



    return(
        <div className='App'>
            <div className="login-container" onLoad={onLoading}>
                <h1>Connexion</h1>
                    <label htmlFor="username">Pseudo</label><br/>
                    <input id='username' type="text" placeholder="Votre pseudo a été créé lors de votre inscription. Il s'agit de votre PrénomNom." value={username}
                    onChange={evt => setUsername(evt.target.value)}/><br/>
                    <label htmlFor="password">Mot de Passe</label><br/>
                    <input id="password" type="password" placeholder='MotDePasse123'value={password}
                    onChange={evt=>setPassword(evt.target.value)}/><br/>
                    {isInputNull ? 
                        <><p className='login_failed'> Veuillez remplir tous les champs.</p></> : null
                    }
                    {isInvalidLogin ? 
                        <><p className='login_failed'> Identifiant/Mot de passe incorrect.</p></> : null
                    }
                    <button className='btn_co_re' onClick={loginClicked}>Connexion</button>
                <p className="redirection_log-reg" onClick={()=>window.location.href = '/inscription'}>Pas de compte ? <u>Créez en un</u></p>
            </div>
        </div>
    )
}

export default Auth;