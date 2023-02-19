import React, { useState ,useEffect} from "react";
import axios from "axios";

import Header from "./components/Header";
import Graph from "./components/Graph";
import Prefecture_Select from "./components/Prefecture_Select";

import {
  Prefecture_Volumes_Interface,
  Prefceture_Interface,
  Single_Prefceture_Volumes_data_Interface,
  Single_Prefceture_Volumes_data_Interface_data,
} from "./Interfaces";

import "./App.css";

import { SeriesOptionsType } from "highcharts";

const axios_instance = axios.create({
  baseURL: "https://opendata.resas-portal.go.jp/api/v1",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "X-API-KEY": process.env.REACT_APP_API_KEY,
  },
  timeout: 2000,
});

const App = () => {
  {process.env.REACT_APP_API_TEST}
  const [Prefecture_Select_Values, Set_Prefecture_Select_Values] = useState<
    number[]
  >([]);
  const [Prefecture_Data, Set_Prefecture_Data] = useState<
    Prefceture_Interface[]
  >([]);
  const [Prefecture_Volumes, Set_Prefecture_Volumes] = useState<
    Prefecture_Volumes_Interface[]
  >([]);
  const [Prefecture_Volume_Series, Set_Prefecture_Volume_Series] = useState<
    SeriesOptionsType[]
  >([]);

  const [Load_Button_Visible, Set_Load_Button_Visible] =
    useState<boolean>(true);

  /**ロードボタンが押下された時の処理*/
  const Load_Button_Onclick = () => {
    Set_Load_Button_Visible(false);
    Get_Prefecture_Data();
  };

  /**県データ一覧を取得*/
  const Get_Prefecture_Data = () => {
    axios_instance
      .get("/prefectures")
      .then(function (response) {
        Set_Prefecture_Data(response.data.result);
        response.data.result.map((item: Prefceture_Interface) => {
          Get_Prefecture_Volume(item.prefCode, item.prefName);
        });
      })
      .catch(function () {
        Set_Load_Button_Visible(true);
      });
  };

  /**県の人口一覧を取得
   *
   * @param prefCode 県コード
   * @param prefName 県名
   */
  const Get_Prefecture_Volume = (prefCode: number, prefName: string) => {
    axios_instance
      .get("/population/composition/perYear", {
        params: {
          prefCode: prefCode,
          cityCode: "-",
        },
      })
      .then(function (response) {
        Set_Prefecture_Volumes((prev) => [
          ...prev,
          {
            prefCode: prefCode,
            prefName: prefName,
            data: Convert_Single_Volume_Data(response.data.result.data),
          },
        ]);
      })
      .catch(function () {
        Set_Load_Button_Visible(true);
      });
  };

  /**
   * チェックボックスが変更された際の処理
   */
  useEffect(() => {
    const graph_series: SeriesOptionsType[] = new Array<SeriesOptionsType>();
    Prefecture_Select_Values.map((val: number) => {
      const single_Prefecture_Volumes:
        | Prefecture_Volumes_Interface
        | undefined = Prefecture_Volumes.find((v) => v.prefCode === val);
      let single_series: SeriesOptionsType;
      if (single_Prefecture_Volumes) {
        single_series = {
          type: "line",
          name: single_Prefecture_Volumes.prefName,
          data: single_Prefecture_Volumes.data,
        };

        graph_series.push(single_series);
      }
    });
    Set_Prefecture_Volume_Series(graph_series);
  }, [Prefecture_Select_Values]);


  return (
    <div className="App">
      <Header />
      {Load_Button_Visible ? (
        <div className="load_button_container">
          <button
            onClick={() => {
              Load_Button_Onclick();
            }}
            className="load_button"
          >
            Load RESEAS
          </button>
        </div>
      ) : (
        ""
      )}
      <Prefecture_Select
        prfecture_list={Prefecture_Data}
        Prefecture_Select_Values={Prefecture_Select_Values}
        Set_Prefecture_Select_Values={Set_Prefecture_Select_Values}
      />
      <Graph graph_series={Prefecture_Volume_Series} />
    </div>
  );
};

/**1県の実行動態データのコンバートを行う関数*/
const Convert_Single_Volume_Data = (
  data: Single_Prefceture_Volumes_data_Interface[]
) => {
  const graph_data: number[][] = new Array<number[]>();
  const targetData = data.find(
    (v: Single_Prefceture_Volumes_data_Interface) => v.label === "総人口"
  );
  if (targetData) {
    targetData.data.map(
      (item: Single_Prefceture_Volumes_data_Interface_data) => {
        graph_data.push([item.year, item.value]);
      }
    );
  }
  return graph_data;
};

export default App;
