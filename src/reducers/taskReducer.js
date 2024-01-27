const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];

    case "EDIT_TASK":
      return state.map((task) => {
        if (task.id === action.payload.id) {
          return action.payload;
        } else {
          return task;
        }
      });

    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload.id);

    case "DELETE_ALL":
      state.length = 0;
      return [...state];

    case "FAVOURITE":
      return action.payload;

    case "SEARCH":
      return [...action.payload];
  }
};

export { taskReducer };
