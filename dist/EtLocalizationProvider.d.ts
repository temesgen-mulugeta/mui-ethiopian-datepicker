import React, { ReactNode } from "react";
import { DateType } from "./util/EthiopianDateUtils";
type LocalizationContextProps = {
    localType: DateType;
    setLocalType: React.Dispatch<React.SetStateAction<DateType>>;
    getLocalMonthName?: (month: number) => string;
    disableEt?: boolean;
    disableGregorian?: boolean;
    disableSwitcher?: boolean;
};
export type LocalizationProviderProps = {
    children: ReactNode;
    locale?: DateType;
    getLocalMonthName?: (month: number) => string;
    disableEt?: boolean;
    disableGregorian?: boolean;
    disableSwitcher?: boolean;
};
export declare const EtLocalizationProvider: React.FC<LocalizationProviderProps>;
export declare const useEtLocalization: () => LocalizationContextProps | {
    localType: "AMH";
    getLocalMonthName: (m: number) => string;
    disableEt: boolean;
    disableGregorian: boolean;
    disableSwitcher: boolean;
};
export {};
