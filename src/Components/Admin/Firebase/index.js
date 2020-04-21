import firebase from 'firebase/app';
import 'firebase/storage';

  var firebaseConfig = {
    apiKey: "AIzaSyC5YQiVHuRnAOFzPzSvANzeWvo-7DRTtWw",
    authDomain: "fil-e-s-ystem.firebaseapp.com",
    databaseURL: "https://fil-e-s-ystem.firebaseio.com",
    projectId: "fil-e-s-ystem",
    storageBucket: "fil-e-s-ystem.appspot.com",
    messagingSenderId: "211442260983",
    appId: "1:211442260983:web:aa2725b23707d684ccacf2",
    measurementId: "G-ZJLS7EBCRH"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();

const storage = firebase.storage();

export {
	storage, firebase as default
}
