import React, { useState,useEffect } from "react";

import frame_1 from "./markzip/frame_1.png";
import frame_2 from "./markzip/frame_2.png";
import frame_3 from "./markzip/frame_3.png";
import frame_4 from "./markzip/frame_4.png";
import frame_5 from "./markzip/frame_5.png";
import frame_6 from "./markzip/frame_6.png";
import frame_7 from "./markzip/frame_7.png";
import frame_8 from "./markzip/frame_8.png";
import frame_9 from "./markzip/frame_9.png";
import frame_10 from "./markzip/frame_10.png";
import frame_11 from "./markzip/frame_11.png";
import frame_12 from "./markzip/frame_12.png";
import frame_13 from "./markzip/frame_13.png";
import frame_14 from "./markzip/frame_14.png";
import frame_15 from "./markzip/frame_15.png";
import frame_16 from "./markzip/frame_16.png";
import frame_17 from "./markzip/frame_17.png";
import frame_18 from "./markzip/frame_18.png";
import frame_19 from "./markzip/frame_19.png";
import frame_20 from "./markzip/frame_20.png";
import frame_21 from "./markzip/frame_21.png";
import frame_22 from "./markzip/frame_22.png";
import frame_23 from "./markzip/frame_23.png";
import frame_24 from "./markzip/frame_24.png";
import frame_25 from "./markzip/frame_25.png";
import frame_26 from "./markzip/frame_26.png";
import frame_27 from "./markzip/frame_27.png";
import frame_28 from "./markzip/frame_28.png";
import frame_29 from "./markzip/frame_29.png";
import frame_30 from "./markzip/frame_30.png";
import frame_31 from "./markzip/frame_31.png";
import frame_32 from "./markzip/frame_32.png";
import frame_33 from "./markzip/frame_33.png";
import frame_34 from "./markzip/frame_34.png";
import frame_35 from "./markzip/frame_35.png";
import frame_36 from "./markzip/frame_36.png";
import frame_37 from "./markzip/frame_37.png";
import frame_38 from "./markzip/frame_38.png";
import frame_39 from "./markzip/frame_39.png";
import frame_40 from "./markzip/frame_40.png";
import frame_41 from "./markzip/frame_41.png";
import frame_42 from "./markzip/frame_42.png";
import frame_43 from "./markzip/frame_43.png";
import frame_44 from "./markzip/frame_44.png";
import frame_45 from "./markzip/frame_45.png";
import frame_46 from "./markzip/frame_46.png";
import frame_47 from "./markzip/frame_47.png";
import frame_48 from "./markzip/frame_48.png";
import frame_49 from "./markzip/frame_49.png";
import frame_50 from "./markzip/frame_50.png";
import frame_51 from "./markzip/frame_51.png";
import frame_52 from "./markzip/frame_52.png";
import frame_53 from "./markzip/frame_53.png";
import frame_54 from "./markzip/frame_54.png";
import frame_55 from "./markzip/frame_55.png";
import frame_56 from "./markzip/frame_56.png";
import frame_57 from "./markzip/frame_57.png";
import frame_58 from "./markzip/frame_58.png";
import frame_59 from "./markzip/frame_59.png";
import frame_60 from "./markzip/frame_60.png";
import frame_61 from "./markzip/frame_61.png";
import frame_62 from "./markzip/frame_62.png";
import frame_63 from "./markzip/frame_63.png";
import frame_64 from "./markzip/frame_64.png";
import frame_65 from "./markzip/frame_65.png";
import frame_66 from "./markzip/frame_66.png";
import frame_67 from "./markzip/frame_67.png";
import frame_68 from "./markzip/frame_68.png";
import frame_69 from "./markzip/frame_69.png";
import frame_70 from "./markzip/frame_70.png";
import frame_71 from "./markzip/frame_71.png";
import frame_72 from "./markzip/frame_72.png";
import frame_73 from "./markzip/frame_73.png";
import frame_74 from "./markzip/frame_74.png";
import frame_75 from "./markzip/frame_75.png";




const imagePaths = [
  frame_1,
  frame_2,
  frame_3,
  frame_4,
  frame_5,
  frame_6,
  frame_7,
  frame_8,
  frame_9,
  frame_10,
  frame_11,
  frame_12,
  frame_13,
  frame_14,
  frame_15,
  frame_16,
  frame_17,
  frame_18,
  frame_19,
  frame_20,
  frame_21,
  frame_22,
  frame_23,
  frame_24,
  frame_25,
  frame_26,
  frame_27,
  frame_28,
  frame_29,
  frame_30,
  frame_31,
  frame_32,
  frame_33,
  frame_34,
  frame_35,
  frame_36,
  frame_37,
  frame_38,
  frame_39,
  frame_40,
  frame_41,
  frame_42,
  frame_43,
  frame_44,
  frame_45,
  frame_46,
  frame_47,
  frame_48,
  frame_49,
  frame_50,
  frame_51,
  frame_52,
  frame_53,
  frame_54,
  frame_55,
  frame_56,
  frame_57,
  frame_58,
  frame_59,
  frame_60,
  frame_61,
  frame_62,
  frame_63,
  frame_64,
  frame_65,
  frame_66,
  frame_67,
  frame_68,
  frame_69,
  frame_70,
  frame_71,
  frame_72,
  frame_73,
  frame_74,
  frame_75
];

const FrameChanger = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // 이미지 변환 타이머
  useEffect(() => {
    let interval = null;

    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
      }, 1000 / 30); 
    } else {
      setCurrentImageIndex(imagePaths.length - 1);
    }

    return () => clearInterval(interval); // 컴포넌트가 언마운트되면 타이머 정리
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div>
      <img
        src={imagePaths[currentImageIndex]}
        alt={`Image ${currentImageIndex + 1}`}
        style={{ width: "500px", height: "300px" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
};

export default FrameChanger;