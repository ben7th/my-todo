import { observable, autorun } from 'mobx'
import LOS from '../lib/LocalObjectStorage'
import uuidv1 from 'uuid/v1'

class TodoStore {
  @observable todos = []

  constructor () {
    this.load()
  }

  load () {
    this.todos = LOS.get('todos') || []
  }

  addTodo ({ text }) {
    let todo = {
      id: uuidv1(),
      text
    }
    this.todos.push(todo)
  }

  removeTodo ({ id }) {
    this.todos = this.todos.filter(x => x.id !== id)
  }
}

const store = new TodoStore()

autorun(() => {
  LOS.set('todos', store.todos)
})

export default store