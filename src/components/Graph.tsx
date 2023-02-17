import React, { useRef } from "react";
import Highcharts, {PointOptionsObject} from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


type Props = {
  graph_data: (number | [string | number, number | null] | PointOptionsObject | null)[] | undefined
}

const Graph = (props : Props) => {

  const options: Highcharts.Options = {
    title: {
      text: 'My chart'
    },
    series: [{
      type: 'line',
      data: props.graph_data
    },{
      type: 'line',
      data: [1, 2, 3]
    }]
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
