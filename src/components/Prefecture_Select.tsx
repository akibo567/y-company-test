import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Prefceture_Interface } from "../Interfaces";

type Props = {
  prfecture_list: Prefceture_Interface[];
  Prefecture_Select_Values: number[];
  Set_Prefecture_Select_Values: Dispatch<SetStateAction<number[]>>;
};

/**県選択チェックボックスが入るコンテナ */
const Prefecture_Select = (props: Props) => {
  const handleChange = (val: number) => {
    if (props.Prefecture_Select_Values.includes(val)) {
      props.Set_Prefecture_Select_Values(
        props.Prefecture_Select_Values.filter(
          (checkedValue) => checkedValue !== val
        )
      );
    } else {
      props.Set_Prefecture_Select_Values([
        ...props.Prefecture_Select_Values,
        val,
      ]);
    }
  };

  return (
    <>
      <div className="prefecture_checkbox_container">
        {props.prfecture_list.map((item: Prefceture_Interface) => {
          return (
            <div key={item.prefCode} className="prefecture_checkbox_label">
              <input
                type="checkbox"
                name="inputNames"
                className="prefecture_checkbox"
                checked={props.Prefecture_Select_Values.includes(item.prefCode)}
                onChange={() => {
                  handleChange(item.prefCode);
                }}
                value={item.prefCode}
              />
              <div className="label_text">{item.prefName}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Prefecture_Select;
