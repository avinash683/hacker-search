import {searchHackerNews, viewHackerDetails} from "../../services/backendAPI";

export const getRecentSearchAction = (queryString) => (dispatch) => {
    searchHackerNews(queryString).then((response) => {
        dispatch({
            type: "SET_RECENT_SEARCH",
            payload: response,
        });
    }).catch((err) => console.log("",err));
};

export const getSelectedBlogAction = (hackerId) => (dispatch) => {
    dispatch({
        type: 'LOADING_STATE',
        payload: true
    })
    viewHackerDetails(hackerId).then((response) => {
        dispatch({
            type: "SET_SELECTED_BLOG",
            payload: response,
        });
        dispatch({
            type: 'LOADING_STATE',
            payload: false
        })
    }).catch((err) => console.log("",err));

};
