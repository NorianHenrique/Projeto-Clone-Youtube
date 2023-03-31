import {db, auth,storage} from './firebase.js';
import firebase  from 'firebase';
import {useEffect, useState} from 'react';
import logo from  './logo.png';
import './App.css';
import {AiOutlineSearch,AiOutlineUser} from 'react-icons/ai'


function Header(props) {

  const [progress,setProgress] = useState(0);

  const [file,setFile] = useState(null);

  useEffect(() => {
       
  }, [])

  function criarContar(e){
    e.preventDefault();

    let email = document.getElementById('email-cadastro').value;
    let nome = document.getElementById('nome-cadastro').value;
    let senha = document.getElementById('senha-cadastro').value;

    auth.createUserWithEmailAndPassword(email,senha)
    .then((authUser)=>{
        authUser.user.updateProfile({
           displayName:nome
        })
        alert('Conta criado com sucesso');

        let modal = document.querySelector('.modalCriar');

        modal.style.display = 'block';

    }).catch((error)=>{
        alert(error.message);
    })
      ;
  }

  function logarConta(e){
    e.preventDefault();

    let email = document.getElementById('email-login').value;
    let senha = document.getElementById('senha-login').value;

    auth.signInWithEmailAndPassword(email,senha)
    .then((auth)=>{
        props.setUser(auth.user.displayName);
        alert('Logado com sucesso');
        let modal = document.querySelector('.modalCriar');
        window.location.href = "/";
    }).catch((error)=>{
      alert(error.message);
  })
    ;

  }

  function abrirModalConta(e){
    e.preventDefault();
    

    let modal = document.querySelector('.modalCriar');

    modal.style.display = 'block';
  }

  function abrirModalPostar(e){

    e.preventDefault();
    

    let modal = document.querySelector('.modalPostar');

    modal.style.display = 'block';

  }

  function postarVideo(e){
     e.preventDefault()
     let videoTitulo = document.getElementById('titulo-upload').value;
     let progressEl = document.getElementById('progress-postar');

     const uploadTask = storage.ref(`videos/${file.name}`).put(file);

     uploadTask.on("state_changed",function(snaphost){
          const progress = Math.round(snaphost.bytesTransferred/snaphost.totalBytes) * 100;
          setProgress(progress);
     },function(error){

     }, function(){
        
       storage.ref("videos").child(file.name).getDownloadURL()
       .then(function(url){
           db.collection('videos').add({
              titulo : videoTitulo,
              video: url,
              userName: props.user,
              time: firebase.firestore.FieldValue.serverTimestamp(),
           });

           setProgress(0);
           setFile(null);

           alert('Upload realizado com sucesso!');

           document.getElementById('form-upload').reset();


       })
     })
  }

  function deslogar(e){
    e.preventDefault();
    auth.signOut().then(function(val){
        props.setUser(null);
        window.location.href = "/";
    })
  }

  function fecharModal(){

    let modal = document.querySelector('.modalCriar');

    modal.style.display = 'none';

  }

  function fecharModalLogar(){

    let modal = document.querySelector('.modalLogar');

    modal.style.display = 'none';

  }

  function fecharModalPostar(){

    let modal = document.querySelector('.modalPostar');

    modal.style.display = 'none';

  }

  return (
    <div className="App">
          <div className='header'>

            
        <div className='modalCriar'>
          
          <div className='formCriar'>
             <div onClick={()=>fecharModal()} className='close-modal'>X</div>
             <h2>Crie sua conta</h2>
               <form onSubmit={(e)=>criarContar(e)}>

               <input id='email-cadastro' type='text' placeholder='Seu email..'/>
               <input id='nome-cadastro' type='text' placeholder='Seu nome..'/>
               <input id='senha-cadastro' type='password' placeholder='Sua senha..'/>
               <input type ='submit' value='Criar conta!'/>

               </form>
          </div>

          
       </div>

       <div className='modalLogar'>
          
          <div className='formLogar'>
             <div onClick={()=>fecharModalLogar()} className='close-modal'>X</div>
             <h2>Entra em sua conta</h2>
               <form onSubmit={(e)=>logarConta(e)}>

               <input id='email-login' type='email' placeholder='Seu email..'/>  
               <input id='senha-login' type='password' placeholder='Sua senha..'/>
               <input type ='submit' value='Logar!'/>

               </form>
          </div>

          
       </div>

       <div className='modalPostar'>
         
          <div className='formPostar'>
             <div onClick={()=>fecharModalPostar()} className='close-modal'>X</div>
             <h2>Fazer upload</h2>
               <form id='form-upload' onSubmit={(e)=>postarVideo(e)}>
               <progress id='progress-postar' value={progress}></progress>
               <input id='titulo-upload' type='text' placeholder='Seu upload..'/>
               <input onChange={(e)=>setFile(e.target.files[0])} type='file' name='file'/>
               <input type ='submit' value='Postar!'/>

               </form>
          </div>
       </div>
                
                 <div className='logoHeader'>
                     <a href='/'><img src={logo}/></a>
                 </div>

                 <div className='searchHeader'>
                      <form>
                          <input type='text' placeholder='Pesquisar'/>
                          <AiOutlineSearch/>
                      </form>
                 </div>

                 {
                    (props.user)?
                    <div className='logadoInfo'>
                    <span>{props.user}</span>
                    <a onClick={(e)=>abrirModalPostar(e)} href='#'>Postar!</a>
                    <a onClick={(e)=>deslogar(e)}>Deslogar</a>

                    </div>
                    :

                 <div className='buttonHeader'>
                       <a onClick={(e)=>abrirModalConta(e)} className='conta' href=''>Criar Conta !</a>
                       <a onClick={(e)=>logarConta(e)} className='login' href=''>Fazer Login<AiOutlineUser/></a>
                      
                 </div>
                  }

          </div>
    </div>
  );
}

export default Header;
