import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCxZLqVomIZfgymR2by6U2oRWbI2CIY-TM",
    authDomain: "dear-digital-diary-b55db.firebaseapp.com",
    projectId: "dear-digital-diary-b55db",
    storageBucket: "dear-digital-diary-b55db.appspot.com",
    messagingSenderId: "846475596880",
    appId: "1:846475596880:web:8c9f07d2489e059f532d55"
};

firebase.initializeApp(firebaseConfig);

export default firebase;