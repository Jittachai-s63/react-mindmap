import { Presentation, Slide, Text } from "react-pptx";

import Preview from "react-pptx/preview";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";


export default function Present(props) {
  let data = JSON.parse(localStorage.getItem('present'))
 
  var slidearray = [];
  const DFS = async (cur, Allnode, loc) => {
    //retuen when it is a leaf

    if (cur.child.length === 0) {
      return;
    } else {
      // add root to title slide
      slidearray.push(
        <Slide style={{ backgroundColor: "#DDDDDD" }}>
          <Text
            style={{
              x: 1,
              y: 0.5,
              w: 3,
              color: "#363636",
              fill: { color: "F1F1F1" },
            }}
          >
            {cur.topic}
          </Text>
          <Text style={{ x: 1, y: 1, w: 7, h: 0.5, fontSize: 14 }}>
            {set()}
          </Text>
        </Slide>
      )
      function set() {
        var detailarray = [];
        for (let i = 0; i < cur.child.length; i++) {
          let next = cur.child[i];
          //find child in list
          for (let j = 0; j < Allnode.length; j++) {
            if (next === Allnode[j].key) {
              //text is more than 800
              if (Allnode[j].topic.length > 800) {
                detailarray.push(<Text.Bullet>{Allnode[j].topic.replaceAll("\n", "").substring(0,800)}</Text.Bullet>)
                slidearray.push(
                  <Slide style={{ backgroundColor: "#DDDDDD" }}>
                    <Text
                      style={{
                        x: 1,
                        y: 0.5,
                        w: 9,
                        color: "#363636",
                        fill: { color: "F1F1F1" },
                      }}
                    >
                      {cur.topic} ต่อ
                    </Text>
                    <Text style={{ x: 1, y: 1, w: 7, h: 0.5, fontSize: 14 }}>
                      <Text.Bullet>{Allnode[j].topic.replaceAll("\n", "").substring(800)}</Text.Bullet>
                    </Text>
                  </Slide>
                )
              } else {
                //text is less than 800
                detailarray.push(<Text.Bullet>{Allnode[j].topic}</Text.Bullet>)
              }
              //Depth-first search
              DFS(Allnode[j], Allnode, j);
            }
          }
        }
        return detailarray
      }
    }
  };
  DFS(data.Root, data.Allnode);
  return (
    <div>
      <Preview>
        <Presentation>
          <Slide>
            <Text
              style={{
                x: 2.5,
                y: 2.5,
                w: 5,
                color: "#363636",
                fill: { color: "F1F1F1" },
                align: 'center',
              }}
            >
              {data.Root.topic}
            </Text>
          </Slide>
          {slidearray}
        </Presentation>
      </Preview>
    </div>
  );
}
