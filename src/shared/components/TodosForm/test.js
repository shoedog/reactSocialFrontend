import React from 'react'
import { shallow } from 'enzyme'
import TodosForm from './TodosForm'

const wrapper = shallow(<TodosForm />);

describe('(Component) TodosForm', () => {
  it('renders...', () => {
    expect(wrapper).to.have.length(1);
  });
});
