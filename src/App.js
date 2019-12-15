import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const problemSetURL = "http://codeforces.com/api/problemset.problems"

  const [randomProblem, setRandomProblem] = useState({});

  let problemData = null;
  useEffect(() => {
    axios.get(problemSetURL)
    .then(res => {
      console.log(res.data.status)
      problemData = res.data.result.problems
      setRandomProblem(problemData[Math.round(Math.random() * Object.keys(problemData).length)]);
    })
  },[]);

  return (
    <div className="App">
      <h1>{randomProblem.contestId}</h1>
      <h1>{randomProblem.name}</h1>
      <a target="_blank" rel="noopener noreferrer" href={"http://codeforces.com/problemset/problem/"+randomProblem.contestId+"/"+randomProblem.index}>Click Here to go to the page!</a>
    </div>
  );
}

export default App;
