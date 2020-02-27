import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAcX9YdN0bDJrSJkIhSJSa8CoHGD-h8pbc",
  authDomain: "cablegram-ca56a.firebaseapp.com",
  databaseURL: "https://cablegram-ca56a.firebaseio.com",
  projectId: "cablegram-ca56a",
  storageBucket: "cablegram-ca56a.appspot.com",
  messagingSenderId: "967061069293",
  appId: "1:967061069293:web:df15770ec131811c885be4"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
