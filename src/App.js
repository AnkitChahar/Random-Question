import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const problemSetURL =
    "https://codeforces.com/api/problemset.problems";

  const [randomProblem, setRandomProblem] = useState({});

  let problemData = null;

  useEffect(() => {
    if (problemData == null) {
      console.log("Fetching Entire Data!")
      axios.get(problemSetURL)
        .then(res => {
          console.log(res.data.status);
          problemData = res.data.result.problems;
          getRandomQuestion();
        }
        );
    }
  }, []);

  const getRandomQuestion = () => {
    if (problemData != null) {
      setRandomProblem(problemData[Math.round(Math.random() * Object.keys(problemData).length)]);
    }
  };

  return (
    <div className="main">
      <div className="topBar">Random Question from Codeforces</div>
      <div className={Object.keys(randomProblem).length === 0 ? "hidden" : "visibility"}>
        <p>
          <b>Name : </b>{randomProblem.name}
        </p>
        <p>
          <b>Points : </b>{randomProblem.points ? randomProblem.points : "None"}
        </p>
        <p>
          <b>Rating : </b>{randomProblem.rating}
        </p>
        <p>
          <b>Tags : </b>{randomProblem.tags?.join(", ")}
        </p>
        <a target="_blank" rel="noopener noreferrer" href={`http://codeforces.com/problemset/problem/${randomProblem.contestId}/${randomProblem.index}`}>
          Click Here to go to the page!
          </a>
      </div>
      <a className="right" target="_blank" rel="noopener noreferrer" href="https://github.com/AnkitChahar/Random-Question"><img width="149" height="149" src="https://github.blog/wp-content/uploads/2008/12/forkme_right_red_aa0000.png?resize=149%2C149" class="attachment-full size-full" alt="Fork me on GitHub" data-recalc-dims="1"/></a>
    </div>
  );
}

export default App;
