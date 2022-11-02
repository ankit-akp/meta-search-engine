const googleUrl = `http://localhost:5000/search/google/{query}`;


const searchGoogle = async (query) =>{
    const response = await fetch(googleUrl.replaceAll('{query}', query)).then(res => res.json());
    return await response;
}

export default searchGoogle;