import './App.css';
import NavBar from './components/Navbar'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" exact/>
      </Routes>
    </Router>
    </>
    
  );
}

export default App;
