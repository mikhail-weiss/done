import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';

export default class App extends Component {
  state = { body: {} };

  componentDidMount() {
    fetch('/api/github')
      .then(res => res.json())
      .then(user => this.setState({ body: user }));
  }

  render() {
    const { body } = this.state;
    return (

      <table>
        <tbody>{Object.entries(body).map(([a, b], key) => {
          return (
            <tr key={key}>
              <td>{a}</td>
              <td>{b}</td>
            </tr>
          )

        })}</tbody>
      </table>
    );
  }
}
