import React from 'react'
import css from './index.scss'
import { observer } from 'mobx-react'
import TodoStore from '../store/TodoStore'

const store = new TodoStore()

export default class index extends React.Component {
  render () {
    return <div className={ css.index }>
      <div className={ css.title }>让生活成为一个整体！</div>
      <div>
        <Todos store={ store } />
        <AddButton store={ store } />
      </div>
    </div>
  }
}

@observer
class Todos extends React.Component {
  render () {
    let { todos } = this.props.store
    let _todos = todos.map((x, idx) => {
      return <TODO 
        todo={ x } 
        store={ this.props.store } 
        key={ idx } 
      />
    })
    return <div className={ css.Todos }>
      { _todos }
    </div>
  }
}

@observer
class TODO extends React.Component {
  render () {
    return <div className={ css.TODO }>
      <div className={ css.text }>{ this.props.todo.text }</div>
      <div className={ css.remove }
        onClick={ evt => this.props.store.removeTodo(this.props.todo) }
      >remove</div>
    </div>
  }
}

class AddButton extends React.Component {
  render () {
    return <div className={ css.AddButton }>
      <button onClick={ evt => this.addTodo() }>add TODO</button>
    </div>
  }

  addTodo () {
    let text = Math.random() + ''
    this.props.store.addTodo({ text })
  }
}