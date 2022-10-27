const apiKey = "21731340a63dbffdead7e0c6043e1ab4229a421f0eda08beff460cb93ac61f57";
const url = `https://serpapi.com/search.json?engine=google&q={query}&api_key=${apiKey}`;


const searchGoogle = async (query) =>{
    const response = await fetch(url.replaceAll('{query}', query)).then(res => res.json());
    return await response;
}

export default searchGoogle;