/* eslint-disable react/destructuring-assignment */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { LineChart, Line } from 'recharts';

const Bar = ({
  x, y, width, height
}) => {
  const translate = `translate(${x}, ${y})`;
  // let label = `${percent.toFixed(0)}%`;

  // if (percent < 1) {
  //   label = `${percent.toFixed(2)}%`;
  // }

  // if (width < 20) {
  //   label = label.replace('%', '');
  // }

  // if (width < 10) {
  //   label = '';
  // }

  return (
    <g transform={translate} className="bar">
      <rect
        width={width}
        height={height}
      />
    </g>
  );
};

Bar.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

class Histogram extends Component {
  constructor(props) {
    super();

    this.updateD3(props);
  }

  componentWillReceiveProps(newProps) {
    this.updateD3(newProps);
  }

  // eslint-disable-next-line class-methods-use-this
  updateD3({ data }) {
    const parseDate = d3.timeParse('%Y-%m-%d');
    const newData = data.map(d => ({ date: parseDate(d.date), value: d.value }));

    this.xScale = d3.scaleOrdinal().range([0, 500]).domain(newData.map(d => d.date));
    this.yScale = d3.scaleLinear().range([0, 500]).domain([0, d3.max(newData, d => d.value)]);

    // const xAxis = d3.svg.axis()
    //   .scale(x)
    //   .orient('bottom')
    //   .tickFormat(d3.time.format('%Y-%m'));

    // let yAxis = d3.svg.axis()
    //   .scale(y)
    //   .orient('left')
    //   .ticks(10);
  }

  makeBar(bar) {
    const props = {
      x: this.xScale(bar.date),
      y: 0,
      width: 40,
      height: this.yScale(bar.value)
    };

    return (
      <Bar {...props} />
    );
  }

  render() {
    // const translate = `translate(${this.props.x}, ${this.props.y})`;
    // const bars = this.histogram(this.props.data);
    const data = [];
    return (
      <LineChart width={400} height={400} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      </LineChart>
    );
  }
}

// <g className="histogram">
//         <g className="bars">
//           {bars.map(this.makeBar.bind(this))}
//         </g>
//         {/* <Axis x={this.props.axisMargin - 3} y={0} data={bars} scale={this.yScale} /> */}
//       </g>

export default Histogram;
