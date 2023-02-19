import React, { useRef } from "react";
import Highcharts, {PointOptionsObject, SeriesOptionsType} from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


type Props = {
  //graph_data: (number | [string | number, number | null] | PointOptionsObject | null)[] | undefined,
  graph_series: SeriesOptionsType[]
}

const Graph = (props : Props) => {

  const options: Highcharts.Options = {
    title: {
      text: "人口動態"
    },
    subtitle: {
      text: "Source: 内閣府 地方創生推進室"
    },
    yAxis: {
      title: {
        text: "人口"
      }
    },
    xAxis: {
      title: {
        text: "年度"
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
      }
    },
    series: props.graph_series
  };

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}/>
  );
}

export default Graph;
