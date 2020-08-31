import store from "./store";

const saveTodo = (todo) => store.dispatch({ type: "SAVE_TO_DO", todo });

const updateTodo = (todo) => store.dispatch({ type: "UPDATE_TO_DO", todo });

const deleteTodo = (todo) => store.dispatch({ type: "DELETE_TO_DO", todo });

const saveTodos = (todos) => store.dispatch({ type: "SAVE_TO_DOS", todos });

const deleteTodos = (todos) => store.dispatch({ type: "DELETE_TO_DOS", todos });

const markStatus = (todo, flag) =>
  store.dispatch({ type: "MARK_STATUS", todo, flag });

const saveBucket = (bucket) => store.dispatch({ type: "SAVE_BUCKET", bucket });

const updateBucket = (bucket) =>
  store.dispatch({ type: "UPDATE_BUCKET", bucket });

const deleteBucket = (bucket) =>
  store.dispatch({ type: "DELETE_BUCKET", bucket });

export {
  saveTodo,
  updateTodo,
  deleteTodo,
  markStatus,
  saveTodos,
  deleteTodos,
  saveBucket,
  updateBucket,
  deleteBucket
};
