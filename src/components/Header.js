import React from "react"
import HeaderLogo from '../assets/headerlogo.png'

const Header = () => {
    return (
        <div className="header-component">
            <div className="header-wrapper">
                <img id="header-logo" src={HeaderLogo} alt="Logo of Todo List App" />
                <h1 id="header-text">Todo://</h1>
            </div>
        </div>
    )
}

export default Header