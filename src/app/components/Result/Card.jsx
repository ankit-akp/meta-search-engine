import React from "react";
import "./card.css";

function Card(props) {
  const { title, url } = props.res;
  return (
    <div className='card_list'>
      <h1 className='heading'>{title}</h1>
      <a href={url}>
        <h2 className='heading2'>{url}</h2>
      </a>
      <p></p>
    </div>
  );
}

export default Card;
