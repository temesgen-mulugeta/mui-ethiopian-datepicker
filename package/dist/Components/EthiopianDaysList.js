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
const EtDatePickerContext_1 = require("../EtDatePickerContext");
const EthiopianDateUtils_1 = require("../util/EthiopianDateUtils");
const EthiopianDaysList = ({ month, year, }) => {
    const cellSize = "36px";
    const gap = 0.5;
    const days = EthiopianDateUtils_1.EthiopianDate.shortDays;
    const today = EthiopianDateUtils_1.EthiopianDate.toEth(new Date());
    const { onDateChange, value, disableFuture, disablePast, minDate, maxDate } = (0, react_1.useContext)(EtDatePickerContext_1.EtDatePickerContext);
    const [selectedDate, setSelectedDate] = (0, react_1.useState)(value ? EthiopianDateUtils_1.EthiopianDate.toEth(value) : null);
    const getEtDate = (day) => {
        return { Day: day, Month: month, Year: year };
    };
    const isDisabled = (day) => {
        const date = EthiopianDateUtils_1.EthiopianDate.createEthiopianDateFromParts(day, month, year);
        if (disableFuture && EthiopianDateUtils_1.EthiopianDate.compareDates(today, date) === -1) {
            return true;
        }
        if (disablePast && EthiopianDateUtils_1.EthiopianDate.compareDates(today, date) === 1) {
            return true;
        }
        if (minDate &&
            (minDate instanceof Date || Boolean(new Date(minDate))) &&
            EthiopianDateUtils_1.EthiopianDate.compareDates(EthiopianDateUtils_1.EthiopianDate.toEth(minDate instanceof Date ? minDate : new Date(minDate)), date) === 1) {
            return true;
        }
        if (maxDate &&
            (maxDate instanceof Date || Boolean(new Date(maxDate))) &&
            EthiopianDateUtils_1.EthiopianDate.compareDates(EthiopianDateUtils_1.EthiopianDate.toEth(maxDate instanceof Date ? maxDate : new Date(maxDate)), date) === -1) {
            return true;
        }
        return false;
    };
    (0, react_1.useEffect)(() => {
        if (value)
            setSelectedDate(EthiopianDateUtils_1.EthiopianDate.toEth(value));
    }, [value]);
    const isSelectedDate = (day) => {
        return (day === (selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.Day) &&
            month === (selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.Month) &&
            year === (selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.Year));
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Box, { sx: {
                display: "grid",
                gridTemplateColumns: `repeat(7, ${cellSize})`,
                gap: gap,
                justifyContent: "center",
                alignItems: "center",
                mb: 1,
            } }, days.map((day, index) => (react_1.default.createElement(material_1.Typography, { key: index, variant: "caption", sx: {
                justifySelf: "center",
                alignSelf: "center",
                color: "grey",
            } }, day)))),
        react_1.default.createElement(material_1.Box, { sx: {
                display: "grid",
                gridTemplateColumns: `repeat(7, ${cellSize})`,
                gap: gap,
            } }, Array.from({
            length: EthiopianDateUtils_1.EthiopianDate.ethiopianMonthLength(month, year),
        }, (_, index) => (react_1.default.createElement(material_1.IconButton, { key: index, disabled: isDisabled(index + 1), onClick: () => {
                setSelectedDate(getEtDate(index + 1));
                const etDate = EthiopianDateUtils_1.EthiopianDate.createEthiopianDateFromParts(index + 1, month, year);
                const grDate = EthiopianDateUtils_1.EthiopianDate.toGreg(etDate);
                onDateChange(grDate);
            }, sx: {
                width: cellSize,
                height: cellSize,
                backgroundColor: isSelectedDate(index + 1)
                    ? "primary.dark"
                    : "transparent",
                border: index + 1 === today.Day &&
                    month === today.Month &&
                    year === today.Year &&
                    !isSelectedDate(index + 1)
                    ? "1px solid grey"
                    : "none",
                gridColumn: index === 0
                    ? EthiopianDateUtils_1.EthiopianDate.getEtMonthStartDate(month, year)
                    : undefined,
                color: isSelectedDate(index + 1) ? "white" : "black",
                fontSize: "12px",
                "&:hover": {
                    backgroundColor: isSelectedDate(index + 1)
                        ? "primary.dark"
                        : undefined,
                },
            } }, index + 1))))));
};
exports.default = EthiopianDaysList;
