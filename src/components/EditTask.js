import '../styles/Form.css'
import React from "react";
import { format, isBefore, parseISO } from 'date-fns'
import { TaskModule, Task } from '../modules/tasks_module';

export default function EditTask (props) {

    const task = TaskModule.getTask(props.getTask)

    function cancelForm() {
        props.setBody(0)
        props.setSidebarOff(0)
    }

    return (
            <form className="form-container" id="addbook-form">
                <div className='form-controls'>
                <div className='form-col-1'>
                <label htmlFor="task-title">
                    Title: <span className='form-span' id="idspan">required</span>
                </label>
                <input type="text" name="task-title" id="task-title" placeholder='Enter title...' defaultValue={task.title} onInput={validateTitle} minLength={3} maxLength={30} required/>
                <label htmlFor="priority">
                    Priority: <span className='form-span' id="idspan">required</span>
                </label>
                <select id="priority" name="prority" defaultValue={task.priority}>
                        <option value="None">None</option>
                        <option value="Important">Important</option>
                        <option value="Urgent">Urgent</option>
                    </select>
                <label htmlFor="dueDate">
                    Due Date: <span className='form-span' id="iddate">required</span>
                </label>
                <input id="dueDate" type="date" name="dueDate" defaultValue={task.dueDate} onInput={validateDate}/>
                </div>
                <div className='form-col-2'>
                <label htmlFor="description">
                    Description: <span className='form-span text-valid' id="iddesc">optional</span>
                </label>
                <textarea id="description" name="description" placeholder='Enter description...' rows={6} cols={20} maxLength={240} defaultValue={task.description} />
                </div>
                </div>
                <button className='form-button' id="add-btn" type="submit" onClick={() => onSubmit(props.getTask)} value="Submit" >Submit</button>
                <button className='form-button' id="cancel-btn" type="button" onClick={cancelForm} >Cancel</button>
            </form>
    )
}

function validateTitle() {
    const title = document.querySelector('#task-title')

    if (title.validity.tooShort) {
        title.setCustomValidity('Your title must comprise of 3 characters and up.')
        title.reportValidity()
      } else {
        title.setCustomValidity('')
    }
}

function validateDate() {
    const dueDate = document.querySelector('#dueDate')
    const res = isBefore(parseISO(dueDate.value), parseISO(format(new Date(), 'yyyy-MM-dd')))

    if (res === true) {
      dueDate.setCustomValidity('Your due date must not be set before the current date.')
      dueDate.reportValidity()
    } else {
      dueDate.setCustomValidity('')
    }
}

function onSubmit(id) {
    const title = document.querySelector('#task-title')
    const dueDate = document.querySelector('#dueDate')
    const prio = document.querySelector('#priority')
    const desc = document.querySelector('#description')
    const res = isBefore(parseISO(dueDate.value), parseISO(format(new Date(), 'yyyy-MM-dd')))
  
    if (title.value.length <= 3 || res === true) { return }

    const task = new Task(title.value, desc.value, dueDate.value, prio.value)
    localStorage.setItem(id, JSON.stringify(task))
}