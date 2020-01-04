import { observable, autorun } from 'mobx'

const LS = {
  set (key, obj) {
    localStorage.setItem(key, JSON.stringify(obj))
  },

  get (key) {
    return JSON.parse(localStorage.getItem(key))
  },

  remove (key) {
    localStorage.removeItem(key)
  }
}

export default class TodoStore {
  @observable todos = []

  constructor () {
    this.todos = LS.get('todos') || []
    autorun(() => {
      LS.set('todos', this.todos)
    })
  }

  addTodo ({ text }) {
    this.todos.push({ text })
  }

  removeTodo ({ text }) {
    this.todos = this.todos.filter(x => x.text !== text)
  }
}