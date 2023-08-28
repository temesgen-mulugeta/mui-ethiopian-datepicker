"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const x_date_pickers_1 = require("@mui/x-date-pickers");
const react_1 = require("react");
const EthiopianDateCalendar_1 = __importDefault(require("./EthiopianDateCalendar"));
const EtDatePickerContext_1 = require("../EtDatePickerContext");
const react_2 = __importDefault(require("react"));
const EtGrDateCalendar = () => {
    const etDatePickerContext = (0, react_1.useContext)(EtDatePickerContext_1.EtDatePickerContext);
    const { value, onDateChange, disableFuture } = etDatePickerContext;
    return (react_2.default.createElement(material_1.Box, { sx: { width: 600 } },
        react_2.default.createElement(material_1.Box, { display: "flex" },
            react_2.default.createElement(material_1.Box, { width: 295 },
                react_2.default.createElement(EthiopianDateCalendar_1.default, null)),
            react_2.default.createElement(material_1.Divider, { orientation: "vertical", flexItem: true }),
            react_2.default.createElement(material_1.Box, { width: 295 },
                react_2.default.createElement(x_date_pickers_1.DateCalendar, { monthsPerRow: 3, value: value, onChange: (date) => {
                        if (date)
                            onDateChange(date);
                    }, sx: { mr: 1 }, disableFuture: disableFuture })))));
};
exports.default = EtGrDateCalendar;
