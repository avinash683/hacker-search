const initialState = {
  recentSearch : [],
}

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case 'SET_RECENT_SEARCH':
      return {
        ...state,
        recentSearch: action.payload,
      };
    default:
      return state;
  }
}
