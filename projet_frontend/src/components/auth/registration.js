import React, {useState, useEffect} from 'react';
import {API} from '../../api-service';
import './auth.css';
import ReCAPTCHA from "react-google-recaptcha";

function Register(){

    const [password, setPassword] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [repeated_password, setRepeated_password] = useState("");
    const [listeToken, setListeToken] = useState([]);
    const [username, setUsername] = useState(first_name + last_name);
    const [listeInscrits, setListeInscrits] = useState([]);
    const [isVerified, setIsVerified] = useState(false);
    const [isInputNull, setIsInputNull] = useState(false);
    const [isUserKnowed, setIsUserKnowed] = useState(false);
    const [isPasswordOk, setIsPasswordOk] = useState(false);
    const [isCaptchaOk, setIsCaptchaOk] = useState(false);

    let liste_utilisateurs = []

    useEffect( async () => {
        const tokens = await API.listingTokens()
        setListeToken(tokens)
        API.listingUser()
        .then(function(resp){
            return resp.json()
        }).then(function (resp){
            const liste = resp
            for(const i of liste){
                liste_utilisateurs.push(i["username"])
            }
        }).then(setListeInscrits(liste_utilisateurs))

        
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

    const registerClicked = e => {
        e.preventDefault();
        if(isVerified){
            var passw=  /^[A-Za-z0-9]\w{7,25}$/;
            // User vide
            const pseudo = first_name.concat(last_name)
            setUsername(pseudo)
            if(repeated_password == "" || password == "" || first_name == "" || last_name == "" || email == ""){
                setIsInputNull(true)
            }
            if(password.match(passw) && password == repeated_password){
                if(listeInscrits.includes(pseudo)){
                    setIsUserKnowed(true)
                }else{
                    API.registerUser({username, password, first_name, last_name, email})
                    alert(`${username} cr???? !` )
                    window.location.href = '/login'
                }
            }
            else{
                setIsPasswordOk(true)
            }
            }else{
                setIsCaptchaOk(true)
            }
    }

    const verifyCallback = () => {
        setIsVerified(true);
    }

    return(
        <div className='App'>
            <div className="login-container" onLoad={onLoading}>
            <h1>Inscription</h1>
            <form>
                        <label htmlFor="first_name">Pr??nom</label><br/>
                        <input id="first_name_input" placeholder='Pr??nom' value={first_name} 
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
                        <input id="password" type="password" placeholder='Entre 7 et 25 caract??res alphanum??riques'value={password}
                        onChange={evt=>setPassword(evt.target.value)}/><br/>
                        <label htmlFor="repeat_password">R??p??ter mot de passe</label><br/>
                        <input id="repeat_password" type="password" placeholder='MotdePasse123' value={repeated_password} 
                        onChange={evt=>setRepeated_password(evt.target.value)}/>
                        <br/><br/>
                        <ReCAPTCHA 
                        sitekey='6LcdytYfAAAAACKQ-AY46FWkC-zfKBY12cEgzk-x'
                        onChange={verifyCallback}
                        />
                        {isInputNull ?
                            <p style={{color:'red', fontWeight:"bold"}}>Veuillez compl??ter tous les champs du formulaire.</p> :
                            isUserKnowed ?
                                <p style={{color:'red', fontWeight:"bold"}}>{first_name} {last_name} est d??j?? inscrit</p> :
                                isPasswordOk ?  
                                    <p style={{color:'red', fontWeight:"bold"}}>Veuillez entrer deux fois un mot de passe identique compos?? de caract??res alphanum??riques (entre 7 et 25 caract??res).</p> :
                                    isCaptchaOk ?
                                        <p style={{color:'red', fontWeight:"bold"}}>Veuillez compl??ter le captcha.</p> : null
                        } 
                    <button className='btn_co_re' onClick={(e)=> registerClicked(e)}>Inscription</button>
                    </form>
                <p className="redirection_log-reg" onClick={()=>window.location.href = '/login'}>D??j?? un compte ? <u>Connectez vous ici !</u> </p>
            </div>
        </div>
    )
}

export default Register;