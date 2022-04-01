import React, {useState, useEffect} from 'react';
import {API} from '../../api-service';
import {useCookies} from 'react-cookie';
import './auth.css'

function Register(){

    const [password, setPassword] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [repeated_password, setRepeated_password] = useState("");
    const [token, setToken] = useCookies([('mr-token')]);
    const [isLoginView, setIsLoginView] = useState(true);
    const [listeToken, setListeToken] = useState([]);
    const [username, setUsername] = useState(first_name + last_name);
    const [listeInscrits, setListeInscrits] = useState([]);
    let test = []

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
        }).then(setListeInscrits(test))
    
        console.log(listeInscrits)
        
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

    const registerClicked = () => {
        var passw=  /^[A-Za-z]\w{7,14}$/;
        // User vide
        const pseudo = first_name.concat(last_name)
        console.log(listeInscrits)
        setUsername(pseudo)
        if(password.match(passw)){
            // je ne sais pas pourquoi ici ca fonctionne dans le sens inverse que ce a quoi je m'attendais
            console.log(test)
            if(listeInscrits.includes(pseudo)){
                console.log('pseudo déjà pris')
            }else{
                console.log('ca passe')
                API.registerUser({username, password, first_name, last_name, email})
                alert("Utilisateur créé !")
                // window.location.href = '/login'
            }
            
        }else{
            console.log("pas ok ok")
        }

        
}

    return(
        <div className='App'>
            <div className="login-container" onLoad={onLoading}>
            <h1>Inscription</h1>
                        <label htmlFor="first_name">Prénom</label><br/>
                        <input id="first_name_input" placeholder='Prénom' value={first_name} 
                        onChange={evt=>setFirst_name(evt.target.value)}/>
                        <br/>
                        <label htmlFor="last_name">Nom</label><br/>
                        <input id="last_name_input" placeholder='Nom' value={last_name} 
                        onChange={evt=>setLast_name(evt.target.value)}/>
                        <br/>
                        <label htmlFor="first_name">Adresse Mail</label><br/>
                        <input id="email_input" placeholder='Email' value={email} 
                        onChange={evt=>setEmail(evt.target.value)}/>
                        <br/>
                        <label htmlFor="password">Mot de passe</label><br/>
                        <input id="password" type="password" placeholder='MotdePasse123'value={password}
                        onChange={evt=>setPassword(evt.target.value)}/><br/>
                        <label htmlFor="repeat_password">Répéter mot de passe</label><br/>
                        <input id="repeat_password" type="password" placeholder='MotdePasse123' value={repeated_password} 
                        onChange={evt=>setRepeated_password(evt.target.value)}/>
                        <br/>
                    <button className='btn_co_re' onClick={registerClicked}>Register</button>
                
                <p className="redirection_log-reg" onClick={()=>window.location.href = '/login'}>Already an account ? <u>Login here!</u> </p>
            </div>
        </div>
    )
}

export default Register;