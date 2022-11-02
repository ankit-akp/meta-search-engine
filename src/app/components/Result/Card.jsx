import React from "react";
import "./card.css";

function Card(props) {
  const { title, url, text } = props.res;
  return (
    <div className='card_list'>
      <a className="text-decoration-none" href={url}>
        <span className='text-muted small'>{url}</span>
        <div className='mb-2'>{title}</div>
      </a>
      <div className='text-muted small'>{text}</div>
    </div>
  );
}

export default Card;
