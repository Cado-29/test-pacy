'use client';
"use strict";
exports.__esModule = true;
require("./globals.css");
require("@meshsdk/react/styles.css");
var react_1 = require("@meshsdk/react");
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement("html", { lang: "en" },
        React.createElement("body", null,
            React.createElement(react_1.MeshProvider, null, children))));
}
exports["default"] = RootLayout;
