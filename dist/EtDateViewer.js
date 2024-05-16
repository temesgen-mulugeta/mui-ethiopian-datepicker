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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const react_1 = __importStar(require("react"));
const date_fns_1 = require("date-fns");
const EthiopianDateUtils_1 = require("./util/EthiopianDateUtils");
const EtLocalizationProvider_1 = require("./EtLocalizationProvider");
const EtDateViewer = (_a) => {
    var { date, initialDateType, disableSwitcher, showTime } = _a, props = __rest(_a, ["date", "initialDateType", "disableSwitcher", "showTime"]);
    const { localType, getLocalMonthName } = (0, EtLocalizationProvider_1.useEtLocalization)();
    const [dateType, setDateType] = (0, react_1.useState)(initialDateType !== null && initialDateType !== void 0 ? initialDateType : localType);
    const handleDateTypeChange = (event) => {
        event.stopPropagation();
        const newDateType = dateType === "EN" ? localType : "EN";
        setDateType(newDateType !== null && newDateType !== void 0 ? newDateType : "EN");
    };
    return (react_1.default.createElement(material_1.Stack, { direction: "row", spacing: 0.7 },
        !disableSwitcher && (react_1.default.createElement(material_1.ButtonBase, { onClick: handleDateTypeChange },
            react_1.default.createElement(material_1.Typography, Object.assign({ fontWeight: 700, color: "primary" }, props), dateType === "CUSTOM" ? "CU" : dateType))),
        react_1.default.createElement(material_1.Typography, Object.assign({}, props), showTime
            ? dateType === "EN"
                ? `${(0, date_fns_1.format)(date, "MMM dd/yyyy")} ${(0, date_fns_1.format)(date, "hh:mm a")}`
                : EthiopianDateUtils_1.EthiopianDate.formatEtDate(EthiopianDateUtils_1.EthiopianDate.toEth(date), dateType !== null && dateType !== void 0 ? dateType : localType, getLocalMonthName, date.getTime())
            : dateType === "EN"
                ? (0, date_fns_1.format)(date, "MMM dd/yyyy")
                : EthiopianDateUtils_1.EthiopianDate.formatEtDate(EthiopianDateUtils_1.EthiopianDate.toEth(date), dateType !== null && dateType !== void 0 ? dateType : localType, getLocalMonthName))));
};
exports.default = EtDateViewer;
