import React from "react";
import "./App.css";

import Provider from "./context/Provider";
import Header from "./components/header/Header";
import Content from "./components/content/Content";

function App() {
  return (
    <Provider>
      <Header />
      <Content />
    </Provider>
  );
}

export default App;
