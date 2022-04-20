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

  const DFS = async (cur, Allnode, loc) => {
    if (cur.child.length == 0) {
      return;
    } else {
      let slide = pres.addSlide();
      slide.addText(cur.topic, {
        x: 1.5,
        y: 0.5,
        fontSize: 20,
        bold: true,
        color: "363636",
        align: pres.AlignH.top,
      });
      //console.log(cur.topic);
      let text = [];
      for (let i = 0; i < cur.child.length; i++) {
        let next = cur.child[i];
        for (let j = 0; j < Allnode.length; j++) {
          if (next == Allnode[j].key) {
            if (Allnode[j].topic.length > 800){
              text.push(Allnode[j].topic.replaceAll("\n", "").substring(800));

              let subslide = pres.addSlide();
              subslide.addText(cur.topic+"(ต่อ)", {
                x: 1.5,
                y: 0.5,
                fontSize: 20,
                bold: true,
                color: "363636",
                align: pres.AlignH.top,
              });
              subslide.addText(text.toString().replaceAll("," , "\n"), {
                x: 1.5,
                y: 2.5,
                color: "363636",
                align: pres.AlignH.left,
                softBreakBefore: true,
              });
              text = [];
              text.push(Allnode[j].topic.replaceAll("\n", "").substring(0,800));

              DFS(Allnode[j], Allnode, j);
            }
            else{
              text.push(Allnode[j].topic.replaceAll("\n", ""));
              DFS(Allnode[j], Allnode, j);
            }
          }
        }
      }
      slide.addText(text.toString().replaceAll("," , "\n"), {
        x: 1.5,
        y: 2.5,
        color: "363636",
        align: pres.AlignH.left,
        bullet: true,
        softBreakBefore: true,
      });
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
