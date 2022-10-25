import React from "react";
import { useState } from "react";

const Homepage = () => {

	const [engines, setEngines] = useState({
		google: true,
		yahoo: false,
		stackoverflow: false
	});

	const updateEngine = (e) => {
		let newEngine = {...engines};
		newEngine[e.target.value] = !newEngine[e.target.value];
		setEngines(newEngine)
	}


	const search = () => {
		console.log(engines);
	}

	return (
		<div className="container d-flex vh-100">
			<div className="m-auto d-block w-100">
				<div className="row">
					<h1 className="text-center">Meta Search Engine</h1>
					<div className="col-8 m-auto mt-3">
						<input type="text" name="" id="" className="form-control" />
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