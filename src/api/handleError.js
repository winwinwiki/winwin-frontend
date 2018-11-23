
class HandleError {
    static checkResponse(response) {
        return new Promise((resolve, reject) => {
            if (response.status === 200) {
                resolve(response);
            } else if (response.status === 401) {
                reject(response);
            } else if (response.status === 404) {
                reject(response);
            } else if (response.status === 429) {
                reject(response);
            } else if (response.status === 502) {
                reject(response);
            } else {
                resolve(response);
            }
        });
    }
}

export default HandleError;