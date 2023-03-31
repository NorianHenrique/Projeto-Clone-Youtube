import {db, auth} from './firebase.js';
import firebase from 'firebase';
import {useEffect, useState} from 'react';
import './App.css';
import {AiFillHome,AiFillClockCircle} from 'react-icons/ai';
import {MdSlowMotionVideo} from 'react-icons/md';
import {BsFillCollectionPlayFill} from 'react-icons/bs';
import {CgPlayButtonR} from 'react-icons/cg';



function Sidebar() {
  return (
    <div className="App">
          <div className='main'>
                <div className='sidebarMain'>
                  <p><AiFillHome/>Home</p>
                  <p><MdSlowMotionVideo/>Shorts</p>
                  <p><BsFillCollectionPlayFill/>Inscrições</p>
                  <p><CgPlayButtonR/>Biblioteca</p>
                  <p><AiFillClockCircle/>Histórico</p>
                </div>

          </div>
          
    </div>
  );
}

export default Sidebar;