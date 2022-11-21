import React, { useEffect, useState, createContext } from "react";
import { useLocation } from "react-router-dom";
import searchWeb from "../../services/searchWeb";
import HashLoader from "react-spinners/HashLoader";
import NavTabs from "./NavTabs";
import ResultSection from "./ResultSection";

const SearchContext = createContext();
const Result = () => {
  const { state } = useLocation();
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchtab, setSearchtab] = useState({
    Common: true,
    google: false,
    yahoo: false,
    stackoverflow: false,
    scholar: false,
    pubmed: false,
    books: false,
    news: false,
  });

  useEffect(() => {
    setCommonResult();
  }, []);

  const googleResult = async () => await searchWeb.google(state.query);
  const yahooResult = async () => await searchWeb.yahoo(state.query);
  const stackoverflowResult = async () =>
    await searchWeb.stackoverflow(state.query);
  const scholarResult = async () => await searchWeb.scholar(state.query);
  const pubmedResult = async()=>await searchWeb.pubmed(state.query);
  const booksResult = async()=>await searchWeb.books(state.query);
  const newsResult = async()=>await searchWeb.news(state.query);

  const fetchResults = async () => {
    const { engines } = state;
    let results = {};
    let arr = [];
    if (engines?.stackoverflow) arr.push(stackoverflowResult());
    if (engines?.scholar) arr.push(scholarResult());
    if (engines?.yahoo) arr.push(yahooResult());
    if (engines?.google) arr.push(googleResult());
    if (engines?.pubmed) arr.push(pubmedResult());
    if (engines?.books) arr.push(booksResult());
    if (engines?.news) arr.push(newsResult());

    await Promise.all(arr).then((res) => {
      res.forEach((ele) => (results[ele.engine] = ele.results));
    });
    return results;
  };

  const setCommonResult = async () => {
    let newResult = await fetchResults();
    console.log(newResult);
    let urlFreq = {};

    Object.keys(newResult).forEach((res) => {
      newResult[res].forEach((ele) => {
        if (!(ele.url in urlFreq)) urlFreq[ele.url] = [1, ele];
        else urlFreq[ele.url][0]++;
      });
    });

    let commonResult = [];

    for (var url in urlFreq)
      if (urlFreq[url][0] !== 1) {
        commonResult.push([urlFreq[url][0], { ...urlFreq[url][1] }]);
      }
    commonResult.sort((a, b) => b[0] - a[0]);
    commonResult = commonResult.map((res) => {
      res[1].title += ` - [${res[0]}]`;
      return res[1];
    });

    if (commonResult.length > 0)
      setResult({ Common: commonResult, ...newResult });
    else setResult(newResult);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <div className="vh-100 bg-light d-flex">
          <div className="m-auto">
            <HashLoader
              color="#6c757d"
              loading="true"
              size={80}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
      ) : (
        <></>
      )}

      <SearchContext.Provider value={{ searchtab, setSearchtab }}>
        <div className="container">
          <NavTabs tabs={Object.keys(result)}></NavTabs>
          {Object.keys(result).map(
            (engine, key) =>
              searchtab[engine] === true && (
                <ResultSection
                  engine={engine}
                  result={result[engine]}
                  key={key}
                />
              )
          )}
        </div>
      </SearchContext.Provider>
    </>
  );
};

export default Result;
export { SearchContext };
