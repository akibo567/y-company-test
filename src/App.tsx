import React, {useState} from "react";
import Graph from "./components/Graph"
import Prefecture_Select from "./components/Prefecture_Select"

import "./App.css";

import {PointOptionsObject, SeriesOptionsType} from 'highcharts';

import Dummy_Prefecture from "./dummy_prefecture.json";
import Dummy_Volume from "./dummy_volume.json";

const App = () => {
  const [Prefecture_Select_Values, Set_Prefecture_Select_Values] = useState<number[]>([]);

  return (
    <div className="App">
      {Prefecture_Select_Values}
      <Prefecture_Select
        prfecture_list={Dummy_Prefecture.result}
        Prefecture_Select_Values={Prefecture_Select_Values}
        Set_Prefecture_Select_Values={Set_Prefecture_Select_Values}
      />
      <Graph
        //graph_data={Dummy_Volume.result.data}
        graph_series={Convert_Volume_Data(Dummy_Volume)}
      />
    </div>
  );
}

//1県の実行動態データのコンバートを行う関数
const Convert_Single_Volume_Data = (data:any) =>{
  const graph_data: number[][] = new Array<number[]>();
  const targetData = data.find((v:any) => v.label === "総人口");
  targetData.data.map((item:any)=>{
    graph_data.push([item.year,item.value]);
  });

  return graph_data;
}

//複数県の実行動態データをグラフデータの形に変更する関数
const Convert_Volume_Data = (data:any) =>{
  const graph_series: SeriesOptionsType[] = new Array<SeriesOptionsType>();
  const single_series: SeriesOptionsType = {
    type: 'line',
    data: Convert_Single_Volume_Data(data.result.data)
  };

  graph_series.push(single_series);

  return graph_series;
}

export default App;
