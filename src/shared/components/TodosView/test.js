import React from 'react'
import {
  mount,
  shallow,
} from 'enzyme';

import TodosView from './TodosView'

const props = {
  todos: [],
  editTodo: () => {},
};

const wrapper = shallow(<div>
  <TodosView todos={props.todos} editTodo={[0, 0]} deleteTodo={0} />
  </div>);

describe('(Component) TodosView', () => {
  it('renders...', () => {
    expect(wrapper).to.have.length(1);
  });
});