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
}