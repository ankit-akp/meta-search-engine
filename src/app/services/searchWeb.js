const googleUrl = `http://localhost:5000/search/google/{query}`;
const yahooUrl = `http://localhost:5000/search/yahoo/{query}`;
const stackoverflowUrl = `http://localhost:5000/search/stackoverflow/{query}`

class searchWeb{
    google = async (query) =>{
        const response = await fetch(googleUrl.replaceAll('{query}', query)).then(res => res.json());
        return await response;
    }
    
    yahoo = async (query) =>{
        const response = await fetch(yahooUrl.replaceAll('{query}', query)).then(res => res.json());
        return await response;
    }

    stackoverflow = async (query) =>{
        const response = await fetch(stackoverflowUrl.replaceAll('{query}', query)).then(res => res.json());
        return await response;
    }
}

export default new searchWeb();