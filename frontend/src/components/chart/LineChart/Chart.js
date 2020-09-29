import React, { Component } from "react";
import { Line } from "react-chartjs-2";

export class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: [
          "Investido no momento",
          "Á receber",
          "Valor reinvestido",
          "Valor retirado",
        ],
        datasets: [
          {
            label: "Investimento mensal",
            data: [50, 100, 200, 150, 220],
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 5,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
          },
        ],
      },
    };
  }

  render() {
    return (
      <div className="chart">
        <Line
          data={this.state.chartData}
          width={600}
          height={400}
          type={Line}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    );
  }
}

export default Chart;
