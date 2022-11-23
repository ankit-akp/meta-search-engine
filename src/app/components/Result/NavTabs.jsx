import React from "react";
import { useContext } from "react";
import { SearchContext } from "./Result";

export default function NavTabs(props) {
  let { searchtab, setSearchtab } = useContext(SearchContext);

  function tabsearching(tab) {
    let newsearchtab = { ...searchtab };
    Object.keys(newsearchtab).map((a) => {
      if (a !== tab) newsearchtab[a] = false;
      else newsearchtab[a] = true;
    });
    setSearchtab(newsearchtab);
    console.log(searchtab);
  }

  return (
    <div>
      <ul className="nav nav-tabs bg-secondary rounded-top">
        {props.tabs.map((tab, key) => (
          <li key={key} className="nav-item">
            <span
              onClick={() => tabsearching(tab)}
              className={`nav-link ${searchtab[tab] ? 'active text-secondary' : ''}`}
              style={{'cursor':'pointer', 'color':'#fff'}}
              
              aria-current="page"
            >
              {tab}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
