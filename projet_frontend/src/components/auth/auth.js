import React, {useState, useEffect} from 'react';
import {API} from '../../api-service';
import {useCookies} from 'react-cookie';
import './auth.css'

function Auth(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [repeated_password, setRepeated_password] = useState("");
    const [token, setToken] = useCookies([('mr-token')]);
    const [isLoginView, setIsLoginView] = useState(true);
    const [listeToken, setListeToken] = useState([])

    useEffect( async () => {
        const tokens = await API.listingTokens()
        setListeToken(tokens)
    }, []);

    const onLoading = async () =>{
        const tokens = await API.listingTokens()
        setListeToken(tokens)
        console.log(listeToken)
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
        if(username == ""){
            if(document.getElementById("error")){
                document.getElementById("error").innerHTML = "Veuillez entrer un nom d'utilisateur correct !"
            }
            else{
                let message = document.createElement("span")
                message.className = "alert"
                message.id = "error"
                message.textContent = "Veuillez entrer un nom d'utilisateur correct !"
                let parent = document.getElementById("username").parentNode
                parent.append(message)
            }
        }else{
            // Password 2* OK
            if(password === repeated_password){
                // password et username identiques pas OK
                if(username === password){
                    if(document.getElementById("error")){
                        document.getElementById("error").innerHTML = "Veuillez choisir un mot de passe plus original que ça !"
                    }
                    else{
                        let message = document.createElement("span")
                        message.className = "alert"
                        message.id = "error"
                        message.textContent = "Veuillez choisir un mot de passe plus original que ça !" 
                        let parent = document.getElementById("username").parentNode
                        parent.append(message)
                    }
                    
                }
                else{
                    // password trop court
                    if(!password.match(passw)){
                        if(document.getElementById("error")){
                            document.getElementById("error").innerHTML = "Veuillez choisir un mot de passe entre 7 et 14 caractères avec uniquement des lettres, des chiffres ou underscore. \n La première lettre doit être une majuscule\n"
                        }
                        else{
                            let message = document.createElement("span")
                            message.className = "alert"
                            message.id = "error"
                            message.textContent = `Veuillez choisir un mot de passe entre 7 et 14 caractères avec uniquement des lettres, des chiffres ou underscore. \n La première lettre doit être une majuscule\n`
                            let parent = document.getElementById("username").parentNode
                            parent.append(message)
                        }
                        
                    }
                    else{
                        API.registerUser({username, password, first_name, last_name, email})
                            alert("Utilisateur créé !")
                            setIsLoginView(true)
                    }
                }
            }
        }
    }

    return(
        <div className='App'>
            <div className="login-container" onLoad={onLoading}>
                {isLoginView ? <h1>Connexion</h1> : <h1>Inscription</h1>}
                
                    <label htmlFor="username">Username</label><br/>
                    <input id='username' type="text" placeholder='username' value={username}
                    onChange={evt => setUsername(evt.target.value)}/><br/>
                    <label htmlFor="password">Password</label><br/>
                    <input id="password" type="password" placeholder='password'value={password}
                    onChange={evt=>setPassword(evt.target.value)}/><br/>
                    {isLoginView ? 
                    null : 
                    <>  
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