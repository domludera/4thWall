import 'aframe';
import 'aframe-textarea-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import hotkeys from "hotkeys-js";
import problems from "../problems.json";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            language: "java",
            mainFileName: "", //A3Q3 + .java example
            compilationFiles: [
                {
                    //Put the main file
                    fileName: "", //A3Q3.java example
                    fileContent: ""
                }
            ]
        }
    }

    updateProblem() {
        let target_frame = document.querySelector('#desc');
        let chosenProblem = Math.floor(Math.random() * Object.keys(problems).length);
        target_frame.setAttribute("textarea", "text: "+problems[chosenProblem]);

    }

    componentDidMount() {

        let constr = this;
        let frame = document.querySelectorAll('.frame');
        let target;
        let prevTarget;

        for (let i = 0; i < frame.length; i++) {
            frame[i].addEventListener('mouseenter', function (e) {
                if (target != null) {
                    prevTarget = target;
                    prevTarget.setAttribute("textarea", "disabled: true");
                }
                target = e.currentTarget;
                target.setAttribute("textarea", "disabled: false");
            });
            frame[i].addEventListener('mouseleave', function (e) {
                target = e.currentTarget;
                target.setAttribute("textarea", "disabled: true")
            });
        }



        hotkeys('ctrl+s', function (event, handler) {
            event.preventDefault();
            if (target !== null) {
                console.log(target.components.textarea.textarea.value);
                constr.setState({
                    language: "java",
                    mainFileName: "problem.java",
                    compilationFiles: [
                        {
                            fileName: "problem.java",
                            fileContent: "HelloWorld!"
                        }
                    ]
                });
            }
            constr.createRequest();
        });

        hotkeys('ctrl+n', function (event, handler) {
            event.preventDefault();
            constr.updateProblem();
        });

        hotkeys('tab', function (event, handler) {
            event.preventDefault();
            constr.updateProblem();
        });

        hotkeys('ctrl+b', function (event, handler) {
            event.preventDefault();
            let notes = document.querySelector('#notes');
            let visible_boolean = notes.getAttribute('visible');
            visible_boolean = !visible_boolean;
            notes.setAttribute('visible', visible_boolean.toString());
        });

    }

    createRequest() {
        fetch('https://vr-ide.herokuapp.com/compile', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                "language": this.state.language,
                "mainFileName": this.state.mainFileName,
                "compilationFiles": this.state.compilationFiles
            })
        }).then((response) => {
            return response.json();
        }).then(jsonResponse => {
            console.log(jsonResponse);

        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <Scene>

                <Entity class="frame-desc" id="desc" position="-0.6 1 -1.2" rotation="0 30 0"
                        textarea="cols: 60; rows: 40; text: press 'ctrl+n' to generate new problem; backgroundColor: #ffff99; color: #000000; disabledBackgroundColor: #dddddd; disabled: true;"
                />

                <Entity class="frame" id="title1" position="0.6 1.8 -1.2" rotation="0 -30 0"
                        textarea="cols: 40; rows: 1; text: untitled.java; backgroundColor: #ffff99; color: #000000; disabledBackgroundColor: #ff0000; disabled: true;"
                />

                <Entity class="frame" id="code1" position="0.6 1 -1.2" rotation="0 -30 0"
                        textarea="cols: 60; rows: 40; text: //this is where your code!; backgroundColor: #ffff99; color: #000000; disabledBackgroundColor: #ff0000; disabled: true;"
                />

                <Entity class="frame" id="notes" position="0 0.6 -1" rotation="-20 0 0"
                        textarea="cols: 60; rows: 40; text: put your notes here\n//press ctrl+b to toggle; backgroundColor: #ffff99; color: #000000; disabledBackgroundColor: #ff0000; disabled: true;"
                />

                <Entity primitive="a-camera">
                    <Entity primitive="a-cursor"/>
                </Entity>

            </Scene>
        );
    }
}

export default App;
