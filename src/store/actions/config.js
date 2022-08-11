import {searchHackerNews} from "../../services/backendAPI";

export const getRecentSearchAction = () => (dispatch) => {
    searchHackerNews().then((response) => {
        dispatch({
            type: "SET_RECENT_SEARCH",
            payload: response,
        });
    }).catch((err) => console.log("",err));
};
