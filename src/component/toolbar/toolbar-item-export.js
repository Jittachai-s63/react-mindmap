import cx from "classnames";
import { iconClassName } from "@blink-mind/renderer-react";
import { Menu, MenuDivider, MenuItem, Popover } from "@blueprintjs/core";
import React from "react";
import pptxgen from "pptxgenjs";
import { downloadFile } from "../../utils";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import "./modal.css";

export function ToolbarItemExport(props) {
  let pres = new pptxgen();
  let Allnode = [];
  let Root = { topic: "", child: [] };

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

  const getdata = () => {
    Allnode = [];
    const { diagram } = props;
    const diagramProps = diagram.getDiagramProps();
    const { controller } = diagramProps;

    const json = controller.run("serializeModel", diagramProps);
    const data = json.topics;

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
          <Link
            to="/selectpresent"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              localStorage.setItem(
                "selectpresent",
                JSON.stringify({ Root: Root, Allnode: Allnode })
              )
            }
          >
            <MenuItem text="SLIDE(.pptx)" onClick={getdata} />
          </Link>
        </Menu>
      </Popover>
    </div>
  );
}
