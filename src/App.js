import React, { useState, createContext, useEffect } from "react";
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";

export const UserSelection = createContext(null)

function App() {
  const [selection, setSelection] = useState('default')

  useEffect(() => {
    
  }, [selection])

  return (
    <>
    <Header />
    <div className="App">
      <UserSelection.Provider value={selection}>
        <Sidebar setSelection={setSelection}/>
        <Content />
      </UserSelection.Provider>
    </div>
    <Footer />
    </>
  );
}

export default App;
