import React, { ReactNode } from "react";
import { EtLocal } from "./util/EthiopianDateUtils";
type LocalizationContextProps = {
    localType: EtLocal;
    setLocalType: React.Dispatch<React.SetStateAction<EtLocal>>;
    getLocalMonthName?: (month: number) => string;
};
export declare const useEtLocalization: () => LocalizationContextProps;
type LocalizationProviderProps = {
    children: ReactNode;
    locale?: EtLocal;
    getLocalMonthName?: (month: number) => string;
};
export declare const EtLocalizationProvider: React.FC<LocalizationProviderProps>;
export {};
