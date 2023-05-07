import Storage from './local_storage_module'
import { format, parseISO, compareAsc, differenceInDays } from 'date-fns'

function Task (title, description, dueDate, priority, project) {
  this.title = title
  this.description = description
  this.dueDate = dueDate
  this.priority = priority
  this.check = false
}

const TaskModule = (() => {
  const createTask = (title, description, dueDate, priority, project) => {
    let count = JSON.parse(localStorage.getItem('counter'))
    count = parseInt(count) + 1
    const note = new Task(title, description, dueDate, priority, project)
    localStorage.setItem('counter', count)
    Storage.makeTask('note' + count, note)
  }

  const getTask = (key) => {
    return Storage.getTask(key)
  }

  const retrieveTasks = () => {
    return { ...localStorage }
  }

  const retrieveTasksUrgent = () => {
    const tasks = { ...localStorage }
    if (Object.keys(tasks).length < 1) { return }

    // eslint-disable-next-line prefer-const
    let list = []
    for (let i = 0; i < Object.keys(tasks).length; i++) {
      if (JSON.parse(localStorage.getItem(Object.keys(tasks)[i])).priority !== 'Urgent') { continue }
      list[`${Object.keys(tasks)[i]}`] = `${localStorage.getItem(Object.keys(tasks)[i])}`
    }

    if (Object.keys(list).length < 1) { return list }
    return list
  }

  const retrieveTasksImportant = () => {
    const tasks = { ...localStorage }
    if (Object.keys(tasks).length < 1) { return }

    // eslint-disable-next-line prefer-const
    let list = []
    for (let i = 0; i < Object.keys(tasks).length; i++) {
      if (JSON.parse(localStorage.getItem(Object.keys(tasks)[i])).priority !== 'Important') { continue }
      list[`${Object.keys(tasks)[i]}`] = `${localStorage.getItem(Object.keys(tasks)[i])}`
    }

    if (Object.keys(list).length < 1) { return list }
    return list
  }

  const retrieveTasksByProj = (project) => {
    const tasks = { ...localStorage }
    if (Object.keys(tasks).length < 1) { return }

    // eslint-disable-next-line prefer-const
    let list = []
    for (let i = 0; i < Object.keys(tasks).length; i++) {
      if (JSON.parse(localStorage.getItem(Object.keys(tasks)[i])).project !== project) { continue }
      list[`${Object.keys(tasks)[i]}`] = `${localStorage.getItem(Object.keys(tasks)[i])}`
    }
    return list
  }

  const getTaskDue = (date) => {
    const today = format(new Date(), 'yyyy-MM-dd')
    const result = compareAsc(parseISO(today), parseISO(date))
    return result === 0
      ? 'Due Today'
      : result === -1
        ? 'in ' + differenceInDays(parseISO(date), parseISO(today)) + ' days'
        : differenceInDays(parseISO(today), parseISO(date)) + ' days ago'
  }

  const retrieveTasksDueToday = () => {
    const tasks = { ...localStorage }
    if (Object.keys(tasks).length < 1) { return }

    // eslint-disable-next-line prefer-const
    let list = []
    const today = format(new Date(), 'yyyy-MM-dd')

    for (let i = 0; i < Object.keys(tasks).length; i++) {
      const a = JSON.parse(localStorage.getItem(Object.keys(tasks)[i])).dueDate
      const b = compareAsc(parseISO(a), parseISO(today))
      if (b !== 0) { continue }
      list[`${Object.keys(tasks)[i]}`] = `${localStorage.getItem(Object.keys(tasks)[i])}`
    }

    if (Object.keys(list).length < 1) { return list }
    return list
  }

  return { createTask, getTask, retrieveTasks, retrieveTasksUrgent, retrieveTasksImportant, retrieveTasksByProj, retrieveTasksDueToday, getTaskDue }
})()

export { TaskModule, Task }