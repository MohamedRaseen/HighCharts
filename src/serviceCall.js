export const callApi = async (url = '', method, body) => {
    let requestInfo = {
        method, headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    if (body) {
        requestInfo = { ...requestInfo, body: JSON.stringify(body) }
    }

    const response = await fetch(url, requestInfo).then((data) => data.json());
    return response;
}