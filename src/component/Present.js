import { Presentation, Slide, Text } from "react-pptx";

import Preview from "react-pptx/preview";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Present(props) {
  let data = JSON.parse(localStorage.getItem("present"));

  var slidearray = [];

  const DFS = async (cur, Allnode, loc) => {
    if (cur.child.length === 0) {
      return;
    } else {
      let manytext = false;
      let manybullet;
      let curslide = (
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
            {findchile()}
          </Text>
        </Slide>
      );
      function findchile() {
        let text = [];
        for (let i = 0; i < cur.child.length; i++) {
          let next = cur.child[i];
          for (let j = 0; j < Allnode.length; j++) {
            if (next === Allnode[j].key) {
              let curtext = Allnode[j].topic.replaceAll("\n", "");
              if (curtext.length > 800) {
                text.push(
                  <Text.Bullet>{curtext.substring(0, 800)}</Text.Bullet>
                );
                manytext = curtext.substring(800);
              } else {
                text.push(<Text.Bullet>{curtext}</Text.Bullet>);
              }
            }
          }
        }
        if (text.length < 9) {
          return text;
        } else {
          manybullet = text.slice(8);
          return text.slice(0, 8);
        }
      }
      slidearray.push(curslide);
      if (manytext) {
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
              {cur.topic} ต่อ
            </Text>
            <Text style={{ x: 1, y: 1, w: 7, h: 0.5, fontSize: 14 }}>
              <Text.Bullet>{manytext}</Text.Bullet>
            </Text>
          </Slide>
        );
      }

      for (let i = 0; i < cur.child.length; i++) {
        let next = cur.child[i];
        for (let j = 0; j < Allnode.length; j++) {
          if (next === Allnode[j].key) {
            DFS(Allnode[j], Allnode);
          }
        }
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
                align: "center",
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