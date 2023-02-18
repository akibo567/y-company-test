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
      text: 'My chart'
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
