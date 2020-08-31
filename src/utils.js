const prepareInstance = (instance, idField = "id") => {
  if (!(idField in instance)) return {};

  let id = instance[idField];
  return { [id]: instance };
};

const prepareInstances = (instances, idField = "id") => {
  let mappedInstances = {};
  mappedInstances = instances.map((instance) => {
    return prepareInstance(instance, idField);
  });

  return Object.assign({}, ...mappedInstances);
};

const getToDosByStatus = (list, isCompleted = true) => {
  return list.filter(
    (ins) => ins.isCompleted === isCompleted && !ins.isDeleted
  );
};

const getActiveToDos = (list) => {
  return list.filter((ins) => !ins.isDeleted);
};

export const createOptionForReactSelect = (list) => {
    const options = [];
    if (!list) {
        return options;
    }

    list.forEach((instance) => {
        options.push({
            value: instance['id'],
            label: instance['title'],
            ...instance
        });
        
    });

    return options;
};

export { prepareInstance, prepareInstances, getToDosByStatus, getActiveToDos };
