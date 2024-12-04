import React from "react";
import TextEditor from "./components/TextEditor/TextEditor"; 
import "./App.css"; 

const App = () => {
  return (
    <div className="app">
      <h1 className="app-title">Текстовый редактор</h1>
      <TextEditor />
    </div>
  );
};

export default App;