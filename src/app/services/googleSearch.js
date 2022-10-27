const apiKey = "5f5b49cdc282e2793b014be14c5c3aff";
const url = `http://api.serpstack.com/search?engine=google&query={query}&access_key=${apiKey}`;


const searchGoogle = async (query) =>{
    const response = await fetch(url.replaceAll('{query}', query)).then(res => res.json());
    return await response;
}

export default searchGoogle;