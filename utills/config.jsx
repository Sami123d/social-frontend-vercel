import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getStorage,ref, uploadBytesResumable, getDownloadURL , uploadBytes, } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBqyFC1JEmCmeBGP5GaqkMR_1-uzAe9r9w",
  authDomain: "social-media-app-59ac0.firebaseapp.com",
  projectId: "social-media-app-59ac0",
  storageBucket: "social-media-app-59ac0.appspot.com",
  messagingSenderId: "556968534808",
  appId: "1:556968534808:web:2c01b707b974497e05746d"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export {app, auth, storage, ref, uploadBytesResumable,uploadBytes, getDownloadURL}