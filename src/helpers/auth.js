import { firebaseAuth, googleProvider, githubProvider } from '../config/constants';

export function loginWithGoogle() {
  return firebaseAuth().signInWithRedirect(googleProvider);
}

export function loginWithGithub() {
  return firebaseAuth().signInWithRedirect(githubProvider);
}

export function logout() {
  return firebaseAuth().signOut();
}
