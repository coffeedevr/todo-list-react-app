import React from "react"
import '../styles/Sidebar.css'
import ClipboardImg from '../assets/clipboard.png'
import ExclamationImg from '../assets/exclamation.png'
import WarningImg from '../assets/warning.png'
import TearOffCalendar from '../assets/tear-off-calendar.png'

export default function Sidebar (props) {
    return (
        <div className="sidebar-component">
            <h2>Home</h2>
            <nav className="sidebar-nav">
                <li className="selected" id="default" onClick={selectNav}><img src={ClipboardImg} alt=""/><p>Tasks</p></li>
                <li id="today" onClick={selectNav}><img src={TearOffCalendar} alt=""/><p>Today</p></li>
                <li id="important" onClick={selectNav}><img src={WarningImg} alt=""/><p>Important</p></li>
                <li id="urgent" onClick={selectNav}><img src={ExclamationImg} alt=""/><p>Urgent</p></li>
            </nav>
        </div>
    )

    function selectNav(event) {
        const selection = () => {
            if (event.target.id) { return event.target.id  }
            if (event.target.parentElement.id) { return event.target.parentElement.id }
        }
        document.querySelectorAll('.sidebar-nav > li').forEach(
            item => item.classList.remove('selected')
        )
        document.getElementById(selection()).classList.toggle('selected')
        props.setSelection(selection())
    }
}