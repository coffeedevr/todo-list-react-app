import '../styles/Content.css'
import React, { useState, useEffect, useContext } from "react";
import { TaskModule } from "../modules/tasks_module";
import { UserSelection } from '../App'
import Storage from '../modules/local_storage_module'
import EditTask from './EditTask';

export default function Content (props) {
    const [tasks, setTasks] = useState({})
    const [getTask, setGetTask] = useState('')
    const selection = useContext(UserSelection)
    const counter = 0

    useEffect(() => {
        localStorage.getItem('counter') === null ? localStorage.setItem('counter', JSON.stringify(counter)) : setTasks(TaskModule.retrieveTasks())
    }, [])

    useEffect(() => {

    }, [tasks, selection])

    return (
        <div className="content-component">
            <div className="content-header">
                <h2 id="content-header-text">Your Tasks</h2>
            </div>
            <div className="content-container">
                <ShowContent body={props.body} setBody={props.setBody} setSidebarOff={props.setSidebarOff} select={selection} tasks={tasks} setTasks={setTasks} getTask={getTask} setGetTask={setGetTask}/>
            </div>
        </div>
    )
}

function ShowContent (props) {
    return props.body === 0 ? <LoadTasks select={props.select} tasks={props.tasks} setSidebarOff={props.setSidebarOff} setTasks={props.setTasks} setBody={props.setBody} setGetTask={props.setGetTask}/>
                            : <EditTask getTask={props.getTask} setBody={props.setBody} setSidebarOff={props.setSidebarOff}/>
}

function LoadTasks (props) {

    const arr = getTasks(props.select)
    const arrFiltered = Object.keys(arr).filter(item => item !== 'counter').sort()

    return arrFiltered.length < 1 ? <p>No current tasks.</p>:
        Object.keys(arrFiltered).map((key) => {
            let className = 'tasks-card'
            if (Storage.getTask(arrFiltered[key]).check === true) {className += ' crossed'}
            switch (Storage.getTask(arrFiltered[key]).priority) {
                case 'Urgent':
                    className += ' urgent-task'
                    return (
                        <div className={className} id={arrFiltered[key]} key={arrFiltered[key]}>
                           <TaskCard note={arrFiltered[key]} setTasks={props.setTasks} selection={props.select} setBody={props.setBody} setGetTask={props.setGetTask} setSidebarOff={props.setSidebarOff}/>
                        </div>
                    )
                case 'Important':
                    className += ' important-task'
                    return (
                        <div className={className} id={arrFiltered[key]} key={arrFiltered[key]}>
                            <TaskCard note={arrFiltered[key]} setTasks={props.setTasks} selection={props.select} setBody={props.setBody} setGetTask={props.setGetTask} setSidebarOff={props.setSidebarOff}/>
                        </div>
                    )
                default:
                    className += ' normal-task'
                    return (
                        <div className={className} id={arrFiltered[key]} key={arrFiltered[key]}>
                            <TaskCard note={arrFiltered[key]} setTasks={props.setTasks} selection={props.select} setBody={props.setBody} setGetTask={props.setGetTask} setSidebarOff={props.setSidebarOff}/>
                        </div>
                    )
            }
        })
}

function TaskCard ({note, setTasks, selection, setBody, setGetTask, setSidebarOff}) {
    function crossTask (event) {
        const elementId = event.target.parentNode.id
        const object = Storage.getTask(elementId)
    
        if (object.check === true) {
          object.check = false
          Storage.makeTask(elementId, object)
          setTasks(getTasks(selection))
        } else {
          object.check = true
          Storage.makeTask(elementId, object)
          setTasks(getTasks(selection))
        }
    }

    function deleteTask (event) {
        const elementId = event.target.parentNode.parentNode
        Storage.deleteTask(elementId.id)
        setTasks(getTasks(selection))
    }

    function editTask (event) {
        const note = event.target.id.slice(5)

        setSidebarOff(1)
        setBody(2)
        setGetTask(note)
    }

    return (
        <>
        <input id={note + "-check"} type="checkbox" onClick={crossTask} defaultChecked={TaskModule.getTask(note).check} ></input>
        <p className="tasks-title" id={note + `-title-text`} onMouseOver={showTaskDesc} onMouseOut={showTaskTitle}>{TaskModule.getTask(note).title}</p>
        <p className="tasks-prio" id={note + `-prio-text`}>{TaskModule.getTaskDue(Storage.getTask(note).dueDate)}</p>
        <p className="tasks-due" id={note + `-due-text`}>{TaskModule.getTask(note).dueDate}</p>
        <div className="notes-control-wrapper" id={note  + '-control-wrapper'}>
            <button className="edit-btn" id={"edit-" + note} onClick={editTask}></button>
            <button className="del-btn" id={"del-" + note} onClick={deleteTask}></button>
        </div>
        </>
    )
}

const getTasks = (select) => {
    let arr = {}
    switch (select) {
        case 'today':
            arr = TaskModule.retrieveTasksDueToday()
            break
        case 'important':
            arr = TaskModule.retrieveTasksImportant()
            break
        case 'urgent':
            arr = TaskModule.retrieveTasksUrgent()
            break
        default:
            arr = TaskModule.retrieveTasks()
    }
    return arr
}

function showTaskDesc(event) {
    const parentId = event.target.parentNode.id
    const task = Storage.getTask(parentId)
  
    const element = document.getElementById(event.target.id)
    const check = document.getElementById(parentId + '-check')
    const prioText = document.getElementById(parentId + '-prio-text')
    const dueText = document.getElementById(parentId + '-due-text')
    const control = document.getElementById(parentId + '-control-wrapper')
  
    task.description.length >= 1 ? element.textContent = task.description : element.textContent = 'No description available'
    prioText.classList.toggle('hide')
    dueText.classList.toggle('hide')
    control.classList.toggle('hide')
    check.classList.toggle('hide')
}

function showTaskTitle (event) {
    const parentId = event.target.parentNode.id
    const task = Storage.getTask(parentId)
  
    const element = document.getElementById(event.target.id)
    const check = document.getElementById(parentId + '-check')
    const prioText = document.getElementById(parentId + '-prio-text')
    const dueText = document.getElementById(parentId + '-due-text')
    const control = document.getElementById(parentId + '-control-wrapper')
  
    element.textContent = task.title
    prioText.classList.toggle('hide')
    dueText.classList.toggle('hide')
    control.classList.toggle('hide')
    check.classList.toggle('hide')
  }