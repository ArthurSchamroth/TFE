const TOKEN = process.env.REACT_APP_API_token;

export class API{
    static loginUser(body){
        return fetch('https://tfe-osteoclic.herokuapp.com/auth/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(resp=>resp.json())
    }

    static registerUser(body){
        return fetch('https://tfe-osteoclic.herokuapp.com/api/users/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(resp=>resp.json())
    }

    static async listingTokens(){
        const data = await fetch('https://tfe-osteoclic.herokuapp.com/api/tokens/',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return(data.json())
    }

    static sendingAvis(body){
        return fetch('https://tfe-osteoclic.herokuapp.com/api/commentaires/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `TOKEN ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static updatingAvis(body){
        return fetch('https://tfe-osteoclic.herokuapp.com/api/commentaires/update_commentaire/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `TOKEN ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static deletingAvis(body){
        return fetch('https://tfe-osteoclic.herokuapp.com/api/commentaires/del_commentaire/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `TOKEN ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static listingUser(body){
        return fetch('https://tfe-osteoclic.herokuapp.com/api/users/',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `TOKEN ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static gettingDataFromToken(body){
        return fetch('https://tfe-osteoclic.herokuapp.com/api/tokens/getSpecificToken/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `TOKEN ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static async gettingEveryFiche(){
        const data = await fetch("https://tfe-osteoclic.herokuapp.com/api/fichePatient/",{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization' : `Token ${TOKEN}`
            }
        })
        return data;
    }

    static creatingFiche(body){
        return fetch('https://tfe-osteoclic.herokuapp.com/api/fichePatient/',{
            method:'POST',
            headers: {
                'Content-Type':'application/json', 
                'authorization' : `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static updatingFiche(body){
        return fetch('https://tfe-osteoclic.herokuapp.com/api/fichePatient/update_fiche/',{
            method:'POST',
            headers: {
                'Content-Type':'application/json', 
                'authorization' : `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static deletingFiche(body){
        return fetch('https://tfe-osteoclic.herokuapp.com/api/users/del_user/',{
            method:'DELETE',
            headers: {
                'Content-Type':'application/json', 
                'authorization' : `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static gettingDataFromFiche(body){
        return fetch('https://tfe-osteoclic.herokuapp.com/api/fichePatient/getSpecificFiche/',{
            method:'POST',
            headers: {
                'Content-Type':'application/json', 
                'authorization' : `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static async gettingRdvsFromSpecificUser(body){
        const data = await fetch('https://tfe-osteoclic.herokuapp.com/api/rendezVous/getListSpecificRdv/',{
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
        return fetch('https://tfe-osteoclic.herokuapp.com/api/rendezVous/del_rdv/',{
            method:'DELETE',
            headers: {
                'Content-Type':'application/json',
                'authorization' : `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static async getAuthors(){
        return fetch('https://tfe-osteoclic.herokuapp.com/api/message/getAllAuthors/',{
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'authorization' : `Token ${TOKEN}`
            }
        })
    }

    static async getMsgFromAAuthor(body){
        return fetch('https://tfe-osteoclic.herokuapp.com/api/message/getMessagesMadeByAUser/',{
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'authorization' : `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static async gettingRdvs(){
        return fetch('https://tfe-osteoclic.herokuapp.com/api/rendezVous',{
            method:'GET',
            headers: {
                'Content-Type':'application/json',
                'authorization' : `Token ${TOKEN}`
            }
        })
    }

    static async gettingRdvsWithName(){
        return fetch('https://tfe-osteoclic.herokuapp.com/api/rendezVous/getAllRdvsWithName/',{
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'authorization' : `Token ${TOKEN}`
            }
        })
    }

    static async addingRdv(body){
        return fetch('https://tfe-osteoclic.herokuapp.com/api/rendezVous/',{
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'authorization' : `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static async gettingRdvsFromSpecificDate(body){
        return fetch('https://tfe-osteoclic.herokuapp.com/api/rendezVous/getRdvByDate/', {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static async gettingRdvsFromAUser(body){
        return fetch('https://tfe-osteoclic.herokuapp.com/api/rendezVous/getRdvSpecificPatient/', {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static async sendingMessage(body){
        return fetch('https://tfe-osteoclic.herokuapp.com/api/message/',{
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static async deletingMessage(body){
        return fetch('https://tfe-osteoclic.herokuapp.com/api/message/del_msg/',{
            method:'DELETE',
            headers: {
                'Content-Type':'application/json',
                'authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static async gettingMessageSpecific(body){
        return fetch('https://tfe-osteoclic.herokuapp.com/api/message/getMessagesFromSpecificUser/',{
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static async envoyerVideo(body){
        return fetch('https://tfe-osteoclic.herokuapp.com/api/video/', {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                'authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static async listerVideos(){
        return fetch('https://tfe-osteoclic.herokuapp.com/api/video', {
            method:'GET',
            headers: {
                'Content-Type':'application/json',
                'authorization': `Token ${TOKEN}`
            }
        })
    }

    static getRoutines(){
        return fetch('https://tfe-osteoclic.herokuapp.com/api/routine', {
            method:'GET',
            headers: {
                'Content-Type':'application/json',
                'authorization': `Token ${TOKEN}`
            }
        })
    }

    static envoyerRoutine(body){
        return fetch('https://tfe-osteoclic.herokuapp.com/api/routine/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static supprimerRoutine(body){
        return fetch('https://tfe-osteoclic.herokuapp.com/api/routine/del_routine/', {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static getRoutineSpecificUser(body){
        return fetch('https://tfe-osteoclic.herokuapp.com/api/routine/getRoutineSpecificUser/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static getInfosSpecificRoutine(body){
        return fetch('https://tfe-osteoclic.herokuapp.com/api/routine/getInfosSpecificRoutine/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
    }

    static getInfosAllVideos(){
        return fetch('https://tfe-osteoclic.herokuapp.com/api/video/allInfosVideos/', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'authorization': `Token ${TOKEN}`
            }
        })
    }

    static getRoutines(){
        return fetch('https://tfe-osteoclic.herokuapp.com/api/routine', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'authorization': `Token ${TOKEN}`
            }
        })
    }
}