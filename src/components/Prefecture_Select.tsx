import React, { useState,Dispatch,SetStateAction,useEffect } from "react";
import Highcharts, {PointOptionsObject, SeriesOptionsType} from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface Prefceture_Interface {
  prefCode: number;
  prefName: string;
}

type Props = {
  prfecture_list: Prefceture_Interface[],
  Prefecture_Select_Values: number[],
  Set_Prefecture_Select_Values: Dispatch<SetStateAction<number[]>>,
  change_Prefecture_Select_Values: any,
};

const Prefecture_Select = (props : Props) => {

  const handleChange = (val : number) => {
    if (props.Prefecture_Select_Values.includes(val)) {
      props.Set_Prefecture_Select_Values(
        props.Prefecture_Select_Values.filter((checkedValue) => checkedValue !== val)
      );
    } else {
      props.Set_Prefecture_Select_Values([...props.Prefecture_Select_Values, val]);
    }    
  };

  useEffect(() => {
    props.change_Prefecture_Select_Values();
  }, [props.Prefecture_Select_Values]);

  return (
    <>
      {props.prfecture_list.map((item:Prefceture_Interface)=>
      {
        return(
          <label key={item.prefCode}>
            <input
              type="checkbox"
              name="inputNames"
              checked={props.Prefecture_Select_Values.includes(item.prefCode)}
              onChange={() => {handleChange(item.prefCode)}}
              value={item.prefCode}
            />
            {item.prefName}
          </label>
        );
      }
      )}
    </>
  );

}

export default Prefecture_Select;
