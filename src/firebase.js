import firebase from "firebase/app";
import "firebase/firestore";
import "@firebase/auth";

const config = {
  apiKey: "AIzaSyBMnW71R7HoHG5PXKID3gdn59KxOM4x4zE",
  authDomain: "book-7336d.firebaseapp.com",
  projectId: "book-7336d",
  storageBucket: "book-7336d.appspot.com",
  messagingSenderId: "964920033267",
  appId: "1:964920033267:web:b704c8f4325eb7e0829c86",
};

firebase.initializeApp(config);
export const db = firebase.firestore();

export default firebase;
