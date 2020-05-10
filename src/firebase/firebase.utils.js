import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA1uvCn_ciblpflvcFZq946hfxhI2VFpSI",
  authDomain: "crown-db-2f3ca.firebaseapp.com",
  databaseURL: "https://crown-db-2f3ca.firebaseio.com",
  projectId: "crown-db-2f3ca",
  storageBucket: "crown-db-2f3ca.appspot.com",
  messagingSenderId: "957672122502",
  appId: "1:957672122502:web:997e7d45e2181fa20f4907",
  measurementId: "G-4Q4XPRVGVR"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;


  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (err) {
      console.log('error creating user', err.message);
    }
  }

  return userRef;
};


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
