import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import searchGoogle from "../../services/googleSearch";
import Card from "./Card";

const Result = () => {

    const { state } = useLocation();
    const [result, setResult] = useState({ results: [] })

    useEffect(() => {
        const { engines } = state;
        if (engines?.google) {
            test();
        }
    }, [state]);

    const test = async () => {
        setResult(await searchGoogle(state.query));
    }

    console.log(result)
    return (<div className="result">
        {result.results.map((ele) =>
            <Card res={ele} />
        )}
    </div>)
}

export default Result;