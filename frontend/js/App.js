import 'aframe';
import 'aframe-textarea-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import hotkeys from "hotkeys-js";
// const utils = require('./KeyShortcuts');


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        frame: null,
        target: null,
        prevTarget: null
    };

    this.addListenerEnter = this.addListenerEnter.bind(this);
    this.addListenerLeave = this.addListenerLeave.bind(this);

  }


  componentDidMount(){

      var frame = document.querySelectorAll('.frame');
      console.log(frame);

      this.addListenerEnter(frame);
      this.addListenerLeave(frame);

      hotkeys('q', function(event, handler) {
          event.preventDefault();
          if(this.state.target !== undefined) {
              console.log(this.state.target.components.textarea.textarea.value);
          }
          /*
           * Get text of textarea
           * store in JSON
           * send JSON to backend
           */
          console.log('save file');
      });
  }

  addListenerEnter(frame) {
      frame.forEach(item => {
          item.addEventListener('mouseenter', function (e) {
              if (this.state.prevTarget !== undefined) {
                  this.setState({
                      target: e.currentTarget,
                      prevTarget: this.state.target,
                  });
                  this.state.prevTarget.setAttribute("textarea", "disabled: true");
                  this.state.target.setAttribute("textarea", "disabled: false");
              }

              this.setState({
                  prevTarget: e.currentTarget
              });

          })
      });
  }

  addListenerLeave(frame) {
      frame.forEach(item => {
          item.addEventListener('mouseleave', function (e) {
              this.setState({
                  target: e.currentTarget,
              });
              this.state.target.setAttribute("textarea", "disabled: true");
          })
      });
  }


    render () {
      return (

        <Scene>

            <Entity class="frame" id="desc" position="-1 1.2 -1" rotation="0 30 0" textarea="cols: 80; rows: 40; text: this is a multiline textarea; backgroundColor: #ff00ff; color: white; disabledBackgroundColor: red; disabled: false;"/>
            <Entity class="frame" id="code" position="1 1.2 -1" rotation="0 -30 0" textarea="cols: 80; rows: 40; text: this is a multiline textarea; backgroundColor: #0000ff; color: white; disabledBackgroundColor: red; disabled: false;"/>

            <Entity primitive="a-camera">
                <Entity primitive="a-cursor"/>
            </Entity>

        </Scene>
    );
  }
}
export default App;
