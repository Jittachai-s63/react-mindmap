import cx from "classnames";
import { iconClassName } from "@blink-mind/renderer-react";
import { Menu, MenuDivider, MenuItem, Popover } from "@blueprintjs/core";
import React from "react";
import pptxgen from "pptxgenjs";
import { downloadFile } from "../../utils";

export function ToolbarItemExport(props) {
  let pres = new pptxgen();
  const onClickExportJson = (e) => {
    const { diagram } = props;
    const diagramProps = diagram.getDiagramProps();
    const { controller, model } = diagramProps;

    const json = controller.run("serializeModel", diagramProps);
    const jsonStr = JSON.stringify(json);
    const url = `data:text/plain,${encodeURIComponent(jsonStr)}`;
    const title = controller.run("getTopicTitle", {
      ...diagramProps,
      topicKey: model.rootTopicKey,
    });
    downloadFile(url, `${title}.json`);
  };

  const DFS = (cur, Allnode, loc) => {
    if (cur.child.length == 0) {
      return;
    } else {
      let slide = pres.addSlide();
      slide.addText(cur.topic, {
        x: 1.5,
        y: 1.5,
        color: "363636",
        fill: { color: "F1F1F1" },
        align: pres.AlignH.center,
      });
      //console.log(cur.topic);
      let text = [];
      for (let i = 0; i < cur.child.length; i++) {
        let next = cur.child[i];
        for (let j = 0; j < Allnode.length; j++) {
          if (next == Allnode[j].key) {
            //console.log(Allnode[j].topic);
            text.push(Allnode[j].topic);
          }
        }
      }
      slide.addText(text.toString(), {
        x: 1.5,
        y: 2.5,
        color: "363636",
        fill: { color: "F1F1F1" },
        align: pres.AlignH.center,
      });
      for (let i = 0; i < cur.child.length; i++) {
        let next = cur.child[i];
        for (let j = 0; j < Allnode.length; j++) {
          if (next == Allnode[j].key) {
            DFS(Allnode[j], Allnode, j);
          }
        }
      }
    }
  };

  const onClickExportSlide = (e) => {
    const { diagram } = props;
    const diagramProps = diagram.getDiagramProps();
    const { controller } = diagramProps;

    const json = controller.run("serializeModel", diagramProps);
    const data = json.topics;

    let Allnode = [];

    let Root = { topic: "", child: [] };
    for (let i = 0; i < data.length; i++) {
      let Node = JSON.stringify(data[i]);
      Node = JSON.parse(Node);
      if (data[i].parentKey == null) {
        Root.topic = Node.blocks[0].data;
        Root.child = Node.subKeys;
      } else {
        let temp = { topic: "", child: [], key: "" };
        temp.topic = Node.blocks[0].data;
        temp.child = Node.subKeys;
        temp.key = Node.key;
        Allnode.push(temp);
      }
    }
    let slide = pres.addSlide();
    slide.addText(Root.topic, {
      x: 1.5,
      y: 1.5,
      color: "363636",
      fill: { color: "F1F1F1" },
      align: pres.AlignH.center,
    });
    DFS(Root, Allnode, 0);
    pres.writeFile({ fileName: Root.topic + ".pptx" });
  };

  return (
    <div className={cx("bm-toolbar-item", iconClassName("export"))}>
      <Popover enforceFocus={false}>
        <div className="bm-toolbar-popover-target" />
        <Menu>
          <MenuItem text="JSON(.json)" onClick={onClickExportJson} />
          <MenuItem text="IMAGE(.pdf)" />
          <MenuDivider />
          <MenuItem text="SLIDE(.pptx)" onClick={onClickExportSlide} />
        </Menu>
      </Popover>
    </div>
  );
}
