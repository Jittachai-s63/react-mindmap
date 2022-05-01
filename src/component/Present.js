import { Presentation, Slide, Text, Shape, Image, Line } from "react-pptx";

import Preview from "react-pptx/preview";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { DragScrollWidget } from "@blink-mind/renderer-react";

export default function Present(props) {
  let data = useLocation().state;
  console.log(data.Root);

  const DFS = async (cur, Allnode) => {
    if (cur.child.length === 0) {
      return;
    } else {
      let text = [];
      for (let i = 0; i < cur.child.length; i++) {
        let next = cur.child[i];
        for (let j = 0; j < Allnode.length; j++) {
          if (next === Allnode[j].key) {
            text.push(Allnode[j].topic.replaceAll("\n", ""));
            DFS(Allnode[j], Allnode, j);
          }
        }
      }
      console.log(cur.topic);
      console.log(text);
    }
  };

  DFS(data.Root, data.Allnode);

  return (
    <div>
      <Preview>
        <Presentation>
          <Slide style={{ backgroundColor: "#FFCC66" }}>
            <Text
              style={{
                x: 3,
                y: 1,
                w: 3,
                h: 0.5,
                fontSize: 32,
                bold: true,
              }}
            >
              {data.Root.topic}
            </Text>
          </Slide>
          <Slide style={{ backgroundColor: "#DDDDDD" }}>
            <Text style={{ x: 3, y: 1, w: 3, h: 0.5, fontSize: 32 }}>
              <Text.Bullet>Adding bullet 1</Text.Bullet>
              <Text.Bullet>Adding bullet 2</Text.Bullet>
            </Text>
            <Text style={{ x: 3, y: 3.5, w: 3, h: 0.5, fontSize: 32 }}>
              <Text.Bullet type="number">Adding bullet</Text.Bullet>
              <Text.Bullet type="number">Adding bullet</Text.Bullet>
            </Text>
          </Slide>
          <Slide>
            <Image
              src={{
                kind: "path",
                path: "https://source.unsplash.com/random/800x600",
              }}
              style={{ x: "10%", y: "10%", w: "80%", h: "80%" }}
            />
          </Slide>
          {[1, 2, 3].map((n) => (
            <Slide key={n}>
              <Text style={{ x: "50%", y: "50%", w: 1, h: 0.2 }}>
                slide {n}
              </Text>
            </Slide>
          ))}
          <>
            {[1, 2, 3].map((n) => (
              <Slide key={n}>
                <Text style={{ x: "50%", y: "50%", w: 1, h: 0.2 }}>
                  fragment slide {n}
                </Text>
              </Slide>
            ))}
          </>
        </Presentation>
      </Preview>
    </div>
  );
}
