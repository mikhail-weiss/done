import React, { useState, useEffect } from 'react';
import './app.css';

// [
//   { "date": "2019-03-22", "value": 192 },
//   { "date": "2019-03-18", "value": 28 },
//   { "date": "2019-03-20", "value": 60528 },
//   { "date": "2019-04-09", "value": 284 }
// ]

export default () => {
  const [data, setData] = useState([]);
  useContext
  useEffect(() => {
    fetch('/api/github')
      .then(res => res.json())
      .then(commits => commits.sort(
        (commit1, commit2) => new Date(commit1.date).getTime() - new Date(commit2.date).getTime()
      ))
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
