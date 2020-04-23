import React, { Component } from 'react';
import '../css/App.css';

import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
   }
   
  render() {
    return (
      <div>
        <a-scene>

          <a-entity id="window1" position="0 1.5 -1" textarea="cols: 20; rows: 4; text: this is a multiline textarea; backgroundColor: #01579b; color: white; disabledBackgroundColor: red; disabled: false;">
          </a-entity>

          <a-entity visible="false" id="menubar">
            <a-plane position="0 0 -3" rotation="-30 0 0" width="4" height="1" color="#7BC8A4">
              <a-plane position="-1.6 0.3 0.2" width="0.5" height="0.5" color="blue">
                <a-text value="Back" width="2"></a-text>
              </a-plane>
              <a-entity id="input" position="0.8 0.2 1" width="1" textarea="cols: 10; rows: 1; text: this is a multiline textarea; backgroundColor: #01579b; color: black; disabledBackgroundColor: red; disabled: false;">
              </a-entity>
              <a-entity id="file-area"/>
            </a-plane>
          </a-entity>

          <a-camera><a-cursor></a-cursor></a-camera>
        </a-scene>
      </div>
    );
  }
}
export default App;
