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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const icons_material_1 = require("@mui/icons-material");
const material_1 = require("@mui/material");
const react_1 = __importStar(require("react"));
const EthiopianYearList_1 = __importDefault(require("./EthiopianYearList"));
const EthiopianDaysList_1 = __importDefault(require("./EthiopianDaysList"));
const EtDatePickerContext_1 = require("../EtDatePickerContext");
const EthiopianDateUtils_1 = require("../util/EthiopianDateUtils");
const EtLocalizationProvider_1 = require("../EtLocalizationProvider");
const EthiopianDateCalendar = () => {
    const { onDateChange, value } = (0, react_1.useContext)(EtDatePickerContext_1.EtDatePickerContext);
    const today = EthiopianDateUtils_1.EthiopianDate.toEth(new Date());
    const [ethDate, setEthDate] = (0, react_1.useState)(today);
    const [showYearList, setShowYearList] = (0, react_1.useState)(false);
    const { localType } = (0, EtLocalizationProvider_1.useEtLocalization)();
    const incrementMonth = () => {
        if (ethDate.Month === 13) {
            setEthDate(Object.assign(Object.assign({}, ethDate), { Month: 1, Year: ethDate.Year + 1 }));
        }
        else {
            setEthDate((prev) => (Object.assign(Object.assign({}, prev), { Month: prev.Month + 1 })));
        }
    };
    const decrementMonth = () => {
        if (ethDate.Month === 1) {
            setEthDate(Object.assign(Object.assign({}, ethDate), { Year: ethDate.Year - 1, Month: 13 }));
        }
        else {
            setEthDate((prev) => (Object.assign(Object.assign({}, prev), { Month: prev.Month - 1 })));
        }
    };
    (0, react_1.useEffect)(() => {
        if (value) {
            setEthDate(EthiopianDateUtils_1.EthiopianDate.toEth(value));
        }
    }, [value]);
    return (react_1.default.createElement(material_1.Box, { mx: 2 },
        react_1.default.createElement(material_1.Stack, { direction: "row", justifyContent: "space-between", m: 2 },
            react_1.default.createElement(material_1.Box, { sx: {
                    display: "flex",
                    alignItems: "center",
                    "&:hover": {
                        cursor: "pointer",
                    },
                }, onClick: () => setShowYearList(!showYearList) },
                react_1.default.createElement(material_1.Typography, null, `${EthiopianDateUtils_1.EthiopianDate.getEtMonthName(ethDate.Month, localType)} ${ethDate.Year}`),
                react_1.default.createElement(material_1.IconButton, { size: "small" }, showYearList ? react_1.default.createElement(icons_material_1.ArrowDropUp, null) : react_1.default.createElement(icons_material_1.ArrowDropDown, null))),
            react_1.default.createElement(material_1.Box, { sx: { display: "flex" } },
                react_1.default.createElement(material_1.IconButton, { size: "small", onClick: decrementMonth },
                    react_1.default.createElement(icons_material_1.ChevronLeft, null)),
                react_1.default.createElement(material_1.IconButton, { size: "small", onClick: incrementMonth },
                    react_1.default.createElement(icons_material_1.ChevronRight, null)))),
        react_1.default.createElement(material_1.Box, null, showYearList ? (react_1.default.createElement(EthiopianYearList_1.default, { onYearClick: (selectedYear) => {
                setEthDate(Object.assign(Object.assign({}, ethDate), { Year: selectedYear }));
                setShowYearList(false);
            }, startYear: ethDate.Year })) : (react_1.default.createElement(EthiopianDaysList_1.default, { month: ethDate.Month, year: ethDate.Year })))));
};
exports.default = EthiopianDateCalendar;
