import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import searchWeb from "../../services/searchWeb";
import Accordian from "./Accordian";

const Result = () => {

    const { state } = useLocation();
    const [result, setResult] = useState({})

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        const { engines } = state;
        let newResult = {}
        if (engines?.google) newResult.google = await googleResult();
        if (engines?.yahoo) newResult.yahoo = await yahooResult();
        setResult(newResult);
    }

    const googleResult = async () => (await searchWeb.google(state.query)).results
    const yahooResult = async () => (await searchWeb.yahoo(state.query)).results

    return (
        <div className="container">
            {
                Object.keys(result).map((engine, key) => <Accordian key={key} page={engine} results={result[engine]} />)
            }
        </div>
    )
}

export default Result;