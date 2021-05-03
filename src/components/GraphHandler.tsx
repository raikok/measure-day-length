import { Line } from "react-chartjs-2";

export default function GraphHandler(props: any) {
  const labels: string[] = [];
  const dataArr: number[] = [];
  props.dayLengthArray.forEach((day: any) => {
    labels.push(day.date);
    dataArr.push(day.comparison);
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of hours",
        data: dataArr,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          layout: {
              padding: {
                  bottom: 200,
                  top: 0
              }
          }
        },
      ],
    },
  };

  return <Line data={data} options={options} />
}
