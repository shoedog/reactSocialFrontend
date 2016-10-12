import React, { PropTypes } from 'react';

// This is also a ‘dumb’ component, and just lets the user add a todo to the store.

export default class TodosForm extends React.Component {

  static propTypes = {
    createTodo: PropTypes.func.isRequired
  };

  handleSubmit = () => {
    let node = this.refs['todo-input'];

    this.props.createTodo(node.value);

    node.value = '';
  }

  render() {
    return (
      <div id="todo-form">
        <input type="text" placeholder="type todo" ref="todo-input" />
        <input type="submit" value="OK!" onClick={this.handleSubmit} />
      </div>
    );
  }
}
