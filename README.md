# Todo://
A simple To-do list app where you can create, edit and delete tasks.
See the project live [here](https://coffeedevr.github.io/todo-list-react-app/), hosted by Github Pages.

## What does this app do?
### Overview
This app lets you create detailed tasks where you can customize the following:
* the task name/title and description
* the task's due date
* the task's urgency/priority
### Task Urgency
The tasks can be categorized into three urgency levels: None (colored green, which means not urgent), Important (colored yellow, which means important but not urgent enough) and Urgent (colored red, which means most urgent). To sort your task list by urgency, just choose which urgency would you like to view in the sidebar.
### Storage
The tasks are stored via LocalStorage so created tasks are persisted even when the browser is closed, unless resetted.
### Responsiveness
This app can be used properly on mobile browsers.

## Why did I made this project?
This project is a part of the Odin Project curriculum to practice how to utilize the LocalStorage API and JS Classes but I decided to also create it using ReactJS thru `create-react-app` to practice ReactJS and React Hooks.

## What improvements can you still make in this project?
* Break the components down to the smallest level as I initially designed this app to be broken down into just the different main components of the app.
* Remove the LocalStorage factory function I made because it is redundant.
* Login function and a dedicated database to store the tasks.
