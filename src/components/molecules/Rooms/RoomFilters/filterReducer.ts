export const filterReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'TOGGLE_STATUS':
      return {
        ...state,
        status: {
          ...state.status,
          [action.payload]: !state.status[action.payload],
        },
      };
    case 'TOGGLE_CONDITION':
      return {
        ...state,
        conditions: {
          ...state.conditions,
          [action.payload]: !state.conditions[action.payload],
        },
      };
    default:
      return state;
  }
};
