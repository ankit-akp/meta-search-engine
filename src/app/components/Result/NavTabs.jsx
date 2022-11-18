import React from 'react'

export default function NavTabs(props) {
	return (
		<div>
			<ul className="nav nav-tabs">
				{props.tabs.map((tab, key) => (
					<li key={key} className="nav-item">
						<span className="nav-link active" aria-current="page">{tab}</span>
					</li>
				))}
			</ul>
		</div>
	)
}
