import { Presentation, Slide, Text } from "react-pptx";

import Preview from "react-pptx/preview";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";


export default function Present(props) {
  let data = useLocation().state;
  console.log(data);
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
                detailarray.push(<Text.Bullet>{Allnode[j].topic.substring(0,800)}</Text.Bullet>)
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
                      <Text.Bullet>{Allnode[j].topic.substring(800)}</Text.Bullet>
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
        //add text to detail slide
        // detailarray.push(<Text.Bullet>{Allnode[j].topic}</Text.Bullet>) 
        //create another slide to add text when have more then 9 topic
        return detailarray
      }
    }
    console.log(slidearray)
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

          {/* <Slide style={{ backgroundColor: "#DDDDDD" }}>
            <Text style={{ x: 3, y: 1, w: 3, h: 0.5, fontSize: 32 }}>
              <Text.Bullet>Adding bullet 1</Text.Bullet>
              <Text.Bullet>Adding bullet 2</Text.Bullet>
            </Text>
            <Text style={{ x: 3, y: 3.5, w: 3, h: 0.5, fontSize: 32 }}>
              <Text.Bullet>Adding bullet</Text.Bullet>
              <Text.Bullet>Adding bullet</Text.Bullet>
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
          </> */}
        </Presentation>
      </Preview>
    </div>
  );
}
