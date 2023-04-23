import '../styles/Content.css'
import AddImg from '../assets/add.png'
import React, { useState, useEffect, useContext } from "react";
import { TaskModule } from "../modules/tasks_module";
import { UserSelection } from '../App'
import { format, isBefore, parseISO } from 'date-fns'
import Storage from '../modules/local_storage_module'

export default function Content () {
    const [tasks, setTasks] = useState({})
    const selection = useContext(UserSelection)
    const counter = 0

    useEffect(() => {
        localStorage.getItem('counter') === null ? localStorage.setItem('counter', JSON.stringify(counter)) : setTasks(TaskModule.retrieveTasks())
        TaskModule.createTask('title', 'desc', format(new Date(), 'yyyy-MM-dd'), 'Important', 'proj')
    }, [])

    useEffect(() => {

    }, [tasks, selection])

    return (
        <div className="content-component">
            <div className="content-header">
                <h2 id="content-header-text">Your Tasks</h2>
                <button type="button" id="add-task-btn">
                    <img id="add-btn-img" src={AddImg} alt="" />
                </button>
            </div>
            <div className="content-container">
                <LoadTasks select={selection} tasks={tasks} setTasks={setTasks}/>
            </div>
        </div>
    )
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
                           <TaskCard note={arrFiltered[key]} setTasks={props.setTasks} selection={props.select}/>
                        </div>
                    )
                case 'Important':
                    className += ' important-task'
                    return (
                        <div className={className} id={arrFiltered[key]} key={arrFiltered[key]}>
                            <TaskCard note={arrFiltered[key]} setTasks={props.setTasks} selection={props.select}/>
                        </div>
                    )
                default:
                    className += ' normal-task'
                    return (
                        <div className={className} id={arrFiltered[key]} key={arrFiltered[key]}>
                            <TaskCard note={arrFiltered[key]} setTasks={props.setTasks} selection={props.select}/>
                        </div>
                    )
            }
        })
}

function TaskCard ({note, setTasks, selection}) {
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

    return (
        <>
        <input id={note + "-check"} type="checkbox" onClick={crossTask} defaultChecked={TaskModule.getTask(note).check} ></input>
        <p className="tasks-title" id={note + `-title-text`}>{TaskModule.getTask(note).title}</p>
        <p className="tasks-prio" id={note + `-prio-text`}>{TaskModule.getTaskDue(Storage.getTask(note).dueDate)}</p>
        <p className="tasks-due" id={note + `-due-text`}>{TaskModule.getTask(note).dueDate}</p>
        <div className="notes-control-wrapper" id={note  + 'control-wrapper'}>
            <button className="edit-btn" id={"edit-" + note}></button>
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