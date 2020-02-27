import React, { createContext, useState, useEffect } from "react";
import firebase from "../firebase/firebase";

export const context = createContext();

const Provider = ({ children }) => {
  const [grams, setGrams] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [authUser, setAuthUser] = useState(null);
  const [isModalShown, setIsModalShown] = useState(false);
  const [isGramModalShown, setIsGramModalShown] = useState(false);
  const [selectedGram, setSelectedGram] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    firebase
      .firestore()
      .collection("grams")
      .orderBy("createdAt", "desc")
      .get()
      .then(snapshot => {
        let docs = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setGrams(docs);
      });
  }, []);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("grams")
      .orderBy("createdAt", "desc")
      .onSnapshot(snapshot => {
        let docs = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setGrams(docs);
      });
    return () => unsubscribe();
  }, []);

  return (
    <context.Provider
      value={{
        grams,
        setGrams,
        searchFilter,
        setSearchFilter,
        authUser,
        setAuthUser,
        isModalShown,
        setIsModalShown,
        isGramModalShown,
        setIsGramModalShown,
        selectedGram,
        setSelectedGram
      }}
    >
      {children}
    </context.Provider>
  );
};

export default Provider;
