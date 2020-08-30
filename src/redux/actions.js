import store from "./store";

const saveTodo = (todo) => store.dispatch({ type: "SAVE_TO_DO", todo });

const updateTodo = (todo) => store.dispatch({ type: "UPDATE_TO_DO", todo });

const deleteTodo = (todo) => store.dispatch({ type: "DELETE_TO_DO", todo });

const markStatus = (todo, flag) =>
  store.dispatch({ type: "MARK_STATUS", todo, flag });

export { saveTodo, updateTodo, deleteTodo, markStatus };
