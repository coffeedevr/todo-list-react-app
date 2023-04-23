import React from "react"
import GithubLogo from '../assets/githublogo.png'

function Footer () {
    const footerText = '© ' + new Date().getFullYear() + ' coffeedevr | '

    return <div className="footer-component">
        <p id="footer-text">{footerText}</p><a href="https://github.com/coffeedevr/memory-game"><img id="github-logo" src={GithubLogo} alt="github logo"/></a>
    </div>
}

export default Footer