import React from "react";
import Card from "./Card";


export default function ResultSection(props) {

  return (
    <div className="bg-white p-3 border border-top-0">
      {props.result.map((ele, key) => (
        <Card res={ele} key={key} />
      ))}
    </div>
  );
}
