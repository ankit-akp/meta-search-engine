import React from "react";
import { useEffect } from "react";
import Card from "./Card";


export default function ResultSection(props) {
  
  useEffect(() => {
    console.log("TP",props);
  }, []);

  return (
    <div className="p-3 border border-top-0">
      

      {props.result.map((ele, key) => (
        <Card res={ele} key={key} />
      ))}
    </div>
  );
}
