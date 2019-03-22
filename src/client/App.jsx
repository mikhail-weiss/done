import React, { useState, useEffect } from 'react';
import './app.css';
import Histogram from './Histogram';

export default () => {
  const [data, setData] = useState({ });
  const params = {
    width: 500,
    height: 500
  };

  useEffect(() => fetch('/api/github')
    .then(res => res.json())
    .then(user => setData({ body: user })), []);

  if (data.body) {
    return (
      <svg width="1100" height="500">
        <Histogram {...params} x={500} y={10} data={data.body} />
      </svg>
    );
  }
  return (
    <span>Loading</span>
  );
};


// <table>
//   <tbody>{Object.entries(body).map(([a, b], key) => {
//     return (
//       <tr key={key}>
//         <td>{a}</td>
//         <td>{b}</td>
//       </tr>
//     )

//   })}
//   </tbody>
// </table>
