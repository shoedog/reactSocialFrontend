import React                  from 'react';
import TodosView              from 'components/TodosView';
import TodosForm              from 'components/TodosForm';
import { bindActionCreators } from 'redux';
import * as TodoActions       from 'actions/TodoActions';
import { connect }            from 'react-redux';

/*
 If you’re not familiar with decorators (the @connector section here),
 then it’s easiest to think of them as a replacement for what you would used to use a ‘mixin’ for.
 You may have actually seen them in other languages, like Python, for instance.
 If not, in Javascript they are just functions that modify another given function (here a ‘class’) in some way.
 Notice how when defined like this (‘class leading’) they are attached to the following class definition,
 hence the lack of ;.
 Redux’s @connect decorator wraps our class in another component ( <Connector>),
 giving it access to the requested parts of state as props, hence why we can use todos as we do.
 It also passes in Redux’s dispatch function which can be used to dispatch actions like so: dispatch(actionCreator());
 */
@connect(state => ({ todos: state.todos }))

export default class Home extends React.Component {
  render() {
    const { todos, dispatch } = this.props;

    /*
     Finally we use redux’s bindActionCreators method to pass in… ermm… bound action creators.
     What this means is that, in the child components, we can just call the action creators directly,
     without wrapping them in a dispatch() call as above.
     */
    return (
      <div id="todo-list">
        <TodosView todos={todos}
                   {...bindActionCreators(TodoActions, dispatch)} />
        <TodosForm
          {...bindActionCreators(TodoActions, dispatch)} />
      </div>
    );
  }
}