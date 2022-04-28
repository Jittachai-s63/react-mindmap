import {
  Presentation, Slide, Text,
  Shape, Image, Line
} from "react-pptx";

import Preview from "react-pptx/preview";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Present(props) {
  let location = useLocation();
  console.log(location.state)
  
  return (
      <Preview>
        <Presentation>
          <Slide>
            <Text style={{
              x: 3, y: 1, w: 3, h: 0.5, fontSize: 32, bold: true
            }}>
              Hello there!
            </Text>
            <Shape
              type="rect"
              style={{
                x: 3, y: 1.55, w: 3, h: 0.1,
                backgroundColor: "#FF0000"
              }}
            />
            <Text style={{
              x: 2, y: 2.8, w: 6, h: 0.5, fontSize: 16
            }}>
              <Text.Link url="https://github.com/wyozi/react-pptx">
                here's a link
              </Text.Link> to the repository
              or a
              <Text.Link
                url="https://www.youtube.com/watch?v=6IqKEeRS90A"
                style={{
                  color: "orange"
                }}
              >
                video
              </Text.Link>, if you'd like.
            </Text>
            <Line
              x1={1}
              x2={9}
              y1={5}
              y2={5}
              style={{
                color: 'blue',
                width: 2
              }}
            />
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
              src={{ kind: "path", path: "https://source.unsplash.com/random/800x600" }}
              style={{ x: "10%", y: "10%", w: "80%", h: "80%" }}
            />
          </Slide>
          {[1, 2, 3].map(n => (
            <Slide key={n}>
              <Text style={{ x: "50%", y: "50%", w: 1, h: 0.2 }}>
                slide {n}
              </Text>
            </Slide>
          ))}
          <>
            {[1, 2, 3].map(n => (
              <Slide key={n}>
                <Text style={{ x: "50%", y: "50%", w: 1, h: 0.2 }}>
                  fragment slide {n}
                </Text>
              </Slide>
            ))}
          </>
        </Presentation>
      </Preview>

    
  )
}