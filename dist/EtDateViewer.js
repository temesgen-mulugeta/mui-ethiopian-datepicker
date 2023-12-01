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
const EtLocalizationProvider_1 = require("./EtLocalizationProvider");
const EtDateViewer = ({ date, initialDateType, disableSwitcher, }) => {
    const [dateType, setDateType] = (0, react_1.useState)(initialDateType !== null && initialDateType !== void 0 ? initialDateType : "AMH");
    const { localType, getLocalMonthName } = (0, EtLocalizationProvider_1.useEtLocalization)();
    const handleDateTypeChange = (event) => {
        const newDateType = dateType === "EN" ? localType : "EN";
        setDateType(newDateType !== null && newDateType !== void 0 ? newDateType : "EN");
        event.stopPropagation();
    };
    return (react_1.default.createElement(material_1.Stack, { direction: "row", spacing: 0.7 },
        !disableSwitcher && (react_1.default.createElement(material_1.ButtonBase, { onClick: handleDateTypeChange },
            react_1.default.createElement(material_1.Typography, { fontWeight: 700, color: "primary" }, localType === "CUSTOM" ? "CU" : localType))),
        react_1.default.createElement(material_1.Typography, null, localType === "EN"
            ? (0, date_fns_1.format)(date, "MMM dd/yyyy")
            : EthiopianDateUtils_1.EthiopianDate.formatEtDate(EthiopianDateUtils_1.EthiopianDate.toEth(date), localType !== null && localType !== void 0 ? localType : "AMH", getLocalMonthName))));
};
exports.default = EtDateViewer;
