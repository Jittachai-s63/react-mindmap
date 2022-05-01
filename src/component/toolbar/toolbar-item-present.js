import cx from "classnames";
import { iconClassName } from "@blink-mind/renderer-react";
import React from "react";

import { useNavigate, Link } from "react-router-dom";

export function ToolbarItemPresent(props) {
  let Allnode = [];
  let Root = { topic: "", child: [] };

  const getData = () => {
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

    console.log(Root);
    console.log(Allnode);
  };

  return (
    <Link to="/present" state={{ Root: Root, Allnode: Allnode }}>
      <div
        className={cx("bm-toolbar-item", iconClassName("export"))}
        title="Present"
        onClick={getData}
      ></div>
    </Link>
  );
}
