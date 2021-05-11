import React from "react";
import { generateNowDateString } from "../../../functions/common";

const NowDate: React.FC = () => {
  const date = generateNowDateString();
  return (
    <div>
      <div>{date}</div>
    </div>
  );
};

export default NowDate;
