import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBS8Dbp1LV__kFeoEJylYQaUV7Ke9E9cTI",
  authDomain: "reacttodo-595f7.firebaseapp.com",
  databaseURL: "https://reacttodo-595f7-default-rtdb.firebaseio.com",
  projectId: "reacttodo-595f7",
  storageBucket: "reacttodo-595f7.firebasestorage.app",
  messagingSenderId: "700763101877",
  appId: "1:700763101877:web:83c93737f3352fac38fcfc",
  measurementId: "G-1K21DY3NPZ"
};


const app = initializeApp(firebaseConfig);

export default firebaseConfig