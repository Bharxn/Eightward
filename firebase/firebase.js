import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCTtavUsESuPVBLoCKaKutdzaw2Mf9LlBM",
  authDomain: "eightward-81030.firebaseapp.com",
  projectId: "eightward-81030",
  storageBucket: "eightward-81030.appspot.com",
  messagingSenderId: "253186374645",
  appId: "1:253186374645:web:54089d5e30bbb402d03ebc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;