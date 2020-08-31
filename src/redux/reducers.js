import { prepareInstance, prepareInstances } from "../utils";

const toDoReducer = (state = {}, action) => {
  let { todo = {}, flag, type } = action;
  switch (type) {
    case "SAVE_TO_DO":
      todo = prepareInstance(todo, "id");
      return { ...state, ...todo };
    case "UPDATE_TO_DO":
      todo = prepareInstance(todo, "id");
      return { ...state, ...todo };
    case "DELETE_TO_DO":
      todo["isDeleted"] = true;
      todo = prepareInstance(todo, "id");
      return { ...state, ...todo };
    case "SAVE_TO_DOS":
      let { todos = [] } = action;
      todos = prepareInstances(todos, "id");
      return { ...state, ...todos };
    case "MARK_STATUS":
      todo["isCompleted"] = flag;
      todo = prepareInstance(todo, "id");
      return { ...state, ...todo };
    default:
      return state;
  }
};

const bucketReducer = (state = {}, action) => {
  let { bucket = {}, type } = action;
  switch (type) {
    case "SAVE_BUCKET":
      bucket = prepareInstance(bucket, "id");
      return { ...state, ...bucket };
    case "UPDATE_BUCKET":
      bucket = prepareInstance(bucket, "id");
      return { ...state, ...bucket };
    case "DELETE_BUCKET":
      bucket["isDeleted"] = true;
      bucket = prepareInstance(bucket, "id");
      return { ...state, ...bucket };

    default:
      return state;
  }
};

export { toDoReducer, bucketReducer };
