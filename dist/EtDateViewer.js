"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const react_1 = __importStar(require("react"));
const date_fns_1 = require("date-fns");
const EthiopianDateUtils_1 = require("./util/EthiopianDateUtils");
const EtDateViewer = ({ date, initialDateType, }) => {
    const [dateType, setDateType] = (0, react_1.useState)(initialDateType !== null && initialDateType !== void 0 ? initialDateType : "EC");
    const handleDateTypeChange = (event) => {
        const newDateType = dateType === "GC" ? "EC" : "GC";
        setDateType(newDateType);
        event.stopPropagation();
    };
    return (react_1.default.createElement(material_1.Stack, { direction: "row", spacing: 0.7 },
        react_1.default.createElement(material_1.ButtonBase, { onClick: handleDateTypeChange },
            react_1.default.createElement(material_1.Typography, { fontWeight: 700, color: "primary" }, dateType)),
        react_1.default.createElement(material_1.Typography, null, dateType === "GC"
            ? (0, date_fns_1.format)(date, "dd/MMM/yyyy")
            : EthiopianDateUtils_1.EthiopianDate.formatEtDate(EthiopianDateUtils_1.EthiopianDate.toEth(date)))));
};
exports.default = EtDateViewer;
