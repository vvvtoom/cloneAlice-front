import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBeOfNLcUegIYKO_xaL85fIixUAL_VV6kQ',
  authDomain: 'toy-alice-clone.firebaseapp.com',
};

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();
export const firebaseAuth = firebase.auth;
