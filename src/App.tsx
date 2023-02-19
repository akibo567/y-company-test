import React, {useState} from "react";
import axios from "axios";

import Graph from "./components/Graph"
import Prefecture_Select from "./components/Prefecture_Select"

import "./App.css";

import {PointOptionsObject, SeriesOptionsType} from 'highcharts';

import Dummy_Prefecture from "./dummy_prefecture.json";
import Dummy_Volume from "./dummy_volume.json";


interface Prefecture_Volumes_Interface {
  prefCode: number;
  prefName: string;
  data: number[][];
}


const axios_instance = axios.create({
  baseURL: "https://opendata.resas-portal.go.jp/api/v1",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "X-API-KEY": process.env.REACT_APP_API_KEY
  },
  timeout: 2000,
});



const App = () => {
  const [Prefecture_Select_Values, Set_Prefecture_Select_Values] = useState<number[]>([]);
  const [Prefecture_Data, Set_Prefecture_Data] = useState<any>([]);
  const [Prefecture_Volumes, Set_Prefecture_Volumes] = useState<Prefecture_Volumes_Interface[]>([]);
  const [Prefecture_Volume_Series, Set_Prefecture_Volume_Series] = useState<SeriesOptionsType[]>([]);



  const Get_Prefecture_Data = () =>{
    axios_instance.get('/prefectures')
      .then(function (response) {
        Set_Prefecture_Data(response.data.result);
        response.data.result.map((item:any)=>{
          Get_Prefecture_Volume(item.prefCode, item.prefName);
        }
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const Get_Prefecture_Volume = (prefCode: number,prefName: string) =>{
    axios_instance.get('/population/composition/perYear', {
      params: {
        prefCode: prefCode,
        cityCode: "-"
      }
    })
      .then(function (response) {
        Set_Prefecture_Volumes((prev) =>[...prev,
          {prefCode: prefCode,
            prefName: prefName,
            data:
              Convert_Single_Volume_Data(response.data.result.data)
          }
        ]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const change_Prefecture_Select_Values = ()=>{
    const graph_series: SeriesOptionsType[] = new Array<SeriesOptionsType>();
    Prefecture_Select_Values.map((val:number)=>{
      const single_Prefecture_Volumes : Prefecture_Volumes_Interface | undefined = 
        Prefecture_Volumes.find((v) => v.prefCode === val);
      let single_series: SeriesOptionsType;
      if(single_Prefecture_Volumes){
        console.log(val);

        single_series = {
          type: 'line',
          data: single_Prefecture_Volumes.data
        };

        graph_series.push(single_series);
      }
    });
    Set_Prefecture_Volume_Series(graph_series);
  };


  return (
    <div className="App">
      <button onClick={()=>{Get_Prefecture_Data()}}>
        Load RESEAS
      </button>
      <Prefecture_Select
        prfecture_list={Prefecture_Data}
        Prefecture_Select_Values={Prefecture_Select_Values}
        Set_Prefecture_Select_Values={Set_Prefecture_Select_Values}
        change_Prefecture_Select_Values={change_Prefecture_Select_Values}
      />
      <Graph
        //graph_data={Dummy_Volume.result.data}
        graph_series={Prefecture_Volume_Series}
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
const Set_Prefecture_Volume_Series = (data:any) =>{
  const graph_series: SeriesOptionsType[] = new Array<SeriesOptionsType>();
  const single_series: SeriesOptionsType = {
    type: 'line',
    data: Convert_Single_Volume_Data(data.result.data)
  };

  graph_series.push(single_series);

  return graph_series;
}

export default App;
