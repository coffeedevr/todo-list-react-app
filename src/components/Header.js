import React from "react"
import HeaderLogo from '../assets/headerlogo.png'
import AddImg from '../assets/add.png'

const Header = (props) => {

    return (
        <div className="header-component">
            <div className="header-wrapper">
                <img id="header-logo" src={HeaderLogo} alt="Logo of Todo List App" />
                <h1 id="header-text">Todo://</h1>
            </div>
            <Button body={props.body} setBody={props.setBody} setSidebarOff={props.setSidebarOff}/>
        </div>
    )
}

function Button (props) {

    function disableFunc () {
        props.setBody(1)
        props.setSidebarOff(1)
    }

    if (props.body === 0) {
    return (
        <button type="button" id="add-task-btn" onClick={disableFunc}>
            <img id="add-btn-img" src={AddImg} alt="" />
        </button> )
    }
}

export default Header