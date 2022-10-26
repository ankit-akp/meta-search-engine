import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import searchGoogle from "../../services/googleSearch";

const Result = () => {

    const {state} = useLocation();
    const [result, setResult] = useState({})

    useEffect(() => {
        const {engines} = state;
        if(engines?.google){
            test();
        }
    },[state]);

    const test = async () => {
        setResult(await searchGoogle(state.query));
    }

    return (<div>
        <pre>{JSON.stringify(result)}</pre>
    </div>)
}

export default Result;