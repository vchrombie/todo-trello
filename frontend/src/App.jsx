import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from "./components/Home";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

const App = () => {
  return (
    <div data-testid={'app'}>
      <nav style={{backgroundColor:'#0079bf', padding: '4px', paddingLeft: '8px'}}>
        <div className="navbar-nav mr-auto">
          <li className="nav-item" style={{width: 'fit-content'}}>
            <Link to={'/'} className="nav-link">
                    <FontAwesomeIcon icon={faBars} color={'white'} style={{cursor: 'pointer'}} />
            </Link>
          </li>
        </div>
      </nav>
      <div style={{height: '100%'}}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;