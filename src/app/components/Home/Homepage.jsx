import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {

	const [engines, setEngines] = useState({
		google: false,
		yahoo: false,
		stackoverflow: false,
		scholar: false,
		pubmed:false,
		books:false,
		news:false
	});
	const [query, setQuery] = useState('');
	const navigate = useNavigate();

	const onQueryChange = (e) => {
		setQuery(e.target.value);
	}

	const updateEngine = (e) => {
		let newEngine = { ...engines };
		newEngine[e.target.value] = !newEngine[e.target.value];
		setEngines(newEngine)
	}


	const search = () => {
		navigate('/result', {state: {query,engines}})
	}

	return (
		<div className="container d-flex vh-100">
			<div className="m-auto d-block w-100">
				<div className="row">
					<h1 className="text-center">Meta Search Engine</h1>
					<div className="col-8 m-auto mt-3">
						<input type="text" value={query} onChange={onQueryChange} className="form-control" />
					</div>
					<div className="text-center mt-4">
						<div className="d-inline-block mx-5 form-check">
							<input className="form-check-input" type="checkbox" checked={engines.google} onChange={updateEngine} value="google" id="google" />
							<label className="form-check-label" htmlFor="google">Google</label>
						</div>
						<div className="d-inline-block mx-5 form-check">
							<input className="form-check-input" type="checkbox" checked={engines.yahoo} onChange={updateEngine} value="yahoo" id="yahoo" />
							<label className="form-check-label" htmlFor="yahoo">Yahoo</label>
						</div>
						<div className="d-inline-block mx-5 form-check">
							<input className="form-check-input" type="checkbox" checked={engines.stackoverflow} onChange={updateEngine} value="stackoverflow" id="stackoverflow" />
							<label className="form-check-label" htmlFor="stackoverflow">Stackoverflow</label>
						</div>
						<div className="d-inline-block mx-5 form-check">
							<input className="form-check-input" type="checkbox" checked={engines.scholar} onChange={updateEngine} value="scholar" id="scholar" />
							<label className="form-check-label" htmlFor="scholar">Google Scholar</label>
						</div>
						<div className="d-inline-block mx-5 form-check">
							<input className="form-check-input" type="checkbox" checked={engines.pubmed} onChange={updateEngine} value="pubmed" id="pubmed" />
							<label className="form-check-label" htmlFor="pubmed">Pubmed</label>
						</div>
						<div className="d-inline-block mx-5 form-check">
							<input className="form-check-input" type="checkbox" checked={engines.books} onChange={updateEngine} value="books" id="books" />
							<label className="form-check-label" htmlFor="books">Google Books</label>
						</div>
						<div className="d-inline-block mx-5 form-check">
							<input className="form-check-input" type="checkbox" checked={engines.news} onChange={updateEngine} value="news" id="news" />
							<label className="form-check-label" htmlFor="news">Google News</label>
						</div>
					</div>
					<div className="col-12 text-center mx-auto mt-5">
						<input type="button" onClick={search} value="Search" className="btn btn-secondary" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Homepage;