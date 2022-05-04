import cx from "classnames";
import { iconClassName } from "@blink-mind/renderer-react";
import { Menu, MenuDivider, MenuItem, Popover } from "@blueprintjs/core";
import React from "react";
import pptxgen from "pptxgenjs";
import { downloadFile } from "../../utils";
import Popup from "reactjs-popup"
import Content from "./Content.js";
import "./modal.css";


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
    //retuen when it is a leaf
    if (cur.child.length === 0) {
      return;
    } else {
      // add root to title slide
      let slide = pres.addSlide();
      slide.addText(cur.topic, {
        x: 1.5,
        y: 0.5,
        fontSize: 20,
        bold: true,
        color: "363636",
        align: pres.AlignH.top,
      });

      let text = [];
      for (let i = 0; i < cur.child.length; i++) {
        let next = cur.child[i];
        //find child in list
        for (let j = 0; j < Allnode.length; j++) {
          if (next === Allnode[j].key) {
            //text is more than 800
            if (Allnode[j].topic.length > 800) {
              text.push(Allnode[j].topic.replaceAll("\n", "").substring(800));
              // create another slide to add text
              let subslide = pres.addSlide();
              subslide.addText(cur.topic + "(ต่อ)", {
                x: 1.5,
                y: 0.5,
                fontSize: 20,
                bold: true,
                color: "363636",
                align: pres.AlignH.top,
              });
              subslide.addText(text.toString().replaceAll(",", "\n"), {
                x: 1.5,
                y: 2.5,
                color: "363636",
                align: pres.AlignH.left,
                softBreakBefore: true,
              });

              text = [];
              text.push(
                Allnode[j].topic.replaceAll("\n", "").substring(0, 800)
              );
            } else {
              //text is less than 800
              text.push(Allnode[j].topic.replaceAll("\n", ""));
            }
            //Depth-first search
            DFS(Allnode[j], Allnode, j);
          }
        }
      }
      //add text to detail slide
      slide.addText(
        text
          .slice(0, 9)
          .toString()
          .replaceAll(",", "\n"),
        {
          x: 1.5,
          y: 2.5,
          color: "363636",
          align: pres.AlignH.left,
          bullet: true,
          softBreakBefore: true,
        }
      );
      //create another slide to add text when have more then 9 topic
      if (text.length > 9) {
        let subslide = pres.addSlide();
        subslide.addText(cur.topic + "(ต่อ)", {
          x: 1.5,
          y: 0.5,
          fontSize: 20,
          bold: true,
          color: "363636",
          align: pres.AlignH.top,
        });
        subslide.addText(
          text
            .slice(9)
            .toString()
            .replaceAll(",", "\n"),
          {
            x: 1.5,
            y: 2.5,
            color: "363636",
            align: pres.AlignH.left,
            bullet: true,
            softBreakBefore: true,
          }
        );
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
      // find root node
      if (data[i].parentKey == null) {
        Root.topic = Node.blocks[0].data;
        Root.child = Node.subKeys;
      } else {
        // add another node in list
        let temp = { topic: "", child: [], key: "" };
        temp.topic = Node.blocks[0].data;
        temp.child = Node.subKeys;
        temp.key = Node.key;
        Allnode.push(temp);
      }
    }
    //create first slide
    let slide = pres.addSlide();
    slide.addText(Root.topic, {
      x: 1.5,
      y: 2.5,
      color: "#363636",
      fill: { color: "F1F1F1" },
      align: pres.AlignH.center,
    });
    //Depth-first search
    DFS(Root, Allnode, 0);
    pres.writeFile({ fileName: Root.topic + ".pptx" });
  };

  return (
    <div
      className={cx("bm-toolbar-item", iconClassName("export"))}
      title="Export"
    >
      <Popover enforceFocus={false}>
        <div className="bm-toolbar-popover-target" />
        <Menu>
          <MenuItem text="JSON(.json)" onClick={onClickExportJson} />
          <MenuItem text="IMAGE(.pdf)" />
          <MenuDivider />
          <Popup modal trigger={<MenuItem text="SLIDE(.pptx)"/>}>
            {close => < Content close={close} /> }
          </Popup>
        </Menu>
      </Popover>
    </div>
  );
}
