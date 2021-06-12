import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyCFHgV4mo-tr5ENUSELp0Fp4_2Qf8bnhME",
  authDomain: "tareas-233fb.firebaseapp.com",
  projectId: "tareas-233fb",
  storageBucket: "tareas-233fb.appspot.com",
  messagingSenderId: "537436297426",
  appId: "1:537436297426:web:5ccc1b31d254ea21aff50b"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();