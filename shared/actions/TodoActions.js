/*
 Redux action creators are just functions that return consistently formatted objects.
 No magic here, we just need a reducer to handle them.
 */

export function createTodo(text) {
  return {
    type: 'CREATE_TODO',
    text,
    date: Date.now()
  }
}
export function editTodo(id, text) {
  return {
    type: 'EDIT_TODO',
    id,
    text,
    date: Date.now()
  };
}
export function deleteTodo(id) {
  return {
    type: 'DELETE_TODO',
    id
  };
}