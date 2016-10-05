import React, { Component, PropTypes } from 'react';
import Immutable     from 'immutable';

// Here we display each todo item in the store alongside edit and delete buttons
// which are mapped to our pre-bound action creators.

const propTypes = {
  todos:      PropTypes.instanceOf(Immutable.List).isRequired,
  editTodo:   PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

class TodosView extends Component {

  handleDelete = (e) => {
    const id = Number(e.target.dataset.id);

    // Equivalent to `dispatch(deleteTodo())`
    this.props.deleteTodo(id);
  }

  handleEdit = (e) => {
    const id  = Number(e.target.dataset.id);
    const currentVal = this.props.todos.get(id);

    // For cutting edge UX
    let text = window.prompt('', currentVal);

    this.props.editTodo(id, text);
  }

  render() {
    const btnStyle = {
      'margin': '1em 0 1em 1em'
    };

    return (
      <div id="todo-list">
        {
          this.props.todos.map( (todo, index) => {
            return (
              <div style={btnStyle} key={index}>
                <span>{todo}</span>

                <button style={btnStyle} data-id={index} onClick={this.handleDelete}>
                  X
                </button>
                <button style={btnStyle} data-id={index} onClick={this.handleEdit}>
                  Edit
                </button>
              </div>
            );
          })
        }
      </div>
    );
  }
}

TodosView.propTypes = propTypes;
export default TodosView;
