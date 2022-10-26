const apiKey = "61e9193ab9302fcfcd2de85cb2f8b257";
const url = `http://api.serpstack.com/search?access_key=${apiKey}&query={query}&engine=google`;

const searchGoogle = async (query) =>{
    const response = await fetch(url.replaceAll('{query}', query)).then(res => res.json());
    return await response;
}

export default searchGoogle;