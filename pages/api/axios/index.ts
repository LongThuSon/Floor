import axios from 'axios'

enum METHOD {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
    PATCH = 'patch',
};

function Request() {
    async function requestApi(
        method: METHOD,
        url: string,
        options?: any,
        dataRequest?: any,
        token?: string,
        dataType?: string,
    ) {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token ? `Bearer ${token}` : ""
                },
                ...options,
                data: dataRequest,
                url,
                method,
            }
            console.log("Config Request API: ", config)
            let response = await axios(config);
            let { data } = response;
            return data;// return [data, null, data?.message, response?.status];
        } catch (error: any) {
            console.log("error", error)
            return [null, error, error?.message, error?.response?.status];
        }
    }

    function get(url: string, options = {}, token?: string) {
        return requestApi(METHOD.GET, url, options, null, token);
    }

    async function post(url: string, data: any, options = {}, token?: string, dataType?: string) {
        return requestApi(METHOD.POST, url, options, data, token, dataType);
    }

    function put(url: string, data: any, options = {}, token?: string) {
        return requestApi(METHOD.PUT, url, options, data, token);
    }

    function remove(url: string, data = {}, options = {}, token?: string) {
        return requestApi(METHOD.DELETE, url, options, data, token);
    }

    function patch(url: string, data: any, options = {}, token?: string) {
        return requestApi(METHOD.PATCH, url, options, data, token);
    }

    return { get, post, put, patch, delete: remove };
}

export default Request();
