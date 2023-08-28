"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const react_1 = require("react");
const react_2 = __importDefault(require("react"));
const format_1 = __importDefault(require("date-fns/format"));
const icons_material_1 = require("@mui/icons-material");
const EtDatePickerContext_1 = require("./EtDatePickerContext");
const EthiopianDateUtils_1 = require("./util/EthiopianDateUtils");
const EtGrDateCalendar_1 = __importDefault(require("./Components/EtGrDateCalendar"));
const EtDatePicker = (_a) => {
    var { onClick, onChangeDateType, value, onChange } = _a, props = __rest(_a, ["onClick", "onChangeDateType", "value", "onChange"]);
    const [dateType, setDateType] = (0, react_1.useState)("EC");
    const [date, setDate] = (0, react_1.useState)();
    const [anchorEl, setAnchorEl] = react_2.default.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDateChange = (newDate) => {
        onChange === null || onChange === void 0 ? void 0 : onChange(newDate);
        if (newDate) {
            if (!(newDate.getFullYear() !== (date === null || date === void 0 ? void 0 : date.getFullYear()) &&
                newDate.getDate() === (date === null || date === void 0 ? void 0 : date.getDate()) &&
                newDate.getMonth() === (date === null || date === void 0 ? void 0 : date.getMonth()))) {
                setAnchorEl(null);
            }
            setDate(newDate);
        }
    };
    const handleDateTypeChange = (event) => {
        const newDateType = dateType === "GC" ? "EC" : "GC";
        setDateType(newDateType);
        onChangeDateType === null || onChangeDateType === void 0 ? void 0 : onChangeDateType(newDateType);
        event.stopPropagation();
    };
    (0, react_1.useEffect)(() => {
        if (value) {
            setDate(value);
        }
    }, [value]);
    return (react_2.default.createElement(react_2.default.Fragment, null,
        react_2.default.createElement(material_1.TextField, Object.assign({}, props, { value: date
                ? dateType === "GC"
                    ? (0, format_1.default)(date, "dd/MMM/yyyy")
                    : EthiopianDateUtils_1.EthiopianDate.formatEtDate(EthiopianDateUtils_1.EthiopianDate.toEth(date))
                : "-", InputProps: {
                onClick: (event) => {
                    handleClick(event);
                },
                startAdornment: (react_2.default.createElement(material_1.InputAdornment, { position: "start" },
                    react_2.default.createElement(material_1.ButtonBase, { onClick: handleDateTypeChange },
                        react_2.default.createElement(material_1.Typography, { fontWeight: 700, color: "primary" }, dateType)))),
                endAdornment: (react_2.default.createElement(material_1.InputAdornment, { position: "end" },
                    react_2.default.createElement(material_1.IconButton, { onClick: handleClick },
                        react_2.default.createElement(icons_material_1.EventOutlined, null)))),
            } })),
        react_2.default.createElement(material_1.Menu, { id: "basic-menu", anchorEl: anchorEl, open: open, onClose: handleClose, MenuListProps: {
                "aria-labelledby": "basic-button",
            } },
            react_2.default.createElement(EtDatePickerContext_1.EtDatePickerProvider, { onChange: handleDateChange, disableFuture: props.disableFuture, disablePast: props.disablePast, minDate: props.minDate, maxDate: props.maxDate, value: date },
                react_2.default.createElement(EtGrDateCalendar_1.default, null)))));
};
exports.default = EtDatePicker;
