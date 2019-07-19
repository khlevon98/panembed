import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const {
  REACT_APP_FIREBASER_API_KEY,
  REACT_APP_FIREBASER_AUTH_DOMAIN,
  REACT_APP_FIREBASER_DATABASE_URL,
  REACT_APP_FIREBASER_PROJECT_ID,
  REACT_APP_FIREBASER_STORAGE_BUCKET,
  REACT_APP_FIREBASER_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASER_APP_ID,
} = process.env;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: REACT_APP_FIREBASER_API_KEY,
  authDomain: REACT_APP_FIREBASER_AUTH_DOMAIN,
  databaseURL: REACT_APP_FIREBASER_DATABASE_URL,
  projectId: REACT_APP_FIREBASER_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASER_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASER_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASER_APP_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
