import firebase from 'firebase/app';
import 'firebase/app-check';
import 'firebase/storage';


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_SENDERID,
    appId: process.env.REACT_APP_APPID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const appCheck = firebase.appCheck();
appCheck.activate(process.env.REACT_APP_SITEKEY);

const projectStorage = firebase.storage();

export { projectStorage };


