import cx from "classnames";
import { iconClassName } from "@blink-mind/renderer-react";
import { Menu, MenuDivider, MenuItem, Popover } from "@blueprintjs/core";
import React from "react";
// import pptxgen from "pptxgenjs";
import { downloadFile } from "../../utils";

// let pres = new pptxgen();

export function ToolbarItemConvert(props) {
  const test = (cur, alldata) => {
    if (cur.child.length == 0) {
      //console.log(cur.topic);
      return;
    } else {
      // let slide = pres.addSlide();
      // slide.addText(cur.topic, {
      //   x: 1.5,
      //   y: 1.5,
      //   color: "363636",
      //   fill: { color: "F1F1F1" },
      //   align: pres.AlignH.center,
      // });
      console.log(cur.topic);
      for (let i = 0; i < cur.child.length; i++) {
        let next = cur.child[i];
        for (let j = 0; j < alldata.length; j++) {
          if (next == alldata[j].key) {
            console.log(alldata[j].topic);
          }
        }
      }
      for (let i = 0; i < cur.child.length; i++) {
        let next = cur.child[i];
        for (let j = 0; j < alldata.length; j++) {
          if (next == alldata[j].key) {
            test(alldata[j], alldata);
          }
        }
      }
    }
  };

  const onClickExportJson = (e) => {
    const { diagram } = props;
    const diagramProps = diagram.getDiagramProps();
    const { controller } = diagramProps;

    const json = controller.run("serializeModel", diagramProps);
    const data = json.topics;

    let alldata = [];
    let newjson = { topic: "", child: [] };
    for (let i = 0; i < data.length; i++) {
      let ndata = JSON.stringify(data[i]);
      ndata = JSON.parse(ndata);
      if (data[i].parentKey == null) {
        newjson.topic = ndata.blocks[0].data;
        newjson.child = ndata.subKeys;
      } else {
        let temp = { topic: "", child: [], key: "" };
        temp.topic = ndata.blocks[0].data;
        temp.child = ndata.subKeys;
        temp.key = ndata.key;
        alldata.push(temp);
      }
    }
    test(newjson, alldata);

    //console.log(alldata);
  };

  return (
    <div className={cx("bm-toolbar-item", iconClassName("export"))}>
      <Popover enforceFocus={false}>
        <div className="bm-toolbar-popover-target" />
        <Menu>
          <MenuItem text="SLIDE" onClick={onClickExportJson} />
          <MenuDivider />
        </Menu>
      </Popover>
    </div>
  );
}
