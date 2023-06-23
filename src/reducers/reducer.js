// reducer.js
const initialState = {
  globalVariable: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "user":
      return { ...state, globalVariable: action.payload };
    default:
      return state;
  }
};

export default reducer;
