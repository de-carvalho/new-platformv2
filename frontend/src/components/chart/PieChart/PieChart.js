import React from 'react';
import { Pie } from 'react-chartjs-2';


export default function ChartPie(props) {
  const data = {
    labels: props.labels,
    datasets: [{
      data: props.data,
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#cc65fe',
        '#456723'
      ],
    }]
  };

  return (
    <div style={{ width: '60%' }}>
      <Pie data={data} />
    </div>
  )
}