import '../styles/AddBook.css'
import React from "react";

export default function AddBookForm () {


    return (
        <div className="content-component" id="addbook-modal">
            <div className="content-header">
                <h2 id="content-header-text">Add a Task</h2>
            </div>
            <div className="content-container">
            <form className="form-container" id="addbook-form">
                <div className='form-controls'>
                <div className='form-col-1'>
                <label htmlFor="task-title">
                    Title:
                </label>
                <input type="text" name="task-title" id="task-title"/>
                <label htmlFor="priority">
                    Priority:
                    <select name="prority">
                        <option value="None">None</option>
                        <option value="Important">Important</option>
                        <option value="Urgent">Urgent</option>
                    </select>
                </label>
                <label>
                    Due Date:
                    <input type="date" name="dueDate" />
                </label>
                </div>
                <div className='form-col-2'>
                <label htmlFor="description">
                    Description:
                </label>
                <textarea id="description" name="description" placeholder='Enter description... (optional)' rows={5} cols={20} maxLength={240} />
                </div>
                </div>
                <button type="submit" value="Submit" >Submit</button>
            </form>
            </div>
        </div>
    )
}