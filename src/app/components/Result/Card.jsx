import React from "react";
import "./card.css";

function Card(props) {
  let title, url, text, freq;
  if (Array.isArray(props.res)) {
    freq = props.res[0];
    ({title, url, text} = props.res[1]);
  } else {
    ({title, url, text} = props.res);
  }

  return (
    <>
      <div className="card border-0">
        <div className="card-body">
          <a className="text-decoration-none" href={url}>
            <div style={{textOverflow: 'ellipsis'}} className="text-muted small text-nowrap overflow-hidden">{url}</div>
            <div className="mb-2">{title} {!!!freq ? '' : `- [${freq}]`}</div>
          </a>
          <div className="text-muted small">{text}</div>
        </div>
      </div>
    </>
  );
}

export default Card;
