// 택시 취소 버튼

import React from "react";
import Image from "../Image/Image";
import { ButtonCancle } from "../../assets/image";

const CancleButton = ({ onClick }) => {
  return (
    <div onClick={onClick} style={{ cursor: "pointer" }}>
      {/* 지도 */}
      
      <Image src={ButtonCancle} />
    </div>
  );
};

export default CancleButton;
