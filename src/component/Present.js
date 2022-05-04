import { Presentation, Slide, Text, Shape } from "react-pptx";
import Preview from "react-pptx/preview";
import React, { useRef, useState, useEffect, createRef } from "react";


export default function Present(props) {
  let data = JSON.parse(localStorage.getItem("present"));


  var slidearray = [];

  const slidesection = useRef(null)
  const gotoslide = () => {

    window.scrollTo({
      top: slidesection.current.offsetTop,

    })
  }

  // const arrLength = slidearray.length;
  // const [elRefs, setElRefs] = useState([]);

  // React.useEffect(() => {
  //   // add or remove refs
  //   setElRefs((elRefs) =>
  //     Array(arrLength)
  //       .fill()
  //       .map((_, i) => elRefs[i] || createRef()),
  //   );
  // }, [arrLength]);

  const DFS = async (cur, Allnode, loc) => {
    if (cur.child.length === 0) {
      return;
    } else {
      let manytext = false;
      let manybullet;
      let curslide = (
        <Preview>
          <Presentation>
            <Slide >
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
              <Shape
                type="rect"
                style={{
                  x: 0, y: 0, w: 10, h: 0.01,
                  backgroundColor: "black"
                }}
              />
            </Slide>
          </Presentation>
        </Preview>
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
          <div ref={slidesection} >
            <Preview>
              <Presentation>
                <Slide>
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
                  <Shape
                    type="rect"
                    style={{
                      x: 0, y: 0, w: 10, h: 0.01,
                      backgroundColor: "black"
                    }}
                  />
                </Slide>
              </Presentation>
            </Preview>
          </div>
        );
      }
      if (manybullet) {
        slidearray.push(
          <div ref={slidesection} >
            <Preview>
              <Presentation>
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
                    {manybullet.map((n) => (
                      <Text.Bullet key={n}>{n}</Text.Bullet>
                    ))}
                  </Text>
                </Slide>
              </Presentation>
            </Preview>
          </div>
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
      <button onClick={gotoslide} >asdasd</button>
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
        </Presentation>
      </Preview>
      {/* <div>
        {slidearray.map((el, i) => (
          <div ref={elRefs[i]}>
            {el}
          </div>
        ))}
      </div> */}
      {slidearray}
    </div>
  );
}