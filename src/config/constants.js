import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBeOfNLcUegIYKO_xaL85fIixUAL_VV6kQ',
  authDomain: 'toy-alice-clone.firebaseapp.com',
  databaseURL: 'https://toy-alice-clone.firebaseio.com/',
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();
export const firebaseAuth = firebase.auth;
