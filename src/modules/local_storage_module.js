const Storage = (() => {
    const getTask = (key) => {
      return JSON.parse(localStorage.getItem(key))
    }
    const makeTask = (key, value) => {
      localStorage.setItem(key, JSON.stringify(value))
    }
    const deleteTask = (key) => {
      localStorage.removeItem(key)
    }
  
    return { getTask, makeTask, deleteTask }
  })()
  
  export { Storage as default }