import React, { useState, useEffect } from 'react';
import './app.css';
// import Histogram from './Histogram';
import Linechart from './Linechart';

// [
//   { "date": "2019-03-22", "value": 192 },
//   { "date": "2019-03-18", "value": 28 },
//   { "date": "2019-03-20", "value": 60528 },
//   { "date": "2019-04-09", "value": 284 }
// ]

export default () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/github')
      .then(res => res.json())
      .then(commits => commits.sort(
        (commit1, commit2) => new Date(commit1.date).getTime() - new Date(commit2.date).getTime()
      ))
      .then(commits => commits.filter(commit => commit.value < 1000))      
      .then(commits => setData(commits));
  }, []);

  if (data) {
    return (
      <Linechart data={data} />
    );
  }
  return (
    <span>Loading</span>
  );
};
