import React, { useState, createContext, useEffect } from "react";
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import AddTask from './components/AddTask'

export const UserSelection = createContext(null)

export default function App() {
  const [selection, setSelection] = useState('default')
  const [body, setBody] = useState(0)
  const [sidebarOff, setSidebarOff] = useState(0)

  useEffect(() => {
    
  }, [selection, body])

  return (
    <Body body={body} setBody={setBody} selection={selection} setSelection={setSelection} sidebarOff={sidebarOff} setSidebarOff={setSidebarOff}/>
  );
}

function Body (props) {
  return props.body === 0 ? 
      (
        <>
        <Header body={props.body} setBody={props.setBody} setSidebarOff={props.setSidebarOff}/>
          <div className="App">
            <UserSelection.Provider value={props.selection}>
              <Sidebar setSelection={props.setSelection} sidebarOff={props.sidebarOff} setSidebarOff={props.setSidebarOff}/>
              <Content />
            </UserSelection.Provider>
          </div>
        <Footer />
        </> ) : 
      (
      <>
        <Header body={props.body} setBody={props.setBody} sidebarOff={props.sidebarOff} setSidebarOff={props.setSidebarOff}/>
        <div className="App">
          <Sidebar setSelection={props.setSelection} sidebarOff={props.sidebarOff} setSidebarOff={props.setSidebarOff} />
          <AddTask setBody={props.setBody} setSidebarOff={props.setSidebarOff}/>
        </div>
        <Footer />
      </> )
}
