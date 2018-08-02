
class HandleError {
    static checkResponse(response, cb) {
        if(response.status === 200) {
            cb(null, response);
        } else if(response.status === 401) {

        } else if(response.status === 404) {
            
        }  else if (response.status === 429) {

        } else if (response.status === 502) {

        }  else {
            cb(null, response);
        }
    }
}

export default HandleError;