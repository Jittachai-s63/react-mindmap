import cx from "classnames";
import { iconClassName } from "@blink-mind/renderer-react";
import React from "react";

import { useNavigate } from "react-router-dom"; 

export function ToolbarItemPresent(props) {
  let navigate = useNavigate()
  console.log(props)

  function  onClickPreviewSlide() {
    console.log(props) 

    navigate("/present", { state : props } )
    
  }

  return (
    <div 
    className={cx("bm-toolbar-item", iconClassName("export"))} 
    title="Present"
    onClick= {() => {onClickPreviewSlide()} }
    />
  );
}
