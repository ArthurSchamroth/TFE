const TOKEN = '32fd88f63f1e9f169ea9c09d9dd19d46ae7a2f4f';

export class API{
    static loginUser(body){
        return fetch('http://127.0.0.1:8000/auth/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(resp=>resp.json())
    }

    static registerUser(body){
        return fetch('http://127.0.0.1:8000/api/users/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(resp=>resp.json())
    }

    static async listingTokens(){
        const data = await fetch('http://127.0.0.1:8000/api/tokens/',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return(data.json())
    }

    static sendingAvis(body){
        return fetch('http://127.0.0.1:8000/api/commentaires/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `TOKEN ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static listingUser(body){
        return fetch('http://127.0.0.1:8000/api/users/',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `TOKEN ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static gettingDataFromToken(body){
        return fetch('http://127.0.0.1:8000/api/tokens/getSpecificToken/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `TOKEN ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static async gettingEveryFiche(){
        const data = await fetch("http://127.0.0.1:8000/api/fichePatient/",{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization' : `Token ${TOKEN}`
            }
        })
        return data;
    }

    static creatingFiche(body){
        return fetch('http://127.0.0.1:8000/api/fichePatient/',{
            method:'POST',
            headers: {
                'Content-Type':'application/json', 
                'authorization' : `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static updatingFiche(body){
        return fetch('http://127.0.0.1:8000/api/fichePatient/update_fiche/',{
            method:'POST',
            headers: {
                'Content-Type':'application/json', 
                'authorization' : `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static gettingDataFromFiche(body){
        return fetch('http://127.0.0.1:8000/api/fichePatient/getSpecificFiche/',{
            method:'POST',
            headers: {
                'Content-Type':'application/json', 
                'authorization' : `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

}