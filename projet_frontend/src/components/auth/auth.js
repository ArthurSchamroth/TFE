import React, {useState, useEffect} from 'react';
import {API} from '../../api-service';
import {useCookies} from 'react-cookie';
import './auth.css'

function Auth(){

    const [password, setPassword] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [repeated_password, setRepeated_password] = useState("");
    const [token, setToken] = useCookies([('mr-token')]);
    const [isLoginView, setIsLoginView] = useState(true);
    const [listeToken, setListeToken] = useState([]);
    const [username, setUsername] = useState(first_name + last_name);
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
            console.log(test)
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

    const registerClicked = () => {
        var passw=  /^[A-Za-z]\w{7,14}$/;
        // User vide
        const pseudo = first_name.concat(last_name)
        setUsername(pseudo)
        if(password.match(passw)){
            // je ne sais pas pourquoi ici ca fonctionne dans le sens inverse que ce a quoi je m'attendais
            if(test.includes(username)){
                console.log('ca passe')
                API.registerUser({username, password, first_name, last_name, email})
                alert("Utilisateur créé !")
                setIsLoginView(true)
            }else{
                console.log('pseudo déjà pris')
            }
            
        }else{
            console.log("pas ok ok")
        }

        
}

    return(
        <div className='App'>
            <div className="login-container" onLoad={onLoading}>
                {isLoginView ? <h1>Connexion</h1> : <h1>Inscription</h1>}
                
                
                    {isLoginView ? 
                    <>
                        <label htmlFor="username">Username</label><br/>
                        <input id='username' type="text" placeholder='username' value={first_name}
                        onChange={evt => setUsername(evt.target.value)}/><br/>
                        <label htmlFor="password">Password</label><br/>
                        <input id="password" type="password" placeholder='password'value={password}
                        onChange={evt=>setPassword(evt.target.value)}/><br/>
                    </> : 
                    <>  
                        <label htmlFor="password">Password</label><br/>
                        <input id="password" type="password" placeholder='password'value={password}
                        onChange={evt=>setPassword(evt.target.value)}/><br/>
                        <label htmlFor="first_name">Prénom</label><br/>
                        <input id="first_name_input" placeholder='Prénom' value={first_name} 
                        onChange={evt=>setFirst_name(evt.target.value)}/>
                        <br/>
                        <label htmlFor="last_name">Nom</label><br/>
                        <input id="last_name_input" placeholder='Nom' value={last_name} 
                        onChange={evt=>setLast_name(evt.target.value)}/>
                        <br/>
                        <label htmlFor="first_name">Prénom</label><br/>
                        <input id="email_input" placeholder='Email' value={email} 
                        onChange={evt=>setEmail(evt.target.value)}/>
                        <br/>
                        <label htmlFor="repeat_password">Répéter mot de passe</label><br/>
                        <input id="repeat_password" type="password" placeholder='password' value={repeated_password} 
                        onChange={evt=>setRepeated_password(evt.target.value)}/>
                        <br/>
                    </>}
                    {isLoginView ? 
                    <button className='btn_co_re' onClick={loginClicked}>Login</button> : 
                    <button className='btn_co_re' onClick={registerClicked}>Register</button>}
                
                {isLoginView ? 
                <p className="redirection_log-reg" onClick={()=>setIsLoginView(false)}>You don't have an account ? <u>Click here!</u></p> :
                <p className="redirection_log-reg" onClick={()=>setIsLoginView(true)}>Already an account ? <u>Login here!</u> </p>}
            </div>
        </div>
    )
}

export default Auth;