import {SearchAPI} from "./request";

function searchHackerNews(queryString) {
    return SearchAPI({
        endpoint: `https://hn.algolia.com/api/v1/search`,
        method: 'GET',
        type:"search",
        params: {
            query: queryString
        },
    });
}

function viewHackerDetails(hackerId){
    return SearchAPI({
        endpoint: `https://hn.algolia.com/api/v1/items/${hackerId}`,
        method: 'GET'
    });
}
export {
    searchHackerNews,
    viewHackerDetails

}
