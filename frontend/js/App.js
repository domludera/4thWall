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
            mainFileName: "Hello.java",
            compilationFiles: []
        }
    }

    updateProblem() {
        let target_frame = document.querySelector('#desc');
        let chosenProblem = Math.floor(Math.random() * Object.keys(problems).length);
        target_frame.setAttribute("textarea", "text: "+problems[chosenProblem]);

    }

    componentDidMount() {

        let constr = this;

        let f_frames = document.querySelectorAll('.f');
        console.log(f_frames);
        for(let i = 0; i<f_frames.length; i++){
            f_frames[i].setAttribute('visible', 'false'.toString());
        }

        let hello = "4th Wall" +
            "\nVR IDE" +
            "\n\n====================================" +
            "\nHELP" +
            "\n\tCommands" +
            "\n\t\t'ctrl+h' - close help menu" +
            "\n\t\t'ctrl+s' - compile code" +
            "\n\t\t'ctrl+n' - generate new problem" +
            "\n\t\t'ctrl+b' - toggle notes" +
            "\n\t\t'ctrl+i' - toggle console" +
            "\n====================================";

        let help = document.querySelector('#help');
        help.setAttribute('textarea', 'text: '+hello);

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
                let title = document.querySelector('#title1');
                let code = document.querySelector('#code1');
                constr.setState({
                    language: "java",
                    mainFileName: title.components.textarea.textarea.value,
                    compilationFiles: [
                        {
                            "fileName": title.components.textarea.textarea.value,
                            "fileContent": code.components.textarea.textarea.value
                        }
                    ]
                });
                constr.createRequest();
        });

        hotkeys('ctrl+n', function (event, handler) {
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

        hotkeys('ctrl+i', function (event, handler) {
            event.preventDefault();
            let notes = document.querySelector('#console');
            let visible_boolean = notes.getAttribute('visible');
            visible_boolean = !visible_boolean;
            notes.setAttribute('visible', visible_boolean.toString());
        });

        /* Still under dev
        hotkeys('ctrl+v', function(event, handler) {
            event.preventDefault();
            let sceneEl = document.querySelector("a-scene");
            var newEl = document.createElement("a-entity");
            var screenPos = [
                {
                    pos: "-2 1.5 -1",
                    rotation: "0 90 0"
                },
            ];
            console.log(screenPos);
            newEl.setAttribute("position", screenPos[0].pos);
            newEl.setAttribute("rotation", screenPos[0].rotation);
            newEl.setAttribute(
                "textarea",
                "cols: 20; rows: 4; text: this is a multiline textarea; backgroundColor: #f8203B; color: white; disabledBackgroundColor: green; disabled: false;"
            );
            sceneEl.appendChild(newEl);
        });
        */

        hotkeys('ctrl+h', function (event, handler) {
            event.preventDefault();
            let help_frame = document.querySelector('#help');
            let frames = document.querySelectorAll('.f');

            let visible_boolean = help_frame.getAttribute('visible');
            for(let i = 0; i<frames.length; i++){
                frames[i].setAttribute('visible', visible_boolean.toString());
            }
            help_frame.setAttribute('visible', (!visible_boolean).toString());
        });


    }

    createRequest() {
        let url = "https://vr-ide.herokuapp.com/compile"; // dep url
        // let url = "https://localhost:8080/compile"; // dev url
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "language": this.state.language,
                "mainFileName": this.state.mainFileName,
                "compilationFiles": this.state.compilationFiles
            })
        }).then((response) => {
            response.text().then(data => {
                let fconsole = document.querySelector("#console");
                fconsole.setAttribute("textarea", "text: "+data);
                // fconsole.setAttribute("visible", "true");

            });
        }).catch(error => {
            console.log(error);
        })
    }

    render() {


        return (
            <Scene>

                <Entity class="help" id="help" position="0 1.2 -1" rotation="-10 0 0"
                        textarea="cols: 40; rows: 12; backgroundColor: #000000; color: #eeee00; disabledBackgroundColor: #000000; disabled: true;"
                />

                <Entity class="f desc" id="desc" position="-0.6 1 -1.2" rotation="0 20 0"
                        textarea="cols: 60; rows: 40; text: press 'ctrl+n' to generate new problem; backgroundColor: #ffff99; color: #000000; disabledBackgroundColor: #dddddd; disabled: true;"
                />

                <Entity class="f frame file" id="title1" position="0.6 1.8 -1.2" rotation="0 -20 0"
                        textarea="cols: 40; rows: 1; text: Untitled.java; backgroundColor: #eeeeee; color: #000000; disabledBackgroundColor: #999999; disabled: true;"
                />

                <Entity class="f frame file" id="code1" position="0.6 1 -1.2" rotation="0 -20 0"
                        textarea="cols: 60; rows: 40; text: //this is where you code!; backgroundColor: #eeeeee; color: #000000; disabledBackgroundColor: #999999; disabled: true;"
                />

                <Entity class="f frame notes" id="notes" position="0 0.6 -1" rotation="-20 0 0"
                        textarea="cols: 60; rows: 40; text: put your notes here\n//press 'ctrl+b' to toggle; backgroundColor: #ffff99; color: #000000; disabledBackgroundColor: #bbbb99; disabled: true;"
                />

                <Entity class="f console" id="console" position="0 2 -1" rotation="20 0 0"
                        textarea="cols: 80; rows: 10; text: //console log; color: #ffffff; disabledBackgroundColor: #111111; disabled: true;"
                />

                <Entity primitive="a-camera">
                    <Entity primitive="a-cursor"/>
                </Entity>

            </Scene>
        );
    }
}

export default App;
