const postData = async (url, data) => {//request to the server by Fetch(POST)
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

const getResource = async (url) => {//request to the server by Fetch(GET) 
    //to get data from server to create menu cards
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
};


export {postData};
export {getResource};