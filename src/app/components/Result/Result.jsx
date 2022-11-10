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
    if (engines?.stackoverflow)
      newResult.stackoverflow = await stackoverflowResult();
    setResult(newResult);

    // const ycommon = newResult.yahoo.map((yah) => yah.url);

    // const comm = {};
    // const sort = {};
    // const same = [];
    // newResult.google.map((g) => {
    //   if (ycommon.includes(g.url)) {
    //     comm[g.url] = g;
    //     if (!(g.url in sort)) sort[g.url] = 1;
    //     else sort[g.url]++;
    //   }
    // });
    // for (var c in sort) {
    //   same.push([c, sort[c]]);
    // }
    // same.sort((a, b) => b[1] - a[1]);

    // const tp = [];
    // same.map((s) => {
    //   tp.push(comm[s[0]]);
    // });

    // console.log(sort);
    // console.log(same);

    // console.log(tp);

    // setCommonResult(tp)

    const comm = {};

    // newResult.google.map((g) => (comm[g.url] = [1, g]));

    // newResult.yahoo.map((y) => {
    //   if (!(y.url in comm)) comm[y.url] = [1, y];
    //   else comm[y.url][0]++;
    // });
    // arrange(newResult.yahoo,comm)

    // newResult.stackoverflow.map((s) => {
      // if (!(s.url in comm)) comm[s.url] = [1, s];
      // else comm[s.url][0]++;
    // });
    // arrange(newResult.stackoverflow,comm)
    

    // const sorted = [];

  //   for (var c in comm) {
  //     if (comm[c][0] !== 1) sorted.push([comm[c][0], comm[c][1]]);
  //   }

  //   sorted.sort((a, b) => b[0] - a[0]);

  //   const common = sorted.map((s) => s[1]);

  //   setCommonResult(common);
  // };

  // function arrange(a, b){

  //   a.map((i=>{
  //     if (!(i.url in b)) b[i.url] = [1, i];
  //     else b[i.url][0]++;
  //   }))



  Object.keys(result).map((common)=> { result[common].map((a)=>{

    if (!(a.url in comm)) comm[a.url] = [1, a];
    else comm[a.url][0]++;


  })}) 

  const sorted = [];

    for (var c in comm) {
      if (comm[c][0] !== 1) sorted.push([comm[c][0], comm[c][1]]);
    }

    sorted.sort((a, b) => b[0] - a[0]);

    const common = sorted.map((s) => s[1]);

    setCommonResult(common);
    
    console.log(commonResult)
  

  

  }

  const googleResult = async () =>
    (await searchWeb.google(state.query)).results;
  const yahooResult = async () => (await searchWeb.yahoo(state.query)).results;
  const stackoverflowResult = async () =>
    (await searchWeb.stackoverflow(state.query)).results;

  return (
    <div className="container">
      {commonResult.length!==0 && <Accordian key={"common"} page={"common"} results={commonResult} />}
      {Object.keys(result).map((engine, key) => (
        <Accordian key={key} page={engine} results={result[engine]} />
      ))}
    </div>
  );
};

export default Result;
