import React from "react";
import "./card.css";

function Card(props) {
  let title, url, text, freq;
  if (Array.isArray(props.res)) {
    freq = props.res[0];
    title = props.res[1].title;
    url = props.res[1].url;
    text = props.res[1].text;
  } else {
    title = props.res.title;
    url = props.res.url;
    text = props.res.text;
  }

  return (
    <div className="card_list">
      <a className="text-decoration-none" href={url}>
        <span className="text-muted small">{url}</span>
        <div className="mb-2">{title}</div>
      </a>
      <div className="text-muted small">{text}</div>
    </div>
  );
}

export default Card;
