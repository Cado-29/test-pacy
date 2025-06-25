'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
function Home() {
    var router = navigation_1.useRouter();
    react_1.useEffect(function () {
        router.replace('/mint'); // Redirect to /mint
    }, [router]);
    return null; // or a loading spinner
}
exports["default"] = Home;
