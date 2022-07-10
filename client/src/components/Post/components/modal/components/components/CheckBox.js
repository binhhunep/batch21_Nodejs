import { Checkbox } from "antd";
import React, { useState } from "react";

const CheckBox = ({ title, onClick, checked }) => {
  const onChange = (e) => {
    onClick(e.target.value);
  };

  return (
    <>
      <Checkbox checked={checked} onChange={(e) => onChange(e)} value={title}>
        {title}
      </Checkbox>
    </>
  );
};

export default CheckBox;
