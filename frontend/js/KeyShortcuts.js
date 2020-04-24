import hotkeys from "hotkeys-js";

var target;

const hk = hotkeys('q', target, function(event, handler) {
        event.preventDefault();
        /*
         * Get text of textarea
         * store in JSON
         * send JSON to backend
         */
        console.log('save file');
});

exports.hk = hk;




