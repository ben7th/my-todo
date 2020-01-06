import { observable, action, configure, toJS, reaction } from 'mobx'
// import LOS from '../lib/LocalObjectStorage'
import uuidv1 from 'uuid/v1'
import api from '../lib/api'

configure({
  enforceActions: 'observed'
})

class TodoStore {
  @observable todos = []

  constructor () {
    this.init()
  }

  async init () {
    await this.load()
    reaction(() => {
      return toJS(this)
    }, async (data) =>{
      await api.save({ data })
    })
  }

  async load () {
    let res = await api.load()
    let todos = res.todos || []
    this.setTodos({ todos })
  }

  @action setTodos ({ todos }) {
    this.todos = todos
  }

  @action addTodo ({ text }) {
    let todo = {
      id: uuidv1(),
      text,
      created: new Date(),
      updated: new Date()
    }
    this.todos.push(todo)
  }

  @action removeTodo ({ id }) {
    this.todos = this.todos.filter(x => x.id !== id)
  }

  @action setTodoText ({ todo, text }) {
    todo.text = text
    todo.updated = new Date()
  }
}

const store = new TodoStore()

export default store