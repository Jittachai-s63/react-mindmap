import React from 'react';
import { ScreenCapture } from 'react-screen-capture';
import { iconClassName, browserOpenFile } from "@blink-mind/renderer-react";
import Capture from "../icon/capture.png"

class PictureCapture extends React.Component {
  state = {
    screenCapture: '',
  };

  handleScreenCapture = async (screenCapture) => {
    this.setState({screenCapture});
    const screenCaptureSource = await this.state.screenCapture;
    const downloadLink = document.createElement('a');
    const fileName = 'react-screen-capture.png';

    downloadLink.href = screenCaptureSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  render() {
    const { screenCapture } = this.state;
    return (
      <ScreenCapture onEndCapture={this.handleScreenCapture}>
        {({ onStartCapture }) => (
          <img
            src = {Capture}
            style = {
              {
                width : "30px"
              }
            }
            title = "Capture"
            onClick={onStartCapture}
          />
        )}
      </ScreenCapture>
    );
  }
};

export default PictureCapture;