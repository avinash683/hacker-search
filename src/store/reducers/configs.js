const initialState = {
  recentSearch : [],
  blogDetails : {},
  loading: true
}

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case 'SET_RECENT_SEARCH':
      return {
        ...state,
        recentSearch: action.payload,
      };
    case 'SET_SELECTED_BLOG':
      return {
        ...state,
        blogDetails: action.payload,
      };
    case 'LOADING_STATE':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
