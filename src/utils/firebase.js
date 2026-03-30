import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAdYsNOKhob0L4JX8KPdU7ALih2zcfP92w",
  authDomain: "netflixgpt-ae3f3.firebaseapp.com",
  projectId: "netflixgpt-ae3f3",
  storageBucket: "netflixgpt-ae3f3.firebasestorage.app",
  messagingSenderId: "519604700245",
  appId: "1:519604700245:web:5bbe2578e9a878070ec0dc",
  measurementId: "G-17HT5GR03T"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();