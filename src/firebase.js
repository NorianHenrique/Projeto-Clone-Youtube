import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA40iaVUnzj7WJLeWYHOyNLlFJgJqyNJRo",
  authDomain: "projeto-bb41d.firebaseapp.com",
  projectId: "projeto-bb41d",
  storageBucket: "projeto-bb41d.appspot.com",
  messagingSenderId: "690432817757",
  appId: "1:690432817757:web:3bc1d251514fc1a2b5abb4",
  measurementId: "G-10JS8MKYMZ"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const auth = firebase.auth();

const storage = firebase.storage();

const provider =  new firebase.auth.GoogleAuthProvider();



export   {db, auth, storage, provider};