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
    const { onDateChange, disableFuture, disablePast, minDate, maxDate, onMonthChange, gregDate, setGregDate, } = etDatePickerContext;
    const gregDateValue = gregDate === null || gregDate === void 0 ? void 0 : gregDate.toLocaleDateString();
    const [gregDatePicker, setGregDatePicker] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        if (gregDateValue) {
            const value = new Date(gregDateValue);
            setGregDatePicker(value);
        }
    }, [gregDateValue]);
    const handleTodayButtonClick = () => {
        onDateChange(new Date());
    };
    return (react_2.default.createElement(material_1.Box, { sx: { minWidth: 610 } },
        react_2.default.createElement(material_1.Box, { display: "flex" },
            react_2.default.createElement(material_1.Box, { width: 295, display: "flex", flexDirection: "column" },
                react_2.default.createElement(EthiopianDateCalendar_1.default, null),
                react_2.default.createElement(material_1.Box, { sx: {
                        flexGrow: 1,
                        display: "flex",
                        alignItems: "flex-end",
                    } },
                    react_2.default.createElement(material_1.Button, { sx: { ml: 2 }, onClick: handleTodayButtonClick }, "Today"))),
            react_2.default.createElement(material_1.Divider, { orientation: "vertical", flexItem: true }),
            react_2.default.createElement(material_1.Box, { width: 295, pr: 4 },
                react_2.default.createElement(x_date_pickers_1.DateCalendar, { monthsPerRow: 3, value: gregDatePicker, onChange: (date) => {
                        if (date && date instanceof Date)
                            onDateChange(date);
                    }, 
                    // sx={{ mr: 2 }}
                    disableFuture: disableFuture, onMonthChange: (date) => {
                        var _a;
                        const newDate = new Date(date);
                        newDate.setDate((_a = gregDate === null || gregDate === void 0 ? void 0 : gregDate.getDate()) !== null && _a !== void 0 ? _a : 15);
                        onMonthChange(newDate);
                        setGregDate(newDate);
                    }, disablePast: disablePast, minDate: minDate, maxDate: maxDate })))));
};
exports.default = EtGrDateCalendar;
