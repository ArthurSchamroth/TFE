import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Auth from './components/auth';
import HomePage from './components/home_page';
import reportWebVitals from './reportWebVitals';
import {Route, BrowserRouter, Routes} from 'react-router-dom';

import {CookiesProvider} from 'react-cookie';

function Router(){

  return (
    <React.StrictMode>
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            <Route exact path="/login" element={<Auth/>}/>
            <Route exact path="/patients" element={<App/>}/>
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </React.StrictMode>
  )
}

ReactDOM.render(<Router/>, document.getElementById('root')
);

reportWebVitals();
