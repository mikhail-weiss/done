import React from 'react';
import { PropTypes as type } from 'prop-types';
import {
  LineChart, Line, XAxis, Tooltip, CartesianGrid
} from 'recharts';
import { scaleLog } from 'd3-scale';

const scale = scaleLog().base(Math.E).domain([0, 10000]);

const Linechart = ({ data }) => (
  <LineChart width={300} height={100} data={data}>
    <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
    <XAxis scale={scale} dataKey="date" />
    <CartesianGrid strokeDasharray="3 3" />
    <Tooltip />

  </LineChart>
);

Linechart.propTypes = {
  data: type.arrayOf(type.shape({
    date: type.string.isRequired,
    value: type.number.isRequired
  })).isRequired
};

export default Linechart;
