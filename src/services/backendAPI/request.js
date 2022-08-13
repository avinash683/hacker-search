import axios from "axios";

export function SearchAPI({ method, endpoint, params, data, type}) {
    return new Promise((resolve, reject) => {
        axios({
            method,
            url: endpoint,
            params,
            data,
        })
            .then((resp) => {
                const data = resp.data || {};
                if(type !== "search"){
                    resolve(data)
                }else {
                    resolve(data.hits);
                }
            })
            .catch((err) => {
                console.log(JSON.stringify(err));
            });
    });
}