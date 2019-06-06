import {
  ref, firebaseAuth, googleProvider, githubProvider,
} from '../config/constants';

export function saveUser(user, ...rest) {
  const { firstName, lastName } = rest[0];
  return ref.child(`users/${user.uid}/info`)
    .set({
      displayName: `${firstName} ${lastName}`,
      firstName,
      lastName,
      email: user.email,
      uid: user.uid,
    })
    .then(() => user);
}

export function auth(email, pw, ...rest) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then(({ user }) => {
      saveUser(user, ...rest);
    });
}

export function loginWitheMail(email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw);
}

export function resetPassword(email) {
  return firebaseAuth().sendPasswordResetEmail(email);
}

export function loginWithGoogle() {
  return firebaseAuth().signInWithRedirect(googleProvider);
}

export function loginWithGithub() {
  return firebaseAuth().signInWithRedirect(githubProvider);
}

export function logout() {
  return firebaseAuth().signOut();
}
