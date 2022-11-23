import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {

	const [categories, setCategories] = useState({
		programming: false,
		research: false,
		medical: false,
		books: false,
		news: false
	});
	const [query, setQuery] = useState('');
	const navigate = useNavigate();

	const onQueryChange = (e) => {
		setQuery(e.target.value);
	}

	const updateCategory = (e) => {
		let newCategory = { ...categories };
		newCategory[e.target.value] = !newCategory[e.target.value];
		setCategories(newCategory)
	}


	const search = () => {
		if(query === '')
			return;
		const engines = {
			google: true,
			yahoo: true,
			stackoverflow: false,
			scholar: false,
			pubmed:false,
			books:false,
			news:false
		}
		if(categories.programming) engines.stackoverflow = true;
		if(categories.research) engines.scholar = true;
		if(categories.medical) engines.pubmed = true;
		if(categories.books) engines.books = true;
		if(categories.news) engines.news = true;
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
							<input className="form-check-input" type="checkbox" checked={categories.programming} onChange={updateCategory} value="programming" id="programming" />
							<label className="form-check-label" htmlFor="programming">Programming</label>
						</div>
						<div className="d-inline-block mx-5 form-check">
							<input className="form-check-input" type="checkbox" checked={categories.research} onChange={updateCategory} value="research" id="research" />
							<label className="form-check-label" htmlFor="research">Research</label>
						</div>
						<div className="d-inline-block mx-5 form-check">
							<input className="form-check-input" type="checkbox" checked={categories.medical} onChange={updateCategory} value="medical" id="medical" />
							<label className="form-check-label" htmlFor="medical">Medical</label>
						</div>
						<div className="d-inline-block mx-5 form-check">
							<input className="form-check-input" type="checkbox" checked={categories.books} onChange={updateCategory} value="books" id="books" />
							<label className="form-check-label" htmlFor="books">Books</label>
						</div>
						<div className="d-inline-block mx-5 form-check">
							<input className="form-check-input" type="checkbox" checked={categories.news} onChange={updateCategory} value="news" id="news" />
							<label className="form-check-label" htmlFor="news">News</label>
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