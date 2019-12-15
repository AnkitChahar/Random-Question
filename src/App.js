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
    <div className={Object.keys(randomProblem).length === 0 ? "hidden" : "visibility"}>
      <p>
        {randomProblem.contestId}
      </p>
      <p>
        {randomProblem.name}
      </p>
      <a target="_blank" rel="noopener noreferrer" href={`http://codeforces.com/problemset/problem/${randomProblem.contestId}/${randomProblem.index}`}>
        Click Here to go to the page!
        </a>
    </div>
  );
}

export default App;
