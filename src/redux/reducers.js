import { prepareInstance, prepareInstances } from "../utils";

const toDoReducer = (state = {}, action) => {
  let { todo = {}, flag, type } = action;
  let { id } = todo;
  switch (type) {
    case "SAVE_TO_DO":
      todo = prepareInstance(todo, "id");
      return { ...state, ...todo };
    case "UPDATE_TO_DO":
      todo = prepareInstance(todo, "id");
      return { ...state, ...todo };
    case "DELETE_TO_DO":
      delete state.todos[id];
      return state;
    case "MARK_STATUS":
      todo["isCompleted"] = flag;
      todo = prepareInstance(todo, "id");
      return { ...state, ...todo };
    default:
      return state;
  }
};

export { toDoReducer };
