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
const EthiopianDateUtils_1 = require("../util/EthiopianDateUtils");
const EthiopianYearList = ({ startYear, yearRange, onYearClick, }) => {
    const CURRENT_YEAR = startYear !== null && startYear !== void 0 ? startYear : EthiopianDateUtils_1.EthiopianDate.toEth(new Date()).Year;
    const START_YEAR = CURRENT_YEAR - (yearRange !== null && yearRange !== void 0 ? yearRange : 100);
    const currentYearRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (currentYearRef.current) {
            currentYearRef.current.scrollIntoView({
                behavior: "auto",
                block: "center",
            });
        }
    }, []);
    return (react_1.default.createElement(material_1.Box, { sx: {
            overflowY: "scroll",
            maxHeight: "270px",
            scrollbarWidth: "1px",
            "&::-webkit-scrollbar": {
                display: "none",
            },
        } },
        react_1.default.createElement(material_1.Grid, { container: true, spacing: 2 }, Array.from({ length: 201 }, (_, index) => START_YEAR + index).map((year) => (react_1.default.createElement(material_1.Grid, { item: true, xs: 4, key: year, style: { display: "flex", justifyContent: "center" }, ref: year === CURRENT_YEAR ? currentYearRef : null },
            react_1.default.createElement(material_1.Chip, { label: year, sx: {
                    backgroundColor: year === CURRENT_YEAR ? "primary.dark" : "transparent",
                    color: year === CURRENT_YEAR ? "white" : "default",
                    fontSize: "16px",
                    p: 1,
                }, onClick: () => onYearClick(year) })))))));
};
exports.default = EthiopianYearList;
