const TOKEN = process.env.REACT_APP_API_token;

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

    static updatingAvis(body){
        return fetch('http://127.0.0.1:8000/api/commentaires/update_commentaire/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `TOKEN ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static deletingAvis(body){
        return fetch('http://127.0.0.1:8000/api/commentaires/del_commentaire/', {
            method: 'DELETE',
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

    static deletingFiche(body){
        return fetch('http://127.0.0.1:8000/api/users/del_user/',{
            method:'DELETE',
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

    static async gettingRdvsFromSpecificUser(body){
        const data = await fetch('http://127.0.0.1:8000/api/rendezVous/getListSpecificRdv/',{
            method:'POST',
            headers: {
                'Content-Type':'application/json', 
                'authorization' : `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
        return data;
    }

    static async delRdv(body){
        return fetch('http://127.0.0.1:8000/api/rendezVous/del_rdv/',{
            method:'DELETE',
            headers: {
                'Content-Type':'application/json',
                'authorization' : `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static async getAuthors(){
        return fetch('http://127.0.0.1:8000/api/message/getAllAuthors/',{
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'authorization' : `Token ${TOKEN}`
            }
        })
    }

    static async getMsgFromAAuthor(body){
        return fetch('http://127.0.0.1:8000/api/message/getMessagesMadeByAUser/',{
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'authorization' : `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static async gettingRdvs(){
        return fetch('http://127.0.0.1:8000/api/rendezVous',{
            method:'GET',
            headers: {
                'Content-Type':'application/json',
                'authorization' : `Token ${TOKEN}`
            }
        })
    }

    static async gettingRdvsWithName(){
        return fetch('http://127.0.0.1:8000/api/rendezVous/getAllRdvsWithName/',{
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'authorization' : `Token ${TOKEN}`
            }
        })
    }

    static async addingRdv(body){
        return fetch('http://127.0.0.1:8000/api/rendezVous/',{
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'authorization' : `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static async gettingRdvsFromSpecificDate(body){
        return fetch('http://127.0.0.1:8000/api/rendezVous/getRdvByDate/', {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static async gettingRdvsFromAUser(body){
        return fetch('http://127.0.0.1:8000/api/rendezVous/getRdvSpecificPatient/', {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static async sendingMessage(body){
        return fetch('http://127.0.0.1:8000/api/message/',{
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static async deletingMessage(body){
        return fetch('http://127.0.0.1:8000/api/message/del_msg/',{
            method:'DELETE',
            headers: {
                'Content-Type':'application/json',
                'authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static async gettingMessageSpecific(body){
        return fetch('http://127.0.0.1:8000/api/message/getMessagesFromSpecificUser/',{
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static async envoyerVideo(body){
        return fetch('http://127.0.0.1:8000/api/video/', {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static async listerVideos(){
        return fetch('http://127.0.0.1:8000/api/video', {
            method:'GET',
            headers: {
                'Content-Type':'application/json',
                'authorization': `Token ${TOKEN}`
            }
        })
    }

    static getRoutines(){
        return fetch('http://127.0.0.1:8000/api/routine', {
            method:'GET',
            headers: {
                'Content-Type':'application/json',
                'authorization': `Token ${TOKEN}`
            }
        })
    }

    static envoyerRoutine(body){
        return fetch('http://127.0.0.1:8000/api/routine/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static supprimerRoutine(body){
        return fetch('http://127.0.0.1:8000/api/routine/del_routine/', {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static getRoutineSpecificUser(body){
        return fetch('http://127.0.0.1:8000/api/routine/getRoutineSpecificUser/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static getInfosSpecificRoutine(body){
        return fetch('http://127.0.0.1:8000/api/routine/getInfosSpecificRoutine/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static getInfosAllVideos(){
        return fetch('http://127.0.0.1:8000/api/video/allInfosVideos/', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'authorization': `Token ${TOKEN}`
            }
        })
    }

    static getRoutines(){
        return fetch('http://127.0.0.1:8000/api/routine', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'authorization': `Token ${TOKEN}`
            }
        })
    }
}