import {db, auth} from './firebase.js';
import {useEffect, useState} from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';

function App() {

  const [user, setUser] = useState();

  const [videos,setVideos] = useState([]);

  useEffect(()=>{

    auth.onAuthStateChanged(function(val){
        if(val!=null){
        setUser(val.displayName);
        }
    })
  
    db.collection('videos').onSnapshot(function(snapshot){
        setVideos(snapshot.docs.map(function(document){
          return {id:document.id,info:document.data()}
        }))
    })

},[])

 
  return (
    <div className="App">
          <Header setUser={setUser} user={user}></Header>

          {
        videos.map(function(val){

            return (
              
                <Home user={user} info={val.info} id={val.id} />
                
            )

        })
      }
      
    </div>
  );
}

export default App;
