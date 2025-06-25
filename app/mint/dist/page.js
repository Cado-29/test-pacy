'use client';
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var react_2 = require("@meshsdk/react");
var mintCertificate_1 = require("@/lib/mintCertificate");
var metadataBuilder_1 = require("@/utils/metadataBuilder");
function MintPage() {
    var router = navigation_1.useRouter();
    var _a = react_2.useWallet(), connected = _a.connected, wallet = _a.wallet, connect = _a.connect, disconnect = _a.disconnect;
    var _b = react_1.useState(''), studentName = _b[0], setStudentName = _b[1];
    var _c = react_1.useState(''), course = _c[0], setCourse = _c[1];
    var _d = react_1.useState(''), date = _d[0], setDate = _d[1];
    var _e = react_1.useState(''), txHash = _e[0], setTxHash = _e[1];
    var _f = react_1.useState(''), assetName = _f[0], setAssetName = _f[1];
    var _g = react_1.useState(false), loading = _g[0], setLoading = _g[1];
    function handleMint() {
        return __awaiter(this, void 0, void 0, function () {
            var metadata, _a, txHash_1, assetName_1, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!wallet)
                            return [2 /*return*/, alert('Please connect your wallet first')];
                        setLoading(true);
                        metadata = metadataBuilder_1.buildCertificateMetadata(studentName, course, date);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, mintCertificate_1.mintCertificate(wallet, metadata)];
                    case 2:
                        _a = _b.sent(), txHash_1 = _a.txHash, assetName_1 = _a.assetName;
                        setTxHash(txHash_1);
                        setAssetName(assetName_1);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        alert('Minting failed: ' + error_1);
                        return [3 /*break*/, 4];
                    case 4:
                        setLoading(false);
                        return [2 /*return*/];
                }
            });
        });
    }
    return (React.createElement("div", { className: "p-6 max-w-xl mx-auto" },
        React.createElement("h1", { className: "text-2xl mb-4" }, "University Admin - Mint Student Certificate"),
        !connected ? (React.createElement(React.Fragment, null,
            React.createElement(react_2.CardanoWallet, { label: "Connect Wallet", isDark: true, persist: true }),
            React.createElement("button", { className: "bg-green-600 text-white px-4 py-2 rounded mt-4", onClick: function () { return connect('mesh'); } }, "Connect Wallet"))) : (React.createElement(React.Fragment, null,
            React.createElement("button", { className: "bg-red-600 text-white px-4 py-2 rounded mb-4", onClick: function () { return disconnect(); } }, "Disconnect Wallet"),
            React.createElement("input", { className: "mb-2 w-full p-2 border", placeholder: "Student Name", value: studentName, onChange: function (e) { return setStudentName(e.target.value); } }),
            React.createElement("input", { className: "mb-2 w-full p-2 border", placeholder: "Course", value: course, onChange: function (e) { return setCourse(e.target.value); } }),
            React.createElement("input", { className: "mb-4 w-full p-2 border", placeholder: "Date (YYYY-MM-DD)", value: date, onChange: function (e) { return setDate(e.target.value); } }),
            React.createElement("button", { className: "bg-blue-600 text-white px-4 py-2 rounded", onClick: handleMint, disabled: loading }, loading ? 'Minting...' : 'Mint Certificate'),
            txHash && (React.createElement("div", { className: "mt-4" },
                React.createElement("p", null, "\u2705 Minted successfully!"),
                React.createElement("p", null,
                    React.createElement("strong", null, "Asset Name:"),
                    " ",
                    assetName),
                React.createElement("p", null,
                    React.createElement("strong", null, "Tx Hash:"),
                    " ",
                    txHash),
                React.createElement("button", { className: "mt-2 bg-purple-600 text-white px-4 py-2 rounded", onClick: function () { return router.push("/certificate/" + txHash); } }, "View Certificate")))))));
}
exports["default"] = MintPage;
