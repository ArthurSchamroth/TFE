export class API {
    static loginUser(body) {
        return fetch(`http://192.168.1.21:8000/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }
}