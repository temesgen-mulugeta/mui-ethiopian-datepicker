import React, { createContext, useContext, useState, ReactNode } from "react";
import { DateType, EtLocal } from "./util/EthiopianDateUtils";

type LocalizationContextProps = {
  localType: EtLocal;
  setLocalType: React.Dispatch<React.SetStateAction<EtLocal>>;
  getLocalMonthName?: (month: number) => string;
};

const defaultState: LocalizationContextProps = {
  localType: "AMH",
  setLocalType: () => {},
};

const EtLocalizationContext =
  createContext<LocalizationContextProps>(defaultState);

type LocalizationProviderProps = {
  children: ReactNode;
  locale?: EtLocal;
  getLocalMonthName?: (month: number) => string;
};

export const EtLocalizationProvider: React.FC<LocalizationProviderProps> = ({
  children,
  locale = "AMH",
  getLocalMonthName,
}) => {
  const [localType, setLocalType] = useState<EtLocal>(locale);

  return (
    <EtLocalizationContext.Provider
      value={{ localType, setLocalType, getLocalMonthName }}
    >
      {children}
    </EtLocalizationContext.Provider>
  );
};

export const useEtLocalization = () => {
  const context = useContext(EtLocalizationContext);

  if (context) return context;
  const local: EtLocal = "AMH";
  return { localType: local, getLocalMonthName: (m: number) => "" };
};
