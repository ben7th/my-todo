import React from 'react'
import css from './index.scss'
import { observer } from 'mobx-react'
import store from '../store/TodoStore'
import TextareaAutosize from 'react-textarea-autosize'

export default class index extends React.Component {
  render () {
    return <div className={ css.index }>
      <div className={ css.title }>让生活成为一个整体！</div>
      <div>
        <Todos store={ store } />
        <TodoInput store={ store } />
        {/* <AddButton store={ store } /> */}
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
    let { isEditing } = this.state

    return <>
      <div className={ css.TODOID }>
        { this.props.todo.id }
      </div>
      {
        isEditing ? <TodoEdit 
          todo={ this.props.todo } 
          $line={ this }
        /> : <div className={ css.TODO }>
          <pre className={ css.text }
            onClick={ evt => this.edit() }
          >{ this.props.todo.text }</pre>
          <button className={ css.remove }
            onClick={ evt => this.props.store.removeTodo(this.props.todo) }
          >remove</button>
        </div>
      }
    </>
  }

  state = {
    isEditing: false
  }

  edit () {
    this.setState({ isEditing: true })
  }
}

class TodoInput extends React.Component {
  render () {
    let { value } = this.state

    return <div className={ css.TodoInput }>
      <TextareaAutosize 
        placeholder='请输入'
        value={ value }
        onChange={ evt => this.setState({ value: evt.target.value })}
        onKeyDown={ async evt => {
          if (evt.keyCode === 13 && (evt.ctrlKey || evt.metaKey)) {
            this.save()
          }
        }}
      />
      <button className={ css.save }
        disabled={ value.length === 0 ? true : false }
        onClick={ evt => this.save() }
      >save</button>
    </div>
  }

  state = {
    value: ''
  }

  save () {
    let { value } = this.state
    this.props.store.addTodo({ text: value })
    this.setState({ value: '' })
  }
}

class TodoEdit extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: props.todo.text
    }
  }

  render () {
    let { value } = this.state

    return <div className={ css.TodoInput }>
      <TextareaAutosize 
        placeholder='请输入'
        value={ value }
        onChange={ evt => this.setState({ value: evt.target.value })}
        onKeyDown={ async evt => {
          if (evt.keyCode === 13 && (evt.ctrlKey || evt.metaKey)) {
            this.save()
          }
        }}
      />
      <button className={ css.save }
        disabled={ value.length === 0 ? true : false }
        onClick={ evt => this.save() }
      >save</button>
    </div>
  }

  save () {
    this.props.todo.text = this.state.value
    this.props.$line.setState({ isEditing: false })
  }
}

// class AddButton extends React.Component {
//   render () {
//     return <div className={ css.AddButton }>
//       <button onClick={ evt => this.addTodo() }>add TODO</button>
//     </div>
//   }

//   addTodo () {
//     let text = Math.random() + ''
//     this.props.store.addTodo({ text })
//   }
// }