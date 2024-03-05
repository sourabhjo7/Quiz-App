import axios from "axios";

export default () => {
    const makeRequest = async ({ endPoint, method, body, headers, onSuccess, onError }) => {
        const BASE_URL = 'http://yesquiz-stage.eba-gwufjrqj.ap-south-1.elasticbeanstalk.com/api/v1'
        try {
            const request = {
                method: method,
                url: BASE_URL + endPoint,
                data: body,
                headers: {
                    headers
                }
            }
            const response = await axios(request)
            onSuccess(response.data)
        } catch (err) {
            console.log("Error: ", err.message)
            onError(err)
            if (err.response) {
                if (err.response.status == 400) {
                    console.log("Status code 400:- User not found")
                } else if (err.response.status == 404) {
                    console.log("Not found");
                } else if (err.response.status > 500) {
                    console.log('Something went wrong')
                } else if (err.response.status == 401 && err.response.data.errors[0].name == 'TokenExpiredError') {
                    console.log('Status Code 401:- Session expired')
                }
            }
        }
    }
    return { makeRequest }
}