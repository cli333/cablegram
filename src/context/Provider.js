import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import firebase from "../firebase/firebase";

export const context = createContext();

const Provider = ({ children }) => {
  const [grams, setGrams] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [user, setUser] = useState(null);

  // load initial grams ordered by date
  useEffect(() => {
    console.log("FETCHING STARTING GRAMS");
    axios
      .get("http://localhost:5000/grams")
      .then(res => console.log(setGrams(res.data)));
  }, []);

  useEffect(() => {
    console.log("CHECKING AUTH");
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .collection("authors")
          .where("authorId", "==", user.uid)
          .get()
          .then(res => setUser(res.docs[0].data()));
      } else {
        setUser(null);
      }
      unsubscribe();
    });
  }, []);

  return (
    <context.Provider
      value={{ grams, setGrams, searchFilter, setSearchFilter, user, setUser }}
    >
      {children}
    </context.Provider>
  );
};

export default Provider;
