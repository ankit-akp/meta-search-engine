import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import searchWeb from "../../services/searchWeb";
import Accordian from "./Accordian";

const Result = () => {
  const { state } = useLocation();
  const [result, setResult] = useState({});
  const [commonResult, setCommonResult] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    const { engines } = state;
    let newResult = {};

    if (engines?.google) newResult.google = await googleResult();
    if (engines?.yahoo) newResult.yahoo = await yahooResult();
    if (engines?.stackoverflow) newResult.stackoverflow = await stackoverflowResult();
    if (engines?.scholar) newResult.scholar = await scholarResult();
    setResult(newResult);

    let comm = {};

    Object.keys(newResult).map((common) => {
      newResult[common].map((a) => {
        if (!(a.url in comm)) comm[a.url] = [1, a];
        else comm[a.url][0]++;
      });
    });

    const sorted = [];

    for (var c in comm) {
      if (comm[c][0] !== 1) sorted.push([comm[c][0], comm[c][1]]);
    }

    sorted.sort((a, b) => b[0] - a[0]);

    setCommonResult(sorted);
  };

  const googleResult = async () => (await searchWeb.google(state.query)).results;
  const yahooResult = async () => (await searchWeb.yahoo(state.query)).results;
  const stackoverflowResult = async () => (await searchWeb.stackoverflow(state.query)).results;
  const scholarResult = async () => (await searchWeb.scholar(state.query)).results;

  return (
    <div className="container">
      {commonResult.length !== 0 && (
        <Accordian key={"common"} page={"common"} results={commonResult} />
      )}
      {Object.keys(result).map((engine, key) => (
        <Accordian key={key} page={engine} results={result[engine]} />
      ))}
    </div>
  );
};

export default Result;
