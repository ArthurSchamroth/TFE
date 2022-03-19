import React, {useState, useEffect} from 'react';
import './App.css';

function App() {

  const [fichePatients, setFichePatients] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/fichePatient/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 32fd88f63f1e9f169ea9c09d9dd19d46ae7a2f4f'
      }
    })
    .then(resp => resp.json())
    // Permet de remplir le tableau fichePatients
    .then(resp => setFichePatients(resp))
    .catch(error => console.log(error))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Allez le kiné</h1>
      </header>
      <div className="layout">
        <div>
          {fichePatients.map(fichePatient => {
            return <h2>{fichePatient.prenom + " " + fichePatient.nom}</h2>
          })}
        </div>
        
        <div>Détails patients</div>
      </div>
    </div>
  );
}

export default App;
