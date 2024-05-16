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
exports.useEtLocalization = exports.EtLocalizationProvider = void 0;
const react_1 = __importStar(require("react"));
const defaultState = {
    localType: "AMH",
    setLocalType: () => { },
};
const EtLocalizationContext = (0, react_1.createContext)(defaultState);
const EtLocalizationProvider = ({ children, locale = "AMH", getLocalMonthName, }) => {
    const [localType, setLocalType] = (0, react_1.useState)(locale);
    (0, react_1.useEffect)(() => {
        setLocalType(locale);
    }, [locale]);
    return (react_1.default.createElement(EtLocalizationContext.Provider, { value: { localType, setLocalType, getLocalMonthName } }, children));
};
exports.EtLocalizationProvider = EtLocalizationProvider;
const useEtLocalization = () => {
    const context = (0, react_1.useContext)(EtLocalizationContext);
    if (context)
        return context;
    const local = "AMH";
    return { localType: local, getLocalMonthName: (m) => "" };
};
exports.useEtLocalization = useEtLocalization;
