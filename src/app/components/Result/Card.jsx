import React from "react";
import "./card.css";


function Card(props) {
	
	const { title, url, text } = props.res;

	return (
		<>
			<div className="card border-0">
				<div className="card-body">
					<a className="text-decoration-none" href={url}>
						<div style={{ textOverflow: 'ellipsis' }} className="text-muted small text-nowrap overflow-hidden">{url}</div>
						<div className="mb-2">{title}</div>
					</a>
					<div className="text-muted small">{text}</div>
				</div>
			</div>
		</>
	);
}

export default Card;
